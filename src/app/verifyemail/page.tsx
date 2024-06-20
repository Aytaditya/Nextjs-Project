/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import axios from "axios"
import Link from "next/link"
import {useState,useEffect} from "react"


export default function VerifyEmail() {

    const [token,setToken]=useState('')
    const [verified,setVerified]=useState(false)
    const [error,setError]=useState(false)

    const verifyEmail=async()=>{

        try {

            const response=await axios.post('/api/users/verifyEmail',{token})
            console.log(response.data)

            setVerified(true)
            
        } catch (error:any) {
            console.log(error.message)
            
        }
    }

    useEffect(()=>{
        const urlToken=window.location.search.split('=')[1]
        setToken(urlToken || "")
    },[])

    useEffect(()=>{
            if(token.length>0){
                verifyEmail()
            }
    },[token])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">

            <h1 className="text-4xl ">Verify Email</h1>
            <h2 className="p-2 bg-orange-400 text-2xl ">{token ? `${token}` : "No token"}</h2>

            {verified && (
                <>
                <h1 className="text-2xl text-green-500">
                Email Verified Successfully
                </h1>
                <Link href="/login" className="text-blue-300">Login</Link>
                </>
            )}
          
        </div>
    )
}