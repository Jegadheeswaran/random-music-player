import { PrismaClient } from "@prisma/client/extension";
import { NextRequest, NextResponse } from "next/server";
import {z} from "zod"

const YT_REGEX = new RegExp("/^https:\/\/www\.youtube\.com\/watch\?v=[\w-]{11}$/gm")

const createStreamSchema = z.object({
    creatorId: z.string(),
    url : z.string().url()
}) 

export async function POST(req : NextRequest){
    try{
        const parseResult = createStreamSchema.safeParse(await req.json())
        

        if(parseResult.success){
            const {creatorId, url} = parseResult.data

            const isYT = YT_REGEX.test(url)

            if (!isYT){
                return NextResponse.json({
                    message : "Wront URL format"
                },{
                    status : 411
                })
            }
            const extractedId = url.split("?v=")[1]
    
            await PrismaClient.stream.create({
               data : {
                userID : creatorId,
                db : url,
                upvotes : 0,
                type : "Youtube"
               }
            })
            
        }
    }
    catch(e){
        return NextResponse.json({
            message : "Error while adding a stream"
        },{
            status : 411
        })
    }
}

export async function GET(req : NextRequest){
    
}