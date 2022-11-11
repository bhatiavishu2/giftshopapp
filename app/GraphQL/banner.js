import { gql } from 'apollo-server-express'
import * as db from '../database'

export const typeDefs = gql`
    extend type Query {
        banners(limit: Int): [Banner]
    }

    type Banner {
        id: ID
        bannerUrl: String
    }
    extend type Mutation {
        createBanner(bannerUrl: String): Banner
    }
`

export const resolvers = {
    Query: {
        banners: async (obj, args) =>   db.banner.findAll({
            limit: args.limit,
            order: [['updatedAt', 'DESC']],
        })
    },
    Mutation: {
        createBanner: async (context, permission) => {
            return db.banner.create(permission)
        },
       
    },
}
