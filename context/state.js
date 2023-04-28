import React, { createContext, useContext } from 'react';
const StateContext = createContext();

export function StateProvider({children}){
   
    const [status, setStatus] = React.useState('loaded');
    const [user,setUser] = React.useState({
        name: "Mobilius",
        balance: 2000
      })

 

    const state = {user,setUser,status,setStatus};
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