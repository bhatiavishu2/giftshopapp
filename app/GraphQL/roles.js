import { gql } from 'apollo-server-express'
import * as db from '../database'

export const typeDefs = gql`
    extend type Query {
        roles: [Role]
        role(id: ID!): Role
    }

    type Role {
        id: ID
        permissions: String
        permissionsValues: [String]
        name: String
    }
    extend type Mutation {
        createRole(name: String, permissions: [String], userId: ID): Role
    }
`

export const resolvers = {
    Query: {
        roles: async () => {
            const roles = await db.roles.findAll()
            return roles.map(async (role) => {
                const permissionsData = await db.permissions.findAll({
                    where: {
                        id: role.permissions
                            .split(',')
                            .map((permission) => Number(permission)),
                    },
                })

                const permissionsValues = permissionsData.map(
                    (permission) => permission.dataValues.name,
                )
                return {
                    ...role.dataValues,
                    permissionsValues,
                }
            })
        },
        role: async (obj, args, context, info) => db.roles.findByPk(args.id),
    },

    Mutation: {
        createRole: async (context, role) => {
            const newRole = {
                ...role,
                permissions: role.permissions.join(','),
            }
            return db.roles.create(newRole)
        },
    },
}
