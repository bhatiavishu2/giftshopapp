import { gql } from 'apollo-server-express'
import * as db from '../database'
import { Permissions, withPermissions } from '../utils'

export const typeDefs = gql`
    extend type Query {
        users: [User]
        user(id: ID!): User
    }

    type User {
        id: ID
        phone: String
        name: String
        address: String
        companyName: String
        userRoles: RoleMapping
    }
    extend type Mutation {
        createUser(
            phone: String
            name: String
            password: String
            address: String
            companyName: String
        ): User

        editUser(
            id: ID!
            phone: String
            name: String
            password: String
            address: String
            companyName: String
        ): [Int]

        deleteUser(id: ID): Boolean
    }
`

export const resolvers = {
    Query: {
        users: async () => db.users.findAll(),
        user: async (obj, args, context, info) => db.users.findByPk(args.id),
    },
    User: {
        userRoles: async ({ dataValues }) => {
            return db.rolesMapping.findOne({
                where: {
                    userId: dataValues.id,
                },
            })
        },
    },
    Mutation: {
        createUser: async (context, user) => {
            const newUser = {
                ...user,
                password: Buffer.from(user.password).toString('base64'),
            }
            return db.users.create(newUser)
        },
        editUser: async (context, { id, ...user }) => {
            const dbUser = await db.users.findByPk(Number(id))
            const newUser = {
                ...dbUser,
                ...user,
            }
            return db.users.update(newUser, {
                where: {
                    id,
                },
            })
        },
        deleteUser: withPermissions(
            [Permissions.DELETE_USER],
            async (context, args) => {
                await db.rolesMapping.destroy({
                    where: {
                        userId: Number(args.id),
                    },
                })
                await db.rolesMapping.destroy({
                    where: {
                        userId: Number(args.id),
                    },
                })
                await db.auth.destroy({
                    where: {
                        userId: Number(args.id),
                    },
                })
                return db.users.destroy({
                    where: {
                        id: Number(args.id),
                    },
                })
            },
        ),
    },
}
