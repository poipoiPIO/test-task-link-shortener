import { Schema, model, Document } from 'mongoose';

interface IUser extends Document {
    login: string;
    password: string;
    date: Date;
}

const UserSchema: Schema = new Schema({
    login: {
        type: String,
        required: true,
        min: 1
    },
    password: {
        type: String,
        required: true,
        max: 1024,
        min: 6
    },
    date: {
        type: Date,
        default: Date.now()
    }
});

const User = model<IUser>('User', UserSchema);

export default User;
