import { gql } from 'apollo-server-express'
import * as db from '../database'
import { Permissions, withPermissions } from '../utils'

export const typeDefs = gql`
    extend type Query {
        orders: [Order]
        order(id: ID!): Order
        MyOrders(userId: ID!): [Order]
    }

    type Order {
        id: ID!
        userId: String
        productIds: String
        orderStatus: String
        orderRemarks: String
        shippingDetails: String
        initialPayment: String
    }
    extend type Mutation {
        createOrder(
            userId: String
            productIds: String
            orderStatus: String
            orderRemarks: String
            shippingDetails: String
            initialPayment: String
        ): Order

        deleteOrder(id: ID): Boolean
    }
`

export const resolvers = {
    Query: {
        orders: async () => db.orders.findAll(),
        order: async (obj, args, context, info) => db.orders.findByPk(args.id),
        MyOrders: async (obj, args, context, info) => {
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
        createProduct: async (context, product) => {
            return db.orders.create(product)
        },

        deleteOrder: withPermissions(
            [Permissions.DELETE_ORDER],
            async (context, args) => {
                return db.orders.destroy({
                    where: {
                        id: Number(args.id),
                    },
                })
            },
        ),
    },
}
