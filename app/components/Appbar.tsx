import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";

export function Appbar(){
    const session = useSession()
    return <div>
        <div className="flex justify-between">
            <div>
                Muxic
            </div>    
            <div className=" m-2 p-2 bg-blue-400">
                {session.data?.user &&   <button onClick={() => signOut()}> Logout </button>}
                {!session.data?.user && <button onClick={() => signIn()}> Login </button>}
            </div>
        </div>       
    </div>
}