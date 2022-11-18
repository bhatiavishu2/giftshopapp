import { gql } from 'apollo-server-express'
import * as db from '../database'
import { Permissions, withPermissions } from '../utils'

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
        contact: async () => {
            const result = await db.contact.findAll({
                limit: 1,
                order: [['updatedAt', 'DESC']],
            })
            return result[0].dataValues
        },
    },
    Mutation: {
        createContact: withPermissions(
            [Permissions.CREATE_CONTACT_US],
            async (context, about) => {
                return db.contact.create(about)
            },
        ),
    },
}
