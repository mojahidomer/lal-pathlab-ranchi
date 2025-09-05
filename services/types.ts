
import { AppointmentStatus } from "@/lib/appointment/types";

export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: 'admin' | 'staff' | 'patient';
    isActive: boolean;
    createdAt: string;
    lastLogin?: string;
    phone?: string;
  }
  
  export interface Appointment {
    id: string;
    confirmationNumber: string;
    status: AppointmentStatus
    createdAt: string;
    updatedAt: string;
    userDetails: {
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
      dateOfBirth: string;
      gender: string;
      address: string;
      emergencyContact: string;
      medicalHistory: string;
    };
    selectedTests: {
      id: string;
      name: string;
      description: string;
      price: number;
      fastingRequired: boolean;
      duration: string;
    }[];
    appointmentDetails: {
      date: string;
      time: string;
      location: string;
      specialInstructions: string;
    };
    totalCost: number;
    estimatedDuration: string;
    fastingRequired: boolean;
  }
  
  export interface AuthResponse {
    success: boolean;
    data?: {
      user: User;
    };
    error?: string;
  }
  
  export interface AppointmentResponse {
    success: boolean;
    data: Appointment[];
    error?: string;
  }
  
  export interface UsersResponse {
    success: boolean;
    data?: User[];
    error?: string;
  }

  export interface AppointmentQueryParams {
    page?: number;
    limit?: number;
    status?: AppointmentStatus
    search?: string[]; // e.g., ['john', 'scheduled', 'abc@gmail.com']
  }
  