import { connectionDatabase }  from "./src/database";
import { ObjectID } from "mongodb"
import { Listing,ListingType, User } from "./src/lib/types";

const clear = async () => {
    try{
        console.log("Seed has been started")
        const db = await connectionDatabase();
        db.bookings.drop();
        db.listings.drop();
        db.users.drop();
        console.log(`[clear]: is successful`);
    } catch(err) {
        throw new Error(" Error in clear data to dabase :"+ err);
    }   
}
clear();