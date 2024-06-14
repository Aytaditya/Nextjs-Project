import {connect} from "@/dbConfig/dbConfig.ts";
import User from "@/app/models/userModel.js"

import { NextRequest, NextResponse} from "next/server";
import bcryptjs from "bcryptjs";

connect()

export default async function POST(request: NextRequest) {
   try {
    
   } catch (error:any) {
        return NextResponse.json({error: error.message},{status:500});
   }
~
}