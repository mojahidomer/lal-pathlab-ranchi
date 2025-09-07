import mongoose, { Schema } from 'mongoose';

export interface IBloodTest {
  id: string;
  name: string;
  description: string;
  price: number;
  fastingRequired: boolean;
  duration: string;
  discount?: number; // New field for discount percentage
}

export interface IUserDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  address: string;
  emergencyContact: string;
  medicalHistory: string;
}

export interface IAppointmentDetails {
  date: string;
  time: string;
  location: string;
  specialInstructions: string;
}

export interface IAppointment  {
  _id?: string;
  confirmationNumber: string;
  status: 'scheduled' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled' | 'no-show';
  userDetails: IUserDetails;
  selectedTests: IBloodTest[];
  appointmentDetails: IAppointmentDetails;
  totalCost: number;
  estimatedDuration: string;
  fastingRequired: boolean;
  notes?: string;
  assignedStaff?: string;
  createdAt: Date;
  updatedAt: Date;
}

const BloodTestSchema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  fastingRequired: { type: Boolean, default: false },
  duration: { type: String, required: true },
  discount:{ type: Number, default: 0, min: 0, max: 100}
}, { _id: false });

const UserDetailsSchema = new Schema({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  email: { type: String, required: true, lowercase: true, trim: true },
  phone: { type: String, required: true, trim: true },
  dateOfBirth: { type: String, required: true },
  gender: { type: String, required: true, enum: ['male', 'female', 'other', 'prefer-not-to-say'] },
  address: { type: String, required: true, trim: true },
  emergencyContact: { type: String, required: true, trim: true },
  medicalHistory: { type: String, trim: true }
}, { _id: false });

const AppointmentDetailsSchema = new Schema({
  date: { type: String, required: true },
  time: { type: String, required: true },
  location: { type: String, required: true, enum: ['downtown', 'westside', 'northpoint', 'southbay'] },
  specialInstructions: { type: String, trim: true }
}, { _id: false });

const AppointmentSchema = new Schema({
  confirmationNumber: {
    type: String,
    required: true,
    unique: true,
    uppercase: true
  },
  status: {
    type: String,
    enum: ['scheduled', 'confirmed', 'in-progress', 'completed', 'cancelled', 'no-show'],
    default: 'scheduled',
    required: true
  },
  userDetails: {
    type: UserDetailsSchema,
    required: true
  },
  selectedTests: {
    type: [BloodTestSchema],
    required: true,
    validate: {
      validator: function(tests: IBloodTest[]) {
        return tests.length > 0;
      },
      message: 'At least one test must be selected'
    }
  },
  appointmentDetails: {
    type: AppointmentDetailsSchema,
    required: true
  },
  totalCost: {
    type: Number,
    required: true,
    min: 0
  },
  estimatedDuration: {
    type: String,
    required: true
  },
  fastingRequired: {
    type: Boolean,
    default: false
  },
  notes: {
    type: String,
    trim: true
  },
  assignedStaff: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

AppointmentSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (_, ret: any) => {
    ret.id = ret._id; // just add id
    // don't delete _id
  }
});

// Indexes for better query performance
// AppointmentSchema.index({ confirmationNumber: 1 });
AppointmentSchema.index({ status: 1 });
AppointmentSchema.index({ 'appointmentDetails.date': 1 });
AppointmentSchema.index({ 'userDetails.email': 1 });
AppointmentSchema.index({ createdAt: -1 });

// Pre-save middleware to generate confirmation number
AppointmentSchema.pre('save', function(next) {
  if (!this.confirmationNumber) {
    this.confirmationNumber = `LAB${Date.now().toString().slice(-6)}`;
  }
  next();
});

export default mongoose.models.Appointment || mongoose.model<IAppointment>('Appointment', AppointmentSchema);