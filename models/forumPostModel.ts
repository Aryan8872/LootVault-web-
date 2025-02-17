import mongoose, { Schema, Document, Types } from "mongoose";


interface IComment extends Document {
    _id: Types.ObjectId;
    user: Types.ObjectId;
    content: string;
    createdAt: Date;
    updatedAt: Date;
}

interface IPost extends Document {
    user: Types.ObjectId;
    title: string;
    content: string;
    likes: Types.ObjectId[];
    dislikes: Types.ObjectId[];
    comments: IComment[];
    createdAt: Date;
    updatedAt: Date;
}

const commentSchema: Schema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const postSchema: Schema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    dislikes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    comments: [commentSchema],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const PostModel: mongoose.Model<IPost> = mongoose.model<IPost>("Post", postSchema);

export { PostModel, IPost, IComment };