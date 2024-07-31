import { NextAuthOptions } from "next-auth";
import { CredentialsProvider } from "next-auth/providers/credentials";
import bcrypt from "bcryptjs"
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";


export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                username: {label: "Email", type: "text"},
                password: {label: "Password", type: "password"}
            },
            async authorize(credentials: any): Promise<any>{
                await dbConnect()
                try {
                    await UserModel.findOne({
                        $or: [
                            {email: credentials.identifier},
                            {username: credentials.identifier}
                        ]
                    })
                    if (!user) {
                        throw new Error('No user found with this email')
                    }

                    if (!user.isVerified) {
                        throw new Error('Please verify your account first')

                    }
                    const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password)
                    if (isPasswordCorrect){
                        return user

                    } else{
                        throw new Error ('Incorrect Password')
                    }

                }catch (error: any) {
                    throw new Error()


                }

            }
        })
    ],
    callbacks: {
        async session({ session, token }) {
            return session
        },
        async jwt({ token, user }) {
            if(user){
                token._id = user._id?.toString()
                token.isVerified = user.isverified
            }
            return token
        },
    },


    pages: {
        signIn: '/sign-in'
    },
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET,
}