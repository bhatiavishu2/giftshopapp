import { gql } from 'apollo-server-express'
import * as db from '../database'
import { Permissions, withPermissions } from '../utils'

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
        createCategory: withPermissions(
            [Permissions.CREATE_CATEGORY],
            async (context, category) => {
                return db.categories.create(category)
            },
        ),
        editCategory: withPermissions(
            [Permissions.EDIT_CATEGORY],
            async (context, { categoryId: id, ...category }) => {
                return db.categories.update(category, {
                    where: {
                        id,
                    },
                })
            },
        ),
        deleteCategory: withPermissions(
            [Permissions.DELETE_CATEGORY],
            async (context, args) => {
                return db.categories.destroy({
                    where: {
                        id: Number(args.id),
                    },
                })
            },
        ),
    },
}
