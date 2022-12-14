import { gql } from 'apollo-server-express'
import Query from 'sequelize/lib/dialects/mysql/query'
import * as db from '../database'
import { Permissions, withPermissions } from '../utils'
export const typeDefs = gql`
    extend type Query {
        rolesMapping: [RoleMapping]
        roleMapping(id: ID!): RoleMapping
    }

    type RoleMapping {
        id: ID
        userId: String
        roleIds: [String]
        userDetails: User
        roleDetails: [Role]
    }
    extend type Mutation {
        createRoleMapping(roleIds: [String], userId: ID): RoleMapping
        editRoleMapping(id: ID!, name: String, permissions: [String]): [Int]
        deleteRoleMapping(id: ID): Boolean
    }
`

export const resolvers = {
    Query: {
        rolesMapping: async () => db.rolesMapping.findAll(),
        roleMapping: async (obj, args, context, info) =>
            db.rolesMapping.findByPk(args.id),
    },

    RoleMapping: {
        roleDetails: async ({ dataValues }) => {
            return db.roles.findAll({
                where: {
                    id: dataValues.roleIds
                        .split(',')
                        .map((role) => Number(role)),
                },
            })
        },
        roleIds: async ({ dataValues, roleIDs }) => {
            return dataValues
                ? dataValues.roleIds.split(',')
                : roleIds.split(',')
        },
        userDetails: async ({ dataValues }) => {
            return db.users.findByPk(Number(dataValues.userId))
        },
    },
    Mutation: {
        createRoleMapping: withPermissions(
            [Permissions.CREATE_USER_ROLE],
            async (context, roleMapping) => {
                const newRoleMapping = {
                    ...roleMapping,
                    roleIds: roleMapping.roleIds.join(','),
                }

                const roleMappingData = await db.rolesMapping.findOne({
                    where: {
                        userId: roleMapping.userId,
                    },
                })
                if (roleMappingData) {
                    db.rolesMapping.update(newRoleMapping, {
                        where: {
                            id: roleMappingData.dataValues.id,
                        },
                    })
                    return {
                        ...roleMappingData.dataValues,
                        newRoleMapping,
                    }
                }

                return db.rolesMapping.create(newRoleMapping)
            },
        ),
        editRoleMapping: withPermissions(
            [Permissions.CREATE_USER_ROLE],
            async (context, { id, ...roleMapping }) => {
                const newRoleMapping = {
                    ...roleMapping,
                    roleIds: roleMapping.roleIds.join(','),
                }

                const roleMappingData = await db.rolesMapping.findOne({
                    where: {
                        id: Number(id),
                    },
                })
                if (roleMappingData) {
                    db.rolesMapping.update(newRoleMapping, {
                        where: {
                            id: roleMappingData.dataValues.id,
                        },
                    })
                    return {
                        ...roleMappingData.dataValues,
                        newRoleMapping,
                    }
                }

                return new Error('Role Mapping does not exist')
            },
        ),
        deleteRoleMapping: withPermissions(
            [Permissions.CREATE_USER_ROLE],
            async (context, args) => {
                return db.rolesMapping.destroy({
                    where: {
                        id: Number(args.id),
                    },
                })
            },
        ),
    },
}
