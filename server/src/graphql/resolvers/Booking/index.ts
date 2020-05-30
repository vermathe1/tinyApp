import { IResolvers } from "apollo-server-express"
import { Database, Bookings,Listing } from "../../../lib/types"
 
export const bookingResolvers:IResolvers = {
    Booking:{
        id:(booking:Bookings): string => {
            return booking._id.toString();
        },
        listing:(booking:Bookings,_args:{}, {db}:{db:Database}): Promise<Listing | null> =>{
             return db.listings.findOne({
                _id: booking._id
            })
        }

    }
}