"use client"

import {useState} from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { axios } from "axios"
import Image from "next/image"

export default function SignupPage() {
    const [user,setUser] = useState({
        email: "",
        password: "",
        username: ""
    })
    const onSignup=async()=>{

    }
    return (
        <div className="flex flex-row bg-custom h-screen ">
            <div className="flex flex-col  px-4 py-6 min-h-[500px] w-[35%] upper-layer m-10">
            <h1 className="text-3xl flex items-center justify-center font-bold">SignUp to &nbsp; <span className="text-[purple] font-bold text-4xl">App</span></h1>
            <form action="" className="mt-5">
                {/* first input */}
            <div className="flex flex-col mt-3">
            <label htmlFor="username" className="text-white">Username</label>
            <input type="text" placeholder="aytaditya" className="w-[60%] bg-transparent border-b-[1px] mt-1 rounded-sm px-2 font-light text-white" value={user.username} onChange={(e)=>setUser({...user,username:e.target.value})} />
            </div>
            {/* second input */}
            <div className="flex flex-col mt-3">
            <label htmlFor="email" className="text-white">Email</label>
            <input type="email" placeholder="aditya@gmail.com" className="w-[60%] bg-transparent border-b-[1px] mt-1 rounded-sm px-2 font-light text-white" value={user.email} onChange={(e)=>setUser({...user,username:e.target.value})} />
            </div>
            </form>
        </div>
        <div className="m-[100px]">
        <Image src="/hello.svg" alt="logo" width={560} height={150} className="my-[50px]" loading="lazy" layout="intrinsic" />
        </div>
        
            
        </div>
    )
}