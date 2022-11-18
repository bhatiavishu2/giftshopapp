import { gql } from 'apollo-server-express'
import * as db from '../database'
import { Permissions, withPermissions } from '../utils'

export const typeDefs = gql`
    extend type Query {
        roles: [Role]
        role(id: ID!): Role
    }

    type Role {
        id: ID
        permissions: [String]
        name: String
        permissionsDetails: [Permission]
    }
    extend type Mutation {
        createRole(name: String, permissions: [String]): Role
        editRole(id: ID!, name: String, permissions: [String]): [Int]
        deleteRole(id: ID): Boolean
    }
`

export const resolvers = {
    Query: {
        roles: async (obj, args, context) => {
            return db.roles.findAll()
        },
        role: async (obj, args, context, info) => db.roles.findByPk(args.id),
    },
    Role: {
        permissionsDetails: async ({ dataValues }) => {
            return await db.permissions.findAll({
                where: {
                    id: dataValues.permissions
                        .split(',')
                        .map((permission) => Number(permission)),
                },
            })
        },
        permissions: async ({ dataValues }) => {
            return dataValues.permissions.split(',')
        },
    },
    Mutation: {
        createRole: withPermissions(
            [Permissions.CREATE_ROLE],
            async (context, role) => {
                const newRole = {
                    ...role,
                    permissions: role.permissions.join(','),
                }
                return db.roles.create(newRole)
            },
        ),
        editRole: withPermissions(
            [Permissions.CREATE_ROLE],
            async (context, { id, ...role }) => {
                const newRole = {
                    ...role,
                    permissions: role.permissions.join(','),
                }
                return db.roles.update(newRole, {
                    where: {
                        id,
                    },
                })
            },
        ),
        deleteRole: withPermissions(
            [Permissions.CREATE_ROLE],
            async (context, args) => {
                return db.roles.destroy({
                    where: {
                        id: Number(args.id),
                    },
                })
            },
        ),
    },
}
