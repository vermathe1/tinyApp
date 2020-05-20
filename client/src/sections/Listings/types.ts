export interface Listings {
    id:string,
    title: string,
    address: string
}

export interface ListingsData {
    listings : Listings[]
}

export interface DeleteListingsVaribales {
   variables:{ id: string}
}

export interface DeleteListingData {
    deleteListing : Listings;
}