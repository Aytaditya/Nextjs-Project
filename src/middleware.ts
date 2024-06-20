import { NextRequest,NextResponse } from "next/server";

// there are 2 parts to middleware

// first part is the login part of middleware
export async function middleware(request:NextRequest){
    // checking on which path user is
    const path=request.nextUrl.pathname; // this will give the path of the url
    const isPublicPath= path==="/login" || path==="/signup" || path==="/verifyemail";

    const token=request.cookies.get("token")?.value || ''; // If the value before ?. is null or undefined, it returns undefined instead of throwing an error.

    if(isPublicPath && token){
        return NextResponse.redirect(new URL("/profile",request.nextUrl))
    }

    if(!token && !isPublicPath){
        return NextResponse.redirect(new URL("/login",request.nextUrl))

    }

}

// second part is the matching part 

export const config={
    matcher:[
        '/',
        '/profile',
        '/login',
        '/signup',
        '/verifyemail'
    ]
}