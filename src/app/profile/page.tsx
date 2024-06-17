"use client"

import { useRouter } from "next/navigation"
import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"


export default function ProfilePage() {
    const router=useRouter()
    const [data,setData]=useState({email:"",username:""} as any)
    const logout=async()=>{
        try {
            const response= await axios.get("/api/users/logout")
            router.push("/login")
            
        } catch (error:any) {
            console.log(error.message)
        }
    }
    const getData=async()=>{
        try {
            const response=await axios.get("/api/users/me")
            console.log(response.data)
            setData(response.data.user)
            
        } catch (error:any) {
            console.log(error.message)
            alert(error.message)
        }
    }

    useEffect(()=>{
        getData()
      
    },[])

    return (
        <div className="p-5">
            <h1 className="text-[#ffabff] text-3xl mb-4">Pofile page</h1>
            <button className="bg-[purple] w-[20%] text-white px-4 py-2 rounded-lg font-semibold mr-2 hover:bg-[#501b50]" onClick={logout} >Logout</button>
            <div className="flex justify-center items-center flex-col">
            <h1 className=" text-4xl">Profile Info</h1>
            <h3 className="mt-4">Username: {data.username}</h3>
            <h3 className="mt-2">Email: {data.email}</h3>
            </div>
        </div>
    )
}
