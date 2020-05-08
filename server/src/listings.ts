interface Listing{
    id: string;
    title: string;
    price: number;
    noOfGuests: number;
    noOfBaths: number;
    rating: number;
}

export const listings: Listing[] = [
    {
        id : "001",
        title : "title1",
        price : 20,
        noOfGuests : 200,
        noOfBaths : 33,
        rating : 4
    },
    {
        id : "002",
        title : "title2",
        price : 20,
        noOfGuests : 200,
        noOfBaths : 33,
        rating : 4
    },
    {
        id : "003",
        title : "title3",
        price : 20,
        noOfGuests : 200,
        noOfBaths : 33,
        rating : 4
    }
]; 