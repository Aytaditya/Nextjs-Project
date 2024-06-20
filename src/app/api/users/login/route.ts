import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel"
import { NextRequest, NextResponse} from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";


connect()

export async function POST(request:NextRequest){
    try {
        const reqBody=await request.json();
        const {email,password}=reqBody;
        console.log(reqBody)

        // empty fields validation
        if(!email || !password){
            return NextResponse.json({error: "Please fill all fields"},{status:400});
        }

        // check if user already exists
        const user= await User.findOne({email:email})
        if(!user){
            return NextResponse.json({error: "User does not exist"},{status:400});

        }

        // compare password
        const validPassword=await bcryptjs.compare(password,user.password)
        if(!validPassword){
            return NextResponse.json({error: "Invalid password"},{status:400});
        }

        // cookie setup 
        const tokenData={
            id: user._id,
            username: user.username,
            email: user.email,

        }
        // it is a synchronous function
        const token=jwt.sign(tokenData,process.env.JWT_SECRET!,{expiresIn: "1d"});

        const response=NextResponse.json({
            message: "Login successful",
            success: true,
        })

        response.cookies.set("token",token,{
            httpOnly: true,
        })

        return response; //returning the response with cookie
        

        
    } catch (error:any) {
        console.log(error)
        return NextResponse.json({error: error.message},{status:500});
    }
} 