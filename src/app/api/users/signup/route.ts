import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel"

import { NextRequest, NextResponse} from "next/server";
import bcryptjs from "bcryptjs";

connect()

export async function POST(request: NextRequest) {
   try {

    const reqBody=await request.json();
    const {username,email,password}=reqBody;

    console.log(reqBody);

    // empty fields validation
    if(!username || !email || !password){
        return NextResponse.json({error: "Please fill all fields"},{status:400});
    }

    // check if user already exists
    const user=await User.findOne({username:username})

    if(user){
        console.log("User already exists")
        return NextResponse.json({error: "User already exists"},{status:400});
    } 

    // hashing password before saving user in database
    const salt=await bcryptjs.genSalt(10);
    const hashedPassword=await bcryptjs.hash(password,salt);

     const newUser=new User({
        username,
        email,
        password:hashedPassword
    })

    const savedUser=await newUser.save();

    return NextResponse.json({
        message: "User Created successfully",
        success: true,
        savedUser
    });
    
   } catch (error:any) {
        return NextResponse.json({error: error.message},{status:500});
   }
}