import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export async function POST(req: Request){
    try{
        const body = await req.json()
        const data = body.data

        const verify = await db.certificate.findFirst({
            where: {
                userId: await data.userId,
                courseId: await data.courseId
            }
        })

        if (!verify){

            const certificate = await db.certificate.create({
                data: {
                    userId: await data.userId,
                    courseId: await data.courseId
                }
            })
            return NextResponse.json(certificate, {status: 201})
        }else{
            return NextResponse.json({message: "Already have the certificate", verify}, {status: 400})
        }

    }catch(error){
        console.log("Error form quiz: ", error)
        return new NextResponse("Internal Error", { status: 500 });
    }
}