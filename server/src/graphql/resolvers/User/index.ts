import { IResolvers } from "apollo-server-express"
import { UserArgs, UserBookingsArgs, UserBookingsData, UserListingsArgs, UserListingsData } from  "./types"
import { Database, User } from "../../../lib/types";
import { authorize } from "../../../lib/utils";
import { Request} from "express"

export const userResolvers:IResolvers = {
    Query: {
        user : async(_root :undefined, {id}:UserArgs,{db,req}:{db:Database,req:Request}) : Promise<User>=> {
            try{
                const user = await db.users.findOne({
                    _id: id
                })
                if(!user){
                    throw new Error("user cannot be found")
                }
                const viewer = await authorize(db,req,);

                if(viewer && viewer._id === user._id){
                    user.authorized = true
                }
                return user
            }
            catch{
                throw new Error("failed to query")
            }
        }
    },
    User :{
        id:(user:User):string => { return user._id },
        hasWallet : (user:User) : boolean | undefined => {return user.walletId ? true : undefined},
        income : (user:User): number| null => { return user.authorized ? user.income : null},
        bookings : async (user:User, {limit, page}:UserBookingsArgs, {db}:{db:Database}): Promise<UserBookingsData | null> => {
            try{
                if(!user.authorized){
                    return null
                }
                const data:UserBookingsData =  {
                    total:0,
                    result: []
                }

                let cursor = await db.bookings.find({
                    _id: {$in: user.bookings}
                })

                cursor = cursor.skip(page>0 ? page-1 * limit : 0);
                cursor = cursor.limit(limit);

                data.total = await cursor.count();
                data.result = await cursor.toArray();
                return data;
            }catch (err){
                throw new Error(`failed to query user bookings`)
            }
        },
        listings : async (user:User, {limit, page}:UserListingsArgs, {db}:{db:Database}): Promise<UserListingsData | null> => {
            try{
                const data:UserListingsData =  {
                    total:0,
                    result: []
                }

                let cursor = await db.listings.find({
                    _id: {$in: user.listings}
                })

                cursor = cursor.skip(page>0 ? page-1 * limit : 0);
                cursor = cursor.limit(limit);

                data.total = await cursor.count();
                data.result = await cursor.toArray();
                return data;
            }catch (err){
                throw new Error(`failed to query user listings`)
            }
        }
    }
}

