import { gql } from 'apollo-server-express'
import * as db from '../database'
import { withPermissions, Permissions } from '../utils'

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
        editPermission(id: ID!, name: String): [Int]
        deletePermission(id: ID): Boolean
    }
`

export const resolvers = {
    Query: {
        permissions: async () => db.permissions.findAll(),
        permission: async (obj, args, context, info) =>
            db.permissions.findByPk(args.id),
    },
    Mutation: {
        createPermission: withPermissions(
            [Permissions.CREATE_PERMISSION],
            async (context, permission) => {
                return db.permissions.create(permission)
            },
        ),
        editPermission: withPermissions(
            [Permissions.CREATE_PERMISSION],
            async (context, { id, ...permission }) => {
                return db.permissions.update(permission, {
                    where: {
                        id,
                    },
                })
            },
        ),
        deletePermission: withPermissions(
            [Permissions.CREATE_PERMISSION],
            async (context, args) => {
                return db.permissions.destroy({
                    where: {
                        id: Number(args.id),
                    },
                })
            },
        ),
    },
}
