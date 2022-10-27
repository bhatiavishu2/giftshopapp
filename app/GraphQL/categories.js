import { gql } from 'apollo-server-express'
import * as db from '../database'

export const typeDefs = gql`
    extend type Query {
        categories: [Category]
        category(id: ID!): Category
    }

    type Category {
        id: ID
        name: String
        categoryImage: String
        subCategories: [SubCategory]
    }
    extend type Mutation {
        createCategory(name: String, categoryImage: String): Category
        editCategory(
            categoryId: ID!
            name: String
            categoryImage: String
        ): [Int]
        deleteCategory(id: ID): Boolean
    }
`

export const resolvers = {
    Query: {
        categories: async (obj, args, context) => {
            return db.categories.findAll()
        },
        category: async (obj, args, context, info) =>
            db.categories.findByPk(args.id),
    },
    Category: {
        subCategories: async ({ dataValues }) => {
            return await db.subCategories.findAll({
                where: {
                    category: dataValues.id,
                },
            })
        },
    },
    Mutation: {
        createCategory: async (context, category) => {
            return db.categories.create(category)
        },
        editCategory: async (context, { categoryId: id, ...category }) => {
            return db.categories.update(category, {
                where: {
                    id,
                },
            })
        },
        deleteCategory: async (context, args) => {
            return db.categories.destroy({
                where: {
                    id: Number(args.id),
                },
            })
        },
    },
}
