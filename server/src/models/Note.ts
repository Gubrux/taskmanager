import mongoose, { Schema, Document, Types } from "mongoose";

export interface INote extends Document {
    content: string;
    createdBy: Types.ObjectId;
    task: Types.ObjectId;
}

const NoteSchema: Schema = new Schema(
    {
        content: {
            type: String,
            required: true,
        },
        createdBy: {
            type: Schema.ObjectId,
            ref: "User",
            required: true,
        },
        task: {
            type: Types.ObjectId,
            ref: "Task",
            required: true,
        },
    },
    { timestamps: true }
);

const Note = mongoose.model<INote>("Note", NoteSchema);
export default Note;
