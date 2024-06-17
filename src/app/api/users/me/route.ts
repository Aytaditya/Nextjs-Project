import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import {connect} from "@/dbConfig/dbConfig";


connect();

export async function GET(request:NextRequest){
    try {

      const userId=await getDataFromToken(request);
      const user=await User.findById(userId).select('-password');

      // CAN BE DONE LIKE THIS WITHOUT SELECT

    //     const userInfo={
    //         username: user.username,
    //         email: user.email,
    //     }

    //   return NextResponse.json({userInfo},{status:200})

        return NextResponse.json({user},{status:200})
        
    } catch (error:any) {
        console.log(error.message)
        return NextResponse.json({error: error.message},{status:500});
    }
}