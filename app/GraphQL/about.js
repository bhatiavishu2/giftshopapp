import { gql } from 'apollo-server-express'
import * as db from '../database'

export const typeDefs = gql`
    extend type Query {
        about: About
    }

    type About {
        id: ID
        html: String
    }
    extend type Mutation {
        createAbout(html: String): About
    }
`

export const resolvers = {
    Query: {
        about: async () => {
            const result = await db.about.findAll({
                limit: 1,
                order: [['updatedAt', 'DESC']],
            })
            return result[0].dataValues
        },
    },
    Mutation: {
        createAbout: async (context, about) => {
            return db.about.create(about)
        },
    },
}
