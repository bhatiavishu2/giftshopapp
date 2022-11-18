import { gql } from 'apollo-server-express'
import * as db from '../database'
import { Permissions, withPermissions } from '../utils'

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
        createBanner(
            bannerUrls: String!
            merchantBannerUrls: String!
            mobileBannerUrls: String!
            merchantMobileBannerUrls: String!
        ): Banner
    }
`

export const resolvers = {
    Query: {
        banners: async (obj, args) =>
            db.banners.findAll({
                limit: args.limit,
                order: [['updatedAt', 'DESC']],
            }),
    },
    Mutation: {
        createBanner: withPermissions(
            [Permissions.CREATE_BANNER],
            async (context, permission) => {
                return db.banners.create(permission)
            },
        ),
    },
}
