import mongoose, { Schema } from 'mongoose';
import { ICertificate } from './certificate.interface';

const CertificateSchema = new Schema<ICertificate>(
  {
    title: { type: String, required: true },
    issuer: { type: String },
    imageUrl: { type: String },
    skills: [{ type: Schema.Types.ObjectId, ref: 'Skill' }],
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

export const Certificate = mongoose.model<ICertificate>(
  'Certificate',
  CertificateSchema,
);
