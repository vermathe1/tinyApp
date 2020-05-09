import express from "express";
// import bodyParser from "body-parser";
import { listings } from "./listings";
import { ApolloServer } from 'apollo-server-express';
import { typeDefs, resolvers } from "./graphql"
//import { schema } from './graphql';

const app = express();
const port = 9000;
const server = new ApolloServer( {typeDefs , resolvers} );
server.applyMiddleware({app, path:"/api"});

// app.use(bodyParser.json());

// app.get("/listings",( _req, res) => res.send(listings));

// app.post("/delete-listing",( req, res) => {
//     let id = req.body.id;
//     for(let i=0;i<listings.length;i++){
//         if(listings[i].id === id){
//             return res.send(listings.splice(i,1));
//         }
//     }
//     return res.send("failed to delete the lsitings");
// });
app.listen(port);
console.log(`[app]: http://localhost:${port}`);
