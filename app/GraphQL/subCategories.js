import { gql } from 'apollo-server-express'
import * as db from '../database'
import { Permissions, withPermissions } from '../utils'

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
        editSubCategory(id: ID!, name: String, category: String): [Int]
        deleteSubCategory(id: ID): Boolean
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
            return await db.categories.findByPk(Number(dataValues.category))
        },
    },
    Mutation: {
        createSubCategory: withPermissions(
            [Permissions.CREATE_CATEGORY],
            async (context, subCategory) => {
                return db.subCategories.create(subCategory)
            },
        ),
        editSubCategory: withPermissions(
            [Permissions.CREATE_CATEGORY],
            async (context, { id, ...subCategory }) => {
                return db.subCategories.update(subCategory, {
                    where: {
                        id,
                    },
                })
            },
        ),
        deleteSubCategory: withPermissions(
            [Permissions.CREATE_CATEGORY],
            async (context, args) => {
                return db.subCategories.destroy({
                    where: {
                        id: Number(args.id),
                    },
                })
            },
        ),
    },
}
