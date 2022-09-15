import { gql } from 'apollo-server-express'
import * as db from '../database'

export const typeDefs = gql`
    extend type Query {
        rolesMapping: [RoleMapping]
        roleMapping(id: ID!): RoleMapping
    }

    type RoleMapping {
        id: ID
        userId: String
        roleIds: [String]
    }
    extend type Mutation {
        createRoleMapping(roleIds: [String], userId: ID): RoleMapping
    }
`

export const resolvers = {
    Query: {
        rolesMapping: async () => db.rolesMapping.findAll(),
        roleMapping: async (obj, args, context, info) =>
            db.rolesMapping.findByPk(args.id),
    },
    Mutation: {
        createRoleMapping: async (context, roleMapping) => {
            const newRoleMapping = {
                ...roleMapping,
                roleIds: roleMapping.roleIds.join(','),
            }
            return db.rolesMapping.create(newRoleMapping)
        },
    },
}
