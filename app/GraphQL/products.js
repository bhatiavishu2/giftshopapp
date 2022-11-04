import { gql } from 'apollo-server-express'
import * as db from '../database'

export const typeDefs = gql`
    extend type Query {
        products: [Product]
        product(id: ID!): Product
        productsByCategory(categoryId: ID!): [Product]
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
        createProduct: async (context, product) => {
            const newProduct = {
                ...product,
                images: product.images.join(','),
            }
            return db.products.create(newProduct)
        },
        editProduct: async (context, { id, ...product }) => {
            const dbProduct = await db.products.findByPk(Number(id))
            const newProduct = {
                ...product,
                images: dbProduct.images + ',' + product.images.join(','),
            }
            return db.products.update(newProduct, {
                where: {
                    id,
                },
            })
        },
        deleteProduct: async (context, args) => {
            return db.products.destroy({
                where: {
                    id: Number(args.id),
                },
            })
        },
    },
}
