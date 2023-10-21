import { Schema, model, Document, ObjectId } from 'mongoose';

interface IUserHistoryItem extends Document {
    shortLinkKey: string;
    originalURI: string;
    userId: ObjectId;
}

const UserHistoryItemSchema: Schema = new Schema({
    shortLinkKey: {
        type: String,
        required: true
    },
    originalURI: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: true
    }
});

const UserHistoryItem = model<IUserHistoryItem>('UserHistoryItem', UserHistoryItemSchema);

export default UserHistoryItem;
