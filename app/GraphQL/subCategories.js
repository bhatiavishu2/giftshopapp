import { gql } from 'apollo-server-express'
import * as db from '../database'

export const typeDefs = gql`
    extend type Query {
        subCategories: [SubCategory]
        subCategory(id: ID!): SubCategory
    }

    type SubCategory {
        id: ID
        name: String
        category: String
        categoryDetails: Category
    }
    extend type Mutation {
        createSubCategory(name: String, category: String): SubCategory
    }
`

export const resolvers = {
    Query: {
        subCategories: async () => db.subCategories.findAll(),
        subCategory: async (obj, args, context, info) =>
            db.subCategories.findByPk(args.id),
    },
    SubCategory: {
        categoryDetails: async ({ dataValues }) => {
            console.log('asdasd', dataValues.category)
            return await db.categories.findByPk(Number(dataValues.category))
        },
    },
    Mutation: {
        createSubCategory: async (context, subCategory) => {
            return db.subCategories.create(subCategory)
        },
    },
}
