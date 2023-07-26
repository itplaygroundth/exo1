import React, { createContext, useMemo } from 'react';
const StateContext = createContext();

export function StateProvider({children}){
   
    const [status, setStatus] = React.useState(false);
    const [user,setUser] = React.useState( )
    const [message,setMessage]= React.useState('')
 

    //const state = {user,setUser,status,setStatus,message,setMessage};

    const state = useMemo(()=>{
        return [status, setStatus, message, setMessage,user,setUser]
    },[status, setStatus, message, setMessage,user,setUser])
    return (
        <StateContext.Provider value={state} >
            {children}
        </StateContext.Provider>
    )
}
 
 
export function useUserState(){
    const context = React.useContext(StateContext);
    if(context === undefined)
        throw new Error('Undefined');
    return context;
}