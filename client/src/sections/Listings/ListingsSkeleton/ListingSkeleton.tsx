import React from "react";
import { Skeleton , Divider} from "antd";

interface Props{
    title: string
}

export const ListingSkeleton = ({title}:Props ) => {
    return (
        <div>
            <h2>{title}</h2>
            <Skeleton active paragraph ={{rows : 1}}/>
           
        </div>
    )
}