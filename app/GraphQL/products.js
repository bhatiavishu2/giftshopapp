import { gql } from 'apollo-server-express'
import * as db from '../database'
import { Permissions, withPermissions } from '../utils'

export const typeDefs = gql`
    extend type Query {
        products: [Product]
        product(id: ID!): Product
        productsByCategory(categoryId: ID!): [Product]
        latestProducts(limit: Int): [Product]
    }

    type Product {
        id: ID!
        name: String
        price: String
        wholeSalePrice: String
        images: [String]
        subCategory: String
        productDescription: String
        shippingCharges: String
        localShippingCharges: String
        previewFile: String
        videoUrl: String
        isOutOfStock: Boolean
        subCategoryDetails: SubCategory
    }
    extend type Mutation {
        createProduct(
            name: String!
            price: String!
            wholeSalePrice: String!
            images: [String]!
            subCategory: String!
            productDescription: String!
            shippingCharges: String!
            localShippingCharges: String
            previewFile: String
            videoUrl: String
            isOutOfStock: Boolean
        ): Product
        editProduct(
            id: ID!
            name: String!
            price: String!
            wholeSalePrice: String!
            images: [String]!
            subCategory: String!
            productDescription: String!
            shippingCharges: String!
            localShippingCharges: String
            previewFile: String
            videoUrl: String
            isOutOfStock: Boolean
        ): [Int]
        deleteProduct(id: ID): Boolean
    }
`

export const resolvers = {
    Query: {
        products: async () => db.products.findAll(),
        product: async (obj, args, context, info) =>
            db.products.findByPk(args.id),
        productsByCategory: async (obj, args, context, info) => {
            const subCategories = await db.subCategories.findAll({
                where: {
                    category: args.categoryId,
                },
            })

            return await db.products.findAll({
                where: {
                    subCategory: subCategories.map((subCategory) =>
                        subCategory.id.toString(),
                    ),
                },
            })
        },
        latestProducts: async (obj, args) => {
            return db.products.findAll({
                limit: args.limit,
                order: [['updatedAt', 'DESC']],
            })
        },
    },
    Product: {
        subCategoryDetails: async ({ dataValues }) => {
            return await db.subCategories.findByPk(
                Number(dataValues.subCategory),
            )
        },
        images: async ({ dataValues }) => {
            return dataValues.images.split(',')
        },
    },
    Mutation: {
        createProduct: withPermissions(
            [Permissions.CREATE_PRODUCT],
            async (context, product) => {
                const newProduct = {
                    ...product,
                    images: product.images.join(','),
                }
                return db.products.create(newProduct)
            },
        ),
        editProduct: withPermissions(
            [Permissions.EDIT_PRODUCT],
            async (context, { id, ...product }) => {
                const dbProduct = await db.products.findByPk(Number(id))
                // const newProduct = {
                //     ...product,
                //     images: dbProduct.images + ',' + product.images.join(','),
                // }
                const newProduct = {
                    ...product,
                    images: product.images.join(','),
                }
                return db.products.update(newProduct, {
                    where: {
                        id,
                    },
                })
            },
        ),
        deleteProduct: withPermissions(
            [Permissions.DELETE_PRODUCT],
            async (context, args) => {
                return db.products.destroy({
                    where: {
                        id: Number(args.id),
                    },
                })
            },
        ),
    },
}
