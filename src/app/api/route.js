import { headers } from "next/headers";

export async function GET() {
    const res = await fetch('https://api.vercel.app/blog');
    const data = await res.json()
    // const data = {
    //     name: 'Abraham Esparza',
    //     message: 'Congrats on your first Next.js API'
    // };
    
    console.log(data)

    return Response.json(data)

}