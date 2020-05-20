import React from 'react';
import { useQuery, useMutation } from "react-apollo"
import { gql } from "apollo-boost";
//import { ListingsData, DeleteListingData, DeleteListingsVaribales } from './types'
import {Listings as ListingsData } from "./__generated__/Listings";
import { DeleteListing as DeleteListingData ,DeleteListingVariables } from "./__generated__/DeleteListing"

interface Props{
    title: string
}

const LISTINGS = gql`
    query Listings{
            listings {
                id ,
                title
            }
        }
    `;  

const DELETE_LISTING =gql`
    mutation DeleteListing($id: ID!){
        deleteListing(id: $id){
            id
        }
    }
`;

export const Listings = ({title}: Props) => {

    const {data,refetch,loading,error }= useQuery<ListingsData>(LISTINGS);
    const [deleteLisiting,{loading: deleteLisitngLoading ,error: deleteListingErrors} ] = useMutation<DeleteListingData,DeleteListingVariables>(DELETE_LISTING);
    //console.log(data)
    const handleDeleteListings = async (id:string) => {
       await deleteLisiting({variables:{id} });
         refetch();
    }

    const listData = data ? (
        <ul>
            { 
            data.listings.map(info => {
               return <li key= {info.id}>{info.title}<button onClick={()=>{ handleDeleteListings(info.id)}}>Delete</button></li>
            })}
        </ul>
    ) : null ;

    if(loading){
        return <h1>Loading..</h1>
    }
    if(error){
        return <h1>Some Error..</h1>
    }
    
    return(
        <div>
            <h2>{listData}</h2>
        </div>
    )
}
