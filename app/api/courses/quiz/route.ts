import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export async function POST(req: Request){
    try{
        const body = await req.json()
        const data = body.data

        const question = await db.quizAndOptions.create({
            data: {
                quizzQuestion: data.quizzQuestion,
                option1: await data.option1,
                option2: await data.option2,
                option3: await data.option3,
                option4: await data.option4,
                correctOption: await data.correctOption,
                chapterId: await data.chapterId,
                courseId: await data.courseId
            }
        })

        return NextResponse.json(question, {status: 201})

    }catch(error){
        console.log("Error form quiz: ", error)
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function GET(req: Request){
    try{
        const { searchParams } = new URL(req.url);
        const chapterId = searchParams.get("chapterId");

        const response = await db.quizAndOptions.findMany({
            where: {
                chapterId: chapterId!
            }
        })

        return NextResponse.json({data:response}, {status: 200})
    }catch(error){
        console.log("Error from the quiz: ", error)
        return NextResponse.json({message: "Error"}, {status: 500})
    }
}