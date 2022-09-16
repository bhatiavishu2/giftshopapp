import { gql } from 'apollo-server-express'
import * as db from '../database'

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
        createRole(name: String, permissions: [String], userId: ID): Role
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
        createRole: async (context, role) => {
            const newRole = {
                ...role,
                permissions: role.permissions.join(','),
            }
            return db.roles.create(newRole)
        },
    },
}
