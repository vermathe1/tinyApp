import React from 'react';
import { Layout } from "antd"
import { useMutation } from "@apollo/react-hooks"
import { LOG_OUT } from "../../lib/graphql/mutations/LogOut";
import { LogOut as LogOutData  } from "../../lib/graphql/mutations/LogOut/__generated__/LogOut"
import { Viewer } from "../../lib/types";

interface Props{
    setViewer :(viewer:Viewer) => void
}

const { Content } =  Layout;
export const User = ({setViewer}:Props) => {
    const [logOut] = useMutation<LogOutData>(LOG_OUT,{
        onCompleted: (data) => {
            if(data && data.logOut){
                setViewer(data.logOut)
            }
        }
    });

    const handleLogOut = () => {
        logOut();
        sessionStorage.removeItem("token");
    }
    return(
        <div>
            User
            <Content>
                    <button onClick = { handleLogOut }>LogOut</button>
            </Content>
        </div>
    )
}