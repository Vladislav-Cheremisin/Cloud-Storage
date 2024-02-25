import { model, Schema, Types } from "mongoose"

type fileData = {
    type: Types.ObjectId,
    ref: 'file',
}

export interface IUser {
    email: string,
    password: string,
    diskSpace: number,
    usedSpace: number,
    avatar: string,
    files: fileData[],
}

const User = new Schema<IUser>({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    diskSpace: { type: Number, default: (1024 ** 3 * 10) },
    usedSpace: { type: Number, default: 0 },
    avatar: { type: String },
    files: [{ type: Schema.Types.ObjectId, ref: 'file' }]
})

export default model<IUser>('User', User);