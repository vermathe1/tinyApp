import { IResolvers } from "apollo-server-express"
import { Database } from "../../../lib/types"
import { ObjectID } from "mongodb";
import { Listing } from "../../../lib/types"
 
export const listingResolvers:IResolvers = {
    Query: {
        listings: async ( _root: undefined, _args:{}, { db }:{ db: Database } ): Promise<Listing[]> => {
            return await db.listings.find({}).toArray();
        }
    },
    Mutation: {
        deleteListing: async ( _root: undefined, {id}:{id:string}, { db }:{ db: Database } ): Promise<Listing> => {
            const deletedRes = await db.listings.findOneAndDelete({
                _id: new ObjectID(id)
            })   
            if(!deletedRes.value){
                throw new Error("Unable to delete the list!!")
            }
            return deletedRes.value;
        }
    },
    listing : {
        id:(listing: Listing) : string => listing._id.toString()
    }
}