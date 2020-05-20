import React,{useState, useEffect,useReducer} from 'react';
import { server } from "../../lib/api";

interface State<TData>{
    data: TData | null,
    loading :boolean,
    error : boolean
}

type Action<TData> = 
    | { type : "FETCH" }
    | { type : "FETCH_SUCCESS", payload: TData }
    | { type : "FETCH_ERROR" };

const initialState = {data:null,loading:false,error:false};

const reducer = <TData>()=>( state:State<TData>=initialState, action:Action<TData> ):State<TData> => {
    switch(action.type){
        case "FETCH":{
            return{...state, loading:true}
        }
        case "FETCH_SUCCESS" : {
            return {...state,loading:false,error:false,data:action.payload}
        }
        case "FETCH_ERROR" : {
            return{...state,error:true,loading:false}
        }
        default:{
            return state
        }
    }
}

export const useQuery = <TData>(query:string) => {
    const reducerFunction  = reducer<TData>();
    const [state,dispatch] = useReducer(reducerFunction,initialState);
    // const [state, setState] = useState <State<TData>>({data:null,loading:false,errors:false});
    
    const fetch = React.useCallback(() => {
        const fetchApi = async() => {
            try{
                dispatch({type:'FETCH'})
                const {data, errors} = await server.fetch<TData>({query}); 
                if(errors && errors.length){
                    throw new Error(errors[0].message)                    
                }
               dispatch({type:'FETCH_SUCCESS',payload:data});
            }catch(err){
                dispatch({type:'FETCH_ERROR'});
                throw console.error(err);   
            }
        }
        fetchApi();
    },[query])

    useEffect(() => {
        fetch()
    },[fetch]);

    return { ...state, refetch:fetch}
}
