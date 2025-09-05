import { LabTestResponse } from "@/services/labTestApi";
export type AppointmentStatus =
  | 'scheduled'
  | 'confirmed'
  | 'in-progress'
  | 'completed'
  | 'cancelled'
  | 'no-show'
  | undefined;

  export const APPOINTMENT_STATUSES = {
    scheduled: 'success',
    confirmed: 'info',  
    'in-progress': 'warning',
    completed: 'success',
    cancelled: 'error',
    'no-show': 'error', 

  } as const


export interface Appointment {
  id: string;
  confirmationNumber: string;
  status: AppointmentStatus;
  createdAt: string;
  updatedAt: string;
  
  // User Details
  userDetails: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dateOfBirth: string;
    gender: string;
    address: string;
    emergencyContact: string;
    medicalHistory?: string;
  };
  
  // Selected Tests
  selectedTests: {
    id: string;
    name: string;
    description: string;
    price: number;
    fastingRequired: boolean;
    duration: string;
  }[];
  
  // Appointment Details
  appointmentDetails: {
    date: string;
    time: string;
    location: string;
    specialInstructions: string;
  };
  
  // Additional fields
  totalCost: number;
  estimatedDuration: string;
  fastingRequired: boolean;
}

export interface CreateAppointmentRequest {
  userDetails: Appointment['userDetails'];
  selectedTests: LabTestResponse[];
  appointmentDetails: Appointment['appointmentDetails'];
}

export interface UpdateAppointmentStatusRequest {
  id: string;
  status: Appointment['status'];
  notes?: string;
}


export type UserDetails = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  address: string;
  emergencyContact: string;
  medicalHistory?: string;
};

export type BloodTest = {
  id: string;
  name: string;
  description: string;
  price: number;
  fastingRequired: boolean;
  duration: string;
};

export type AppointmentDetails = {
  date: string;
  time: string;
  location: string;
  specialInstructions: string;
};

export type BookingData = {
  userDetails: UserDetails;
  selectedTests: LabTestResponse[];
  appointmentDetails: AppointmentDetails;
};

