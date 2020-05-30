import { ObjectId,Collection, ObjectID } from "mongodb";

export interface Viewer{
    _id?:string
    token?: String
    avatar?: String
    walletId?: string
    didRequest:boolean
}

export enum ListingType{
    Apartment = "APARTMENT",
    House = "HOUSE"
}
export interface BookingsIndexMonth{
    [key:string]:boolean
}

export interface BookingsIndexYear{
    [key:string] : BookingsIndexMonth
}
export interface BookingsYear{
    [key:string]: BookingsIndexYear
}
export interface Listing {
    _id : ObjectId,
    title: string,
    description: string,
    image:string,
    host: string,
    type: ListingType,
    address: string,
    country:string,
    admin:string,
    city:string,
    bookings: ObjectID[],
    bookingsIndex : BookingsYear,
    price: number,
    noOfGuests : number
}

export interface User{
    _id:string,
    token : string,
    name: string,
    avatar: string,
    contact : string,
    walletId?: string,
    income: number,
    bookings: ObjectID[],
    listings: ObjectID[],
    authorized?:boolean
}
export interface Bookings{
    _id:ObjectID,
    listing: ObjectID,
    tenant : string,
    checkIn : string,
    checkout : string
}

export interface Database{
    listings: Collection<Listing>
    users : Collection<User>
    bookings : Collection<Bookings>
}