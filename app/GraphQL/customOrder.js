import { gql } from 'apollo-server-express'
import * as db from '../database'
import { Permissions, withPermissions } from '../utils'

export const typeDefs = gql`
    extend type Query {
        customOrders: [CustomOrder]
        customOrder(id: ID!): CustomOrder
        myCustomOrders(orderId: ID!, phone: String): [CustomOrder]
    }

    type CustomOrder {
        id: ID!
        name: String
        phone: String
        address: String
        city: String
        state: String
        pinCode: String
        itemName: String
    }
    extend type Mutation {
        createCustomOrder(
            name: String
            phone: String
            address: String
            city: String
            state: String
            pinCode: String
            itemName: String
        ): Order

        deleteCustomOrder(id: ID): Boolean
    }
`

export const resolvers = {
    Query: {
        customOrders: async () => db.customOrders.findAll(),
        customOrder: async (obj, args, context, info) =>
            db.customOrders.findByPk(args.id),
        myCustomOrders: async (obj, args, context, info) => {
            const subCategories = await db.customOrders.findAll({
                where: {
                    id: args.orderId,
                    phone: args.phone,
                },
            })

            return await db.customOrders.findAll({
                where: {
                    subCategory: subCategories.map((subCategory) =>
                        subCategory.id.toString(),
                    ),
                },
            })
        },
    },
    Mutation: {
        createCustomOrder: async (context, product) => {
            return db.customOrders.create(product)
        },

        deleteCustomOrder: withPermissions(
            [Permissions.DELETE_ORDER],
            async (context, args) => {
                return db.customOrders.destroy({
                    where: {
                        id: Number(args.id),
                    },
                })
            },
        ),
    },
}
