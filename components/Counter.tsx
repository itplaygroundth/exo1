import { useUserState } from "@/context/state";
export default function Counter(){
    const {user,setUser} = useUserState()
    
    return (
        <div  >
            <center>
         
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={()   => setUser({...user,balance: user.balance+1})}>
                +
            </button>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={()   => setUser({...user,balance: user.balance-1})}>
                -
            </button>
            </center>
        </div>
    )
}