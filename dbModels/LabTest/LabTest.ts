import mongoose, { Schema, Document, Types, models } from 'mongoose';

export interface ILabTest extends Document {
  testId: string;
  name: string;
  description: string;
  price: number;
  discount?: number; // new field
  fastingRequired: boolean;
  duration: string;
  includedTests?: Types.ObjectId[]; // References to other LabTests
  isGroupedTest: boolean;
  sampleType?: 'blood' | 'urine' | 'saliva' | 'swab';
  category?: string;
  instructions?: string;
  reportAvailability?: string;
  isActive?: boolean;
  isDeleted?: boolean;
  createdBy?: Types.ObjectId;
  updatedBy?: Types.ObjectId;
  testUses?: string; // Default value for TestUses
  method?: string; // Default value for method
}

const LabTestSchema: Schema = new Schema({
  testId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  discount: { type: Number, default: 0 }, // percentage discount
  fastingRequired: { type: Boolean, required: true },
  duration: { type: String, required: true },
  includedTests: [{ type: Schema.Types.ObjectId, ref: 'LabTest' }],
  isGroupedTest: { type: Boolean, default: false },
  sampleType: { type: String, enum: ['blood', 'urine', 'saliva', 'swab'], default: 'blood' },
  category: { type: String },
  instructions: { type: String },
  reportAvailability: { type: String },
  isActive: { type: Boolean, default: true },
  isDeleted: { type: Boolean, default: false },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  updatedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  testUses: { type: String, default: 'Lab Test' }, // Default value for TestUses,
  method: { type: String, default: 'Lab Test'}
}, { timestamps: true });

// Optional indexes
LabTestSchema.index({ name: 1 });
// LabTestSchema.index({ testId: 1 }, { unique: true });

const LabTest = models.LabTest || mongoose.model<ILabTest>('LabTest', LabTestSchema);

export default LabTest;