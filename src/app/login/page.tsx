"use client"

import {useState} from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import  axios  from "axios"
import Image from "next/image"


export default function LoginPage() {
    const router = useRouter();
    const [user,setUser] = useState({
        email: "",
        password: "",
    })

    const [loading,setLoading]=useState(false)

    const onSignup=async(e:any)=>{
        e.preventDefault();
        console.log(user);
        try {
            setLoading(true);
            const response=await axios.post("/api/users/login",user);
            console.log(response.data)

            //clearing the input fields
            setUser({
                email: "",
                password: "",
            })

            //clearing the loading state
            setLoading(false)

            //redirect to home page
            router.push("/")
            
        } catch (error:any) {
            console.log(error)
            alert(error.message)
        }
        finally{
            setLoading(false)
        }

    }
    const handleDisable =():boolean=>{
        if(user.email=="" || user.password==""){
            return true
    }
    return false
}

    return (
        <div className="flex flex-row bg-custom h-screen ">
            <div className="flex flex-col  px-4 py-6 min-h-[300px] w-[35%] upper-layer m-10">
            <h1 className="text-3xl flex items-center justify-center font-bold">Login to &nbsp; <span className="text-[#ad36ad] font-bold text-4xl">App</span></h1>
            <p className="flex items-center justify-center flex-col mt-3 text-gray-400">Login to Unlock all the features of app</p>
            <form action="" className="mt-10" onSubmit={onSignup}>
                {/* first input */}
            <div className="flex flex-col mt-5">
            <label htmlFor="email" className="text-white">Email</label>
            <input type="email" placeholder="aditya@gmail.com" className="w-[70%] bg-transparent border-b-[1px] mt-1 rounded-sm px-2 font-light text-white" value={user.email} onChange={(e)=>setUser({...user,email:e.target.value})} />
            </div>
            
            {/* second input */}
            <div className="flex flex-col mt-5">
            <label htmlFor="password" className="text-white">Password</label>
            <input type="password" className="w-[70%] bg-transparent border-b-[1px] mt-1 rounded-sm px-2 font-light text-white" value={user.password} onChange={(e)=>setUser({...user,password:e.target.value})} />
            </div>
            <p className="text-sm mt-5 text-gray-400 mx-3">Dont have an Account? 
             <Link href="/signup" className="mx-2 text-[#ef48ef] font-bold hover:underline">Signup</Link>

            </p>
            {/* submit button */}
            <div className="flex flex-col items-center mt-[50px]">
            {!loading && (
                <button className="bg-[purple] w-[40%] text-white px-4 py-2 rounded-lg font-semibold mr-2 " disabled={handleDisable()}>Login</button>
            )}
            {loading && (
                <button className="bg-[purple] w-[40%] text-white px-4 py-2 rounded-lg font-semibold mr-2 " disabled={true}>Logging User...</button>
            )}
            </div>
            </form>
        </div>
        <div className="m-[100px]">
        <Image src="/hello.svg" alt="logo" width={650} height={250} className="my-[50px]" loading="lazy" layout="intrinsic" />
        </div>
        
            
        </div>
    )
}