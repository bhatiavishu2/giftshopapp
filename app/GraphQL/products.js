import { gql } from 'apollo-server-express'
import * as db from '../database'

export const typeDefs = gql`
    extend type Query {
        products: [Product]
        product(id: ID!): Product
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
        ): Product
    }
`

export const resolvers = {
    Query: {
        products: async () => db.products.findAll(),
        product: async (obj, args, context, info) =>
            db.products.findByPk(args.id),
    },
    Product: {
        subCategoryDetails: async ({ dataValues }) => {
            console.log('adfgsdfgsdf', dataValues.subCategory)
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
    },
}
