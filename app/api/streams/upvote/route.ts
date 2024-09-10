import { PrismaClient } from "@prisma/client/extension";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import {z} from 'zod'

const upvoteSchema = z.object({
    streamId : z.string()

})

export async function POST (req : NextRequest){
    const session = await getServerSession()
    //To do replace with id instead of email
    const user = await PrismaClient.user.findFirst({
        where : {
            email : session?.user?.email ?? ""
        }
    })
    if (!user){
        return NextResponse.json({
            message : "Unauthenticated"
        }, {
            status : 403
        })
    }
    try {
        const parseResult = upvoteSchema.safeParse(req.json())

        await PrismaClient.upvotes.create({
            data : {
                userId : user.id,
                streamId : parseResult.data?.streamId
            }
        })

    } 
    catch(e){
        return NextResponse.json({
            message: "Error while upvoting"
        },{
            status : 403
        })
    }

}