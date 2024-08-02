import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { z } from "zod";
import { usernameValidation } from "@/schemas/signUpSchema";


const UsernamequerySchema = z.object({
    username: usernameValidation
})

export async function GET(request: Request) {
    
    await dbConnect()
    

    try{
        const {searchParams} = new URL(request.url)
        const queryParam = {
            username: searchParams.get('username')
        }
        //Validation with Zod
        const result = UsernamequerySchema.safeParse(queryParam)
        console.log(result) //TODO: remove
        if(!result.success) {
            const usernameErrors = result.error.format().
            username?._errors || []
            return Response.json ({
                success: false,
                message: usernameErrors?.length > 0? usernameErrors.join(','): 'Invalid query parameters',
            }, {status: 500})
        }

        const {username} = result.data

        const existingVerifiedUser = await UserModel.findOne({ username, isVarified: true})

        if (existingVerifiedUser) {
            return Response.json ({
                success: false,
                message: 'Username is already taken',
            }, {status: 500})
        }

        return Response.json ({
            success: true,
            message: 'Username is already unique',
        }, {status: 500}) 



    } catch (error) {
        console.error("Error checking username" , error)
        return Response.json(
            {
                success: false,
                message: "Error checking username"
            },
            { status : 500}
        )
    }
}