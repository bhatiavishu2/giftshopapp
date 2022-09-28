import { gql } from 'apollo-server-express'
import * as db from '../database'
import { v4 as uuidv4 } from 'uuid'

export const typeDefs = gql`
    type Auth {
        token: String
        userId: String
    }

    extend type Query {
        context(token: String!): RoleMapping
    }
    extend type Mutation {
        login(phone: String, password: String): Auth
    }
`

export const resolvers = {
    Query: {
        context: async (obj, args, context) => {
            const authData = await db.auth.findOne({
                where: {
                    token: args.token,
                },
            })
            if (!authData) {
                return new Error('Invalid Token')
            }
            return db.rolesMapping.findOne({
                where: {
                    userId: authData.userId,
                },
            })
        },
    },
    Mutation: {
        login: async (context, { phone, password }) => {
            const [userData] = await db.users.findAll({
                where: {
                    phone,
                    password: Buffer.from(password).toString('base64'),
                },
            })
            if (!userData) {
                return new Error('Invalid Credentials')
            }

            const authData = await db.auth.findOne({
                where: {
                    id: userData.dataValues.id,
                },
            })
            if (authData) {
                return authData
            }
            const auth = {
                token: uuidv4().toString(),
                userId: userData.dataValues.id,
            }
            return db.auth.create(auth)
        },
    },
}
