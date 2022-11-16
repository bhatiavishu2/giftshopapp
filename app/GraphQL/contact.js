import { gql } from 'apollo-server-express'
import * as db from '../database'

export const typeDefs = gql`
    extend type Query {
        contact: Contact
    }

    type Contact {
        id: ID
        html: String
    }
    extend type Mutation {
        createContact(html: String): About
    }
`

export const resolvers = {
    Query: {
        contact: async () =>
            db.contact.findAll({
                limit: 1,
                order: [['updatedAt', 'DESC']],
            })[0],
    },
    Mutation: {
        createContact: async (context, about) => {
            return db.contact.create(about)
        },
    },
}
