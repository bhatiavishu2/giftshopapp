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
        images: [String]
        category: String
    }
    extend type Mutation {
        createProduct(
            name: String!
            price: String!
            images: [String]!
            category: String!
        ): Product
    }
`

export const resolvers = {
    Query: {
        products: async () => db.products.findAll(),
        product: async (obj, args, context, info) =>
            db.products.findByPk(args.id),
    },
    Mutation: {
        createPermission: async (context, product) => {
            return db.products.create(product)
        },
    },
}
