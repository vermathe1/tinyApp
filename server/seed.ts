import { connectionDatabase }  from "./src/database";
import { ObjectID } from "mongodb"
import { Listing } from "./src/lib/types";

const seed = async () => {
    try{
        console.log("Seed has been started")
        const db = await connectionDatabase();
        const listings: Listing[] = [
            {
                _id : new ObjectID(),
                title : "title1",
                address : "Bangalore"
               
            },
            {
                _id : new ObjectID(),
                title : "title2",
                address : "Kolkata"
            },
            {
                _id : new ObjectID(),
                title : "title3",
                address : "New Delhi"
            }
        ]; 
        
        for(const list of listings ){
           
            await db.listings.insertOne(list);
        }
        console.log(`[seed]: is successful`);
    } catch(err) {
        throw new Error(" Error in seed data to dabase :"+ err);
    }   
}
seed();