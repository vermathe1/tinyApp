import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import ApolloClient from "apollo-boost"
import { ApolloProvider,useMutation } from "react-apollo"
import "./styles/index.css";
import {BrowserRouter as Router, Route,Switch} from "react-router-dom";
import { Home,Host,Listing,Listings,User,NotFound,Login} from "./sections"
import { Viewer } from "../src/lib/types"
import { LOG_IN } from "../src/lib/graphql/mutations/Login/index";
import { LogIn as LogInData, LogInVariables } from "../src/lib/graphql/mutations/Login/__generated__/LogIn"


const client = new ApolloClient({
  uri: '/api',
  request : async operation =>{
    const token = sessionStorage.getItem("X-CSRF-TOKEN");
    operation.setContext({
      headers: {
        "X-CSRF-TOKEN" : token || ""
      }
    })
  }
})
const initialViewer: Viewer = {
  id : null,
  token : null,
  avatar : null,
  hasWallet : null,
  didRequest : false
}
interface Props{
  setViewer:(viewrer : Viewer)=> void
}
const App = () => {

  const [ viewer, setViewer ] = useState<Viewer>(initialViewer);
  const [ login,{ error:logInError } ] = useMutation<LogInData , LogInVariables>(LOG_IN,{
    onCompleted : (data) =>{
      if(data &&data.logIn){
        setViewer(data.logIn);

        if(data.logIn.token){
          sessionStorage.setItem("token",data.logIn.token);
        }else{
          sessionStorage.removeItem("token")
        }
      }
    }
  });

  const logInRef = useRef(login);

  useEffect(() => {
    logInRef.current();
  },[])

  return(

    <Router>
      <Switch>
        <Route exact path = "/" component = { Home } />
        <Route 
            exact 
            path = "/user/:id"  
            render = { props => <User {...props} setViewer={setViewer}  />}
        />
        <Route exact path = "/host" component = { Host } />
        <Route exact path = "/listing/:id" component = { Listing } />
        <Route exact path = "/listings/:location?" component = { Listings } />
        <Route 
          exact 
          path = "/login" 
          render = { props => <Login {...props} setViewer={setViewer} /> } 
        />
        <Route component ={NotFound} />
      </Switch>
    </Router>

  )
}


ReactDOM.render(
  <ApolloProvider client = { client }>
   <App/>
  </ApolloProvider>,
  document.getElementById('root')
 
 
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
