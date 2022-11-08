import { gql } from 'apollo-server-express'
import * as db from '../database'

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
    }
    extend type Mutation {
        createUser(
            phone: String
            name: String
            password: String
            address: String
            companyName: String
        ): User
    }
`

export const resolvers = {
    Query: {
        users: async () => db.users.findAll(),
        user: async (obj, args, context, info) => db.users.findByPk(args.id),
    },
    Mutation: {
        createUser: async (context, user) => {
            const newUser = {
                ...user,
                password: Buffer.from(user.password).toString('base64'),
            }
            return db.users.create(newUser)
        },
    },
}
