import { MongoClient, Db } from "mongodb";
import { Database } from "../lib/types"

const user = "pramod";
const password = "tinyapp2014";
const cluster = "cluster0-fhwhi";

const url = `mongodb+srv://${user}:${password}@${cluster}.mongodb.net/test?retryWrites=true&w=majority`

export const connectionDatabase = async (): Promise<Database> => {
    const client = await MongoClient.connect(url, { 
        useNewUrlParser: true,
        useUnifiedTopology: true
    } );

    const db = client.db('main');
    return {
        listings : db.collection("test_listings")
    }
}