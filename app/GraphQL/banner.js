import { gql } from 'apollo-server-express'
import * as db from '../database'

export const typeDefs = gql`
    extend type Query {
        banners(limit: Int): [Banner]
    }

    type Banner {
        id: ID
        bannerUrls: String
        merchantBannerUrls: String
        mobileBannerUrls: String
        merchantMobileBannerUrls: String
    }
    extend type Mutation {
        createBanner(bannerUrls: String!, merchantBannerUrls: String!, mobileBannerUrls: String!, merchantMobileBannerUrls: String!): Banner
    }
`

export const resolvers = {
    Query: {
        banners: async (obj, args) =>   db.banners.findAll({
            limit: args.limit,
            order: [['updatedAt', 'DESC']],
        })
    },
    Mutation: {
        createBanner: async (context, permission) => {
            return db.banners.create(permission)
        },
       
    },
}
