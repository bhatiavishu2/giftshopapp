import { gql } from 'apollo-server-express'
import * as db from '../database'

export const typeDefs = gql`
    extend type Query {
        permissions: [Permission]
        permission(id: ID!): Permission
    }

    type Permission {
        id: ID
        name: String
    }
    extend type Mutation {
        createPermission(name: String): Permission
    }
`

export const resolvers = {
    Query: {
        permissions: async () => db.permissions.findAll(),
        permission: async (obj, args, context, info) =>
            db.permissions.findByPk(args.id),
    },
    Mutation: {
        createPermission: async (context, permission) => {
            return db.permissions.create(permission)
        },
    },
}
