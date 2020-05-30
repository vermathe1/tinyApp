import { Bookings, Listing} from "../../../lib/types"
export interface UserArgs {
    id:string;
}

export interface UserBookingsArgs{
    limit: number,
    page:number
}

export interface UserBookingsData{
    total : number,
    result : Bookings[];
}

export interface UserListingsArgs{
    limit: number,
    page:number
}
export interface UserListingsData{
    total : number,
    result : Listing[];
}