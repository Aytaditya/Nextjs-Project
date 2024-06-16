"use client"

import { useRouter } from "next/navigation"
import axios from "axios"

export default function ProfilePage() {
    const router=useRouter()
    const logout=async()=>{
        try {
            const response= await axios.get("/api/users/logout")
            router.push("/login")
            
        } catch (error:any) {
            console.log(error.message)
        }
    }
    return (
        <div className="p-5">
            <h1 className="text-[purple] text-3xl mb-4">Pofile page</h1>
            <button className="bg-[purple] w-[20%] text-white px-4 py-2 rounded-lg font-semibold mr-2 hover:bg-[#501b50]" onClick={logout} >Logout</button>
        </div>
    )
}