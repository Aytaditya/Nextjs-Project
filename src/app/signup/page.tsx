"use client"

import {useState} from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import  axios  from "axios"
import Image from "next/image"



export default function SignupPage() {
    const router = useRouter();
    const [user,setUser] = useState({
        email: "",
        password: "",
        username: ""
    })
    const [loading,setLoading]=useState(false)

    const onSignup=async(e:any)=>{
       try {
        e.preventDefault();
        console.log(user)
        setLoading(true)
        const response=await axios.post("/api/users/signup",user)
        console.log(response.data)     //response.data is logged instead of response because response.data contains the actual data returned from the server, while response includes additional metadata about the HTTP response.

        //clearing the loading state
        setLoading(false)

        //clearing the input fields
        setUser({
            email: "",
            password: "",
            username: ""
        })

        //redirect to home page
        router.push("/")
        
        
       } catch (error:any) {
              alert(error.message)
              console.log(error.message)
       }
       finally{
           setLoading(false)
       }
    }
    return (
        <div className="flex flex-row bg-custom h-screen ">
            <div className="flex flex-col  px-4 py-6 min-h-[500px] w-[35%] upper-layer m-10">
            <h1 className="text-3xl flex items-center justify-center font-bold">SignUp to &nbsp; <span className="text-[#ad36ad] font-bold text-4xl">App</span></h1>
            <form action="" className="mt-5" onSubmit={onSignup}>
                {/* first input */}
            <div className="flex flex-col mt-5">
            <label htmlFor="username" className="text-white">Username</label>
            <input type="text" placeholder="aytaditya" className="w-[70%] bg-transparent border-b-[1px] mt-1 rounded-sm px-2 font-light text-white" value={user.username} onChange={(e)=>setUser({...user,username:e.target.value})} />
            </div>
            {/* second input */}
            <div className="flex flex-col mt-5">
            <label htmlFor="email" className="text-white">Email</label>
            <input type="email" placeholder="aditya@gmail.com" className="w-[70%] bg-transparent border-b-[1px] mt-1 rounded-sm px-2 font-light text-white" value={user.email} onChange={(e)=>setUser({...user,email:e.target.value})} />
            </div>
            {/* third input */}
            <div className="flex flex-col mt-5">
            <label htmlFor="password" className="text-white">Password</label>
            <input type="password" className="w-[70%] bg-transparent border-b-[1px] mt-1 rounded-sm px-2 font-light text-white" value={user.password} onChange={(e)=>setUser({...user,password:e.target.value})} />
            </div>
            <p className="text-sm mt-5 text-gray-400 mx-3">Already have an Account? 
             <Link href="/login" className="mx-2 text-[#ef48ef] font-bold hover:underline">Login</Link>

            </p>
            {/* submit button */}
            <div className="flex flex-col items-center mt-[120px]">
            {!loading && (
                <button className="bg-[purple] w-[40%] text-white px-4 py-2 rounded-lg font-semibold mr-2 hover:bg-[#501b50]">SignUp</button>
            )}
            {loading &&(
                <button className="bg-[purple] w-[40%] text-white px-4 py-2 rounded-lg font-semibold mr-2 hover:bg-[#501b50]" disabled={true}>Signing In...</button>
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