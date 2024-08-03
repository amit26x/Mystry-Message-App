import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { User } from "next-auth";

export async function POST(request: Request){
    await dbConnect()

    const session = await getServerSession(authOptions)
    const user = session?.user as User

    if(!session || !session.user){
        return Response.json(
            {
                success: false,
                message: "Not Authenticated"
            },
            { status: 500}
        )
    }
    const userId = user._id;
    const {acceptMessage} =  await request.json()

    try{

    } catch (error) {
        console.log("failed to update user status to accept messages")
        return Response.json(
            {
                success: false,
                message: "failed to update user status to accept messages"
            },
            { status: 401}
        )
    }
}


