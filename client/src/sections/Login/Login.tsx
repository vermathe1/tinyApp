import React,{ useEffect, useRef } from 'react';
import { Layout } from "antd"
import { AUTH_URL } from "../../lib/graphql/queries/AuthUrl";
import { LOG_IN } from "../../lib/graphql/mutations/Login";
import { LogIn as LogInData, LogInVariables } from "../../lib/graphql/mutations/Login/__generated__/LogIn"
import { AUTHURL as  AUTHUrlData } from "../../lib/graphql/queries/AuthUrl/__generated__/AUTHURL"
import { Viewer } from "../../lib/types";
import { useApolloClient, useMutation } from "@apollo/react-hooks"
import { Redirect } from "react-router";


interface Props{
    setViewer :(viewer:Viewer) => void
}

const { Content } =  Layout;

export const Login = ({setViewer}:Props) => {
    const client = useApolloClient();
    const [logIn, 
        { data : loginData, loading:logInLoading, error:loginError }
    ] = useMutation<LogInData,LogInVariables>(LOG_IN,{
        onCompleted: (data) => {
            if(data && data.logIn && data.logIn.token){
                setViewer(data.logIn)
                sessionStorage.setItem("token",data.logIn.token);
            }
        }
    });

    const logInRef = useRef(logIn);
    useEffect(()=>{
        const code = new URL(window.location.href).searchParams.get("code");
        if(code){
            logInRef.current({
                variables: {
                    input: { code }
                }
            })
        }
    },[])

    const hangleAuthorize = async () => {
        try{
            const { data } = await client.query<AUTHUrlData>({
                query: AUTH_URL
            });
            window.location.href = data.authUrl;
        }
        catch{
            throw new Error(`Sorry! we were unable to login. Please try again later`)
        }
    }

    if  (loginData && loginData.logIn)  {
        const {id : viewerId} = loginData.logIn;
        return <Redirect to={`/user/${viewerId}`}/>
    }   

    return(
        <Content>
                <button onClick = { hangleAuthorize }>
                    Signin with google
                </button>
        </Content>
    )
}