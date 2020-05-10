import { ObjectId,Collection } from "mongodb";

export interface Listing {
    _id : ObjectId,
    title : string,
    address : string
}

export interface Database{
    listings: Collection<Listing>
}