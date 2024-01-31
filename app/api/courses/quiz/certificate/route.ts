import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export async function POST(req: Request){
    try{
        const body = await req.json()
        const data = body.data

        console.log(data, 'from the certificate api route')

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
            console.log(certificate, 'from the certificate api route')

            return NextResponse.json(certificate, {status: 201})
        }else{
            return NextResponse.json({message: 'Already have the certificate', verify}, {status: 400})
        }

    }catch(error){
        console.log("Error form quiz: ", error)
        return new NextResponse("Internal Error", { status: 500 });
    }
}