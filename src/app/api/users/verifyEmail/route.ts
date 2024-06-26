import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel"
import { NextRequest, NextResponse} from "next/server";


connect(); 

export async function POST(request:NextRequest){
    try {
        const reqBody=await request.json()
        const {token}=reqBody;
        console.log(token)

        const user = await User.findOne({verifyToken: token});

        console.log(user)

        if(!user){
            return NextResponse.json({error:"User not Found"},{status:400})
        }


        user.isVerified=true;
        user.verifyToken=undefined;
        user.verifyTokenExpiry=undefined;

        await user.save();

        return NextResponse.json({message:"Email Verified"},{status:200})



    } catch (error: any) {
        console.log(error)
        return NextResponse.json({error:error.message},{status:500})
        
    }
}