import { gql } from "apollo-server-express";

export const typeDefs = gql`
    type listing {
        id: ID!
        title: String!
        image: String!
        price: Int! 
    }
    
    type Query {
        listings : [listing!]!
    }

    type Mutation {
        deleteListing(id: ID!) : listing!
    }
`;
