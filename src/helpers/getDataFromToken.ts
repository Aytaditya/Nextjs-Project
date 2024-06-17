import {NextRequest,NextResponse} from 'next/server';
import jwt from 'jsonwebtoken';

// Function to get data from token
export const getDataFromToken = (request: NextRequest) => {
   try {
        const token = request.cookies.get('token')?.value || ''; //encoded token

        const decodedToken:any=jwt.verify(token, process.env.JWT_SECRET!)

        return decodedToken.id; // now our logged in user id we can access anywhere
        
    
   } catch (error) {
        console.log(error);
   }
}