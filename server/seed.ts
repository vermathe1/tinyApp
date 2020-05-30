import { connectionDatabase }  from "./src/database";
import { ObjectID } from "mongodb"
import { Listing,ListingType, User } from "./src/lib/types";

const listings:Listing[] =[ 
    {
        _id : new ObjectID("5d378db94e84753160e08b4b"),
        title : " Clean and furnished 5 min away from CN Tower",
        description : "2 bed room and 2 bathroom cozy apartment",
        image : "https://res.cloudinary.com/tiny-house/image/upload/v1560641352/mock/Toronto/toronto-listing-1_exv0tf.jpg",
        host : "5d378db94e84753160e08b57",
        type: ListingType.Apartment,
        address :" Somewhere in Toronto",
        country : "Canada",
        admin : "Ontario",
        city : "Toronto",
        bookings :[],
        bookingsIndex :{},
        price : 12424,
        noOfGuests : 3
    },
    {
        _id : new ObjectID("5d378db94e84753160e08b4c"),
        title : " Clean and furnished 5 min away from CN Tower",
        description : "2 bed room and 2 bathroom cozy apartment",
        image : "https://res.cloudinary.com/tiny-house/image/upload/v1560641352/mock/Toronto/toronto-listing-2_aeg1rw.jpg",
        host : "5d378db94e84753160e08b55",
        type: ListingType.Apartment,
        address :" Somewhere in Toronto",
        country : "Canada",
        admin : "Ontario",
        city : "Toronto",
        bookings :[],
        bookingsIndex :{},
        price : 12424,
        noOfGuests : 3
    },
    {
        _id : new ObjectID("5d378db94e84753160e08b31"),
        title : " Clean and furnished 5 min away from CN Tower",
        description : "2 bed room and 2 bathroom cozy apartment",
        image : "https://res.cloudinary.com/tiny-house/image/upload/v1560641352/mock/Toronto/toronto-listing-2_aeg1rw.jpg",
        host : "5d378db94e84753160e08b56",
        type: ListingType.Apartment,
        address :" Somewhere in Toronto",
        country : "Canada",
        admin : "Ontario",
        city : "Toronto",
        bookings :[],
        bookingsIndex :{},
        price : 12424,
        noOfGuests : 3
    }
]

const users:User[]=[
    {
    _id:"5d378db94e84753160e08b55",
    token : "token_*****",
    name: "Pramod Verma 1",
    avatar: "https://i.picsum.photos/id/455/200/300.jpg",
    contact : "verma.the1@gmail.com",
    walletId: "acct_****",
    income: 43432,
    bookings: [],
    listings:[
        new ObjectID("5d378db94e84753160e08b4b")
    ]
    },
    {
        _id:"5d378db94e84753160e08b56",
        token : "token_*****",
        name: "Pramod Verma 2",
        avatar: "https://i.picsum.photos/id/455/200/300.jpg",
        contact : "verma.the1@gmail.com",
        walletId: "acct_****",
        income: 43432,
        bookings: [],
        listings:[
            new ObjectID("5d378db94e84753160e08b4c"),
        ]
        },
        {
            _id:"5d378db94e84753160e08b57",
            token : "token_*****",
            name: "Pramod Verma 3",
            avatar: "https://i.picsum.photos/id/455/200/300.jpg",
            contact : "verma.the1@gmail.com",
            walletId: "acct_****",
            income: 43432,
            bookings: [],
            listings:[
                new ObjectID("5d378db94e84753160e08b31")
            ]
            }
]
const seed = async () => {
    try{
        console.log("Seed has been started")
        const db = await connectionDatabase();
        // const listings: Listing[] = [
        //     {
        //         _id : new ObjectID(),
        //         title : "title1",
        //         address : "Bangalore"
               
        //     },
        //     {
        //         _id : new ObjectID(),
        //         title : "title2",
        //         address : "Kolkata"
        //     },
        //     {
        //         _id : new ObjectID(),
        //         title : "title3",
        //         address : "New Delhi"
        //     }
        // ]; 
        
        for(const list of listings ){
            await db.listings.insertOne(list);
        }
        for(const user of users ){
            await db.users.insertOne(user);
        }
        console.log(`[seed]: is successful`);
    } catch(err) {
        throw new Error(" Error in seed data to dabase :"+ err);
    }   
}
seed();