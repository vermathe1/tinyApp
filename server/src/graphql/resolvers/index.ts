import merge from "lodash.merge";
import { userResolvers } from "./User"
import { viewerResolvers } from "./Viewer"
import { listingResolvers } from "./Listing"

export const resolvers =  merge(viewerResolvers,userResolvers,listingResolvers);