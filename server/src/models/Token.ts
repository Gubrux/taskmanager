import mongoose, { Schema, Document, Types } from "mongoose";

export interface IToken extends Document {
    token: string;
    user: Types.ObjectId;
    createdAt: Date;
}

const tokenSchema: Schema = new Schema({
    token: {
        type: String,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: "10m",
    },
});

const Token = mongoose.model<IToken>("Token", tokenSchema);
export default Token;
