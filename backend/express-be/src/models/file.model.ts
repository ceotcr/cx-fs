import mongoose, { Document, Schema } from 'mongoose';

export interface IFile extends Document {
    filename: string;
    path: string;
    status: 'pending' | 'scanning' | 'scanned';
    uploadedAt: Date;
    scannedAt: Date | null;
    result: string | null;
}

const FileSchema: Schema = new Schema({
    filename: { type: String, required: true },
    path: { type: String, required: true },
    status: {
        type: String,
        required: true,
        enum: ['pending', 'scanning', 'scanned'],
        default: 'pending'
    },
    uploadedAt: { type: Date, default: Date.now },
    scannedAt: { type: Date, default: null },
    result: { type: String, enum: ['clean', 'infected'], default: null }
});

export default mongoose.model<IFile>('File', FileSchema);