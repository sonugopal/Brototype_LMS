import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET(req: Request){
    try{
       
        const { searchParams } = new URL(req.url);
        const courseId = searchParams.get("courseId");

        const response = await db.quizAndOptions.findMany({
            where: {
                courseId: courseId!
            }
        })

        return NextResponse.json({data:response}, {status: 200})
    }catch(error){
        console.log("Error from the quiz: ", error)
        return NextResponse.json({message: "Error"}, {status: 500})
    }
}