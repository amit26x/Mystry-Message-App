import mongoose, {Schema, Document} from "mongoose";


export interface Message extends Document{
    content: string;
    createAt: Date
}

const MessageSchema: Schema<Message> = new Schema({
    content: {
        type: String,
        required: true
    },
    createAt: {
        type: Date,
        required: true,
        default: Date.now
    }
})


export interface User extends Document{
    userName: string;
    email: string;
    password: string;
    verifyCode: string;
    veriyfCodeExpiry: Date;
    isVarified: boolean;
    isAcceptingMessage: boolean;
    messages: Message[]
}


const UserSchema: Schema<User> = new Schema({
    userName: {
        type: String,
        required: [true, "Username is required"],
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        match: [/.+\@.+\..+/, 'please use a valid email adress']
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    verifyCode: {
        type: String,
        required: [true, " Verify Code is required"],
    },
    veriyfCodeExpiry: {
        type: Date,
        required: [true, " Verify Code Expiry is required"],
    },
    isVarified: {
        type: Boolean,
        required: false,
    },
    isAcceptingMessage: {
        type: Boolean,
        required: true
    },
    messages: [MessageSchema]
    
})

const UserModel = (mongoose.models.User as mongoose.Model<User> ) || mongoose.model("User", UserSchema)

export default UserModel;