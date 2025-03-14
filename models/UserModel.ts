import mongoose, { Schema, Document } from "mongoose";

interface IUser extends Document {
    fullName: string;
    email: string;
    username: string;
    phoneNo: string;
    password: string;
    image?: string; 
    role: "buyer" | "seller" | "admin";
    posts: mongoose.Types.ObjectId[];
    comments: mongoose.Types.ObjectId[];
}

const userSchema: Schema = new Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    phoneNo: { type: String, required: true },
    password: { type: String, required: true },
    image: { type: String, required: false },
    role: { type: String, enum: ["buyer", "seller", "admin"], default: "buyer" },
    posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
});

const userModel: mongoose.Model<IUser> = mongoose.model<IUser>("User", userSchema);

export { userModel, IUser };