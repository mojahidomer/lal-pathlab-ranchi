import { NextRequest } from 'next/server';
import { Appointment, CreateAppointmentRequest } from './types';
import Appointments from '@/dbModels/appointments/appointments';
import connectDB from '@/dbConfig/db';
import { MyTokenPayload } from '../auth';

// In-memory storage (in production, this would be a database)
let appointments: Appointment[] = [
    {
        id: '1',
        confirmationNumber: 'LAB001234',
        status: 'scheduled',
        createdAt: '2025-01-27T10:00:00Z',
        updatedAt: '2025-01-27T10:00:00Z',
        userDetails: {
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@email.com',
            phone: '(555) 123-4567',
            dateOfBirth: '1985-06-15',
            gender: 'male',
            address: '123 Main St, Anytown, ST 12345',
            emergencyContact: 'Jane Doe - (555) 987-6543',
            medicalHistory: 'No significant medical history'
        },
        selectedTests: [
            {
                id: 'cbc',
                name: 'Complete Blood Count (CBC)',
                description: 'Measures different components and features of blood',
                price: 45,
                fastingRequired: false,
                duration: '15 minutes'
            },
            {
                id: 'lipid',
                name: 'Lipid Profile',
                description: 'Measures cholesterol levels and triglycerides',
                price: 65,
                fastingRequired: true,
                duration: '10 minutes'
            }
        ],
        appointmentDetails: {
            date: '2025-01-30',
            time: '9:00 AM',
            location: 'downtown',
            specialInstructions: 'Please arrive 10 minutes early'
        },
        totalCost: 110,
        estimatedDuration: '25 minutes',
        fastingRequired: true
    },
    {
        id: '2',
        confirmationNumber: 'LAB001235',
        status: 'confirmed',
        createdAt: '2025-01-26T14:30:00Z',
        updatedAt: '2025-01-27T09:15:00Z',
        userDetails: {
            firstName: 'Sarah',
            lastName: 'Johnson',
            email: 'sarah.johnson@email.com',
            phone: '(555) 234-5678',
            dateOfBirth: '1990-03-22',
            gender: 'female',
            address: '456 Oak Ave, Somewhere, ST 67890',
            emergencyContact: 'Mike Johnson - (555) 876-5432',
            medicalHistory: 'Allergic to latex'
        },
        selectedTests: [
            {
                id: 'thyroid',
                name: 'Thyroid Function Test (TSH, T3, T4)',
                description: 'Evaluates thyroid gland function and hormone levels',
                price: 85,
                fastingRequired: false,
                duration: '15 minutes'
            }
        ],
        appointmentDetails: {
            date: '2025-01-29',
            time: '2:30 PM',
            location: 'westside',
            specialInstructions: ''
        },
        totalCost: 85,
        estimatedDuration: '15 minutes',
        fastingRequired: false
    },
    {
        id: '3',
        confirmationNumber: 'LAB001236',
        status: 'completed',
        createdAt: '2025-01-25T11:20:00Z',
        updatedAt: '2025-01-26T16:45:00Z',
        userDetails: {
            firstName: 'Michael',
            lastName: 'Chen',
            email: 'michael.chen@email.com',
            phone: '(555) 345-6789',
            dateOfBirth: '1978-11-08',
            gender: 'male',
            address: '789 Pine Rd, Elsewhere, ST 13579',
            emergencyContact: 'Lisa Chen - (555) 765-4321',
            medicalHistory: 'Diabetes Type 2, taking Metformin'
        },
        selectedTests: [
            {
                id: 'glucose',
                name: 'Fasting Blood Glucose',
                description: 'Measures blood sugar levels to screen for diabetes',
                price: 25,
                fastingRequired: true,
                duration: '5 minutes'
            },
            {
                id: 'hba1c',
                name: 'HbA1c (Glycated Hemoglobin)',
                description: 'Provides average blood sugar levels over the past 2-3 months',
                price: 55,
                fastingRequired: false,
                duration: '10 minutes'
            }
        ],
        appointmentDetails: {
            date: '2025-01-26',
            time: '8:00 AM',
            location: 'northpoint',
            specialInstructions: 'Diabetic patient - handle with care'
        },
        totalCost: 80,
        estimatedDuration: '15 minutes',
        fastingRequired: true
    }
];

export interface GetAllDocumentsResponse {
    data: Appointment[];
    total: number;
    page: number;
    limit: number;
}

type MongoAppointment = Omit<Appointment, 'id'> & { _id: any };

export const getAllDocumentsList = async (request: NextRequest): Promise<GetAllDocumentsResponse> => {
    await connectDB();
    const { searchParams } = new URL(request.url);

    const status = searchParams.get('status');
    const from = searchParams.get('from');
    const to = searchParams.get('to');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.getAll('search'); // <- get multiple values

    const filter: any = {};

    if (status) {
        filter.status = status;
    }

    if (search.length > 0) {
        const searchRegexes = search.map(term => ({
            $or: [
                { confirmationNumber: { $regex: term, $options: 'i' } },
                { 'userDetails.firstName': { $regex: term, $options: 'i' } },
                { 'userDetails.lastName': { $regex: term, $options: 'i' } },
                { 'userDetails.email': { $regex: term, $options: 'i' } },
            ],
        }));
        filter.$and = searchRegexes; // all terms must match one of the fields
    }

    if (from || to) {
        filter.createdAt = {};
        if (from) filter.createdAt.$gte = new Date(from);
        if (to) filter.createdAt.$lte = new Date(to);
    }

    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
        Appointments.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean<MongoAppointment[]>(),
        Appointments.countDocuments(filter),
    ]);

    const appointmentsWithId: Appointment[] = data.map(doc => ({
        ...doc,
        id: doc._id.toString(),
    }));

    return {
        data: appointmentsWithId,
        total,
        page,
        limit
    }
}


export async function getAllAppointments(): Promise<Appointment[]> {

    await connectDB();
    const fiveDaysAgo = new Date();
    fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 5);

    const recentAppointments = (await Appointments.find({
        createdAt: { $gte: fiveDaysAgo }
    }).sort({ createdAt: -1 }));
    const appointmentsWithId = await recentAppointments.map(doc => {
        const jsonDoc = doc.toJSON();
        return {
            ...jsonDoc,
            id: jsonDoc._id, // add `id` manually
        };
    });
    return appointmentsWithId
}

export async function getAppointmentById(id: string): Promise<Appointment | null> {
    await connectDB();
    return await Appointments.findOne({ _id: id })
}

export async function createAppointment(data: CreateAppointmentRequest): Promise<Appointment> {

    await connectDB();
    const totalCost = data.selectedTests.reduce((sum, test) => sum + test.price, 0);
    const totalMinutes = data.selectedTests.reduce((sum, test) => sum + parseInt(test.duration.split(' ')[0]), 0);
    const fastingRequired = data.selectedTests.some(test => test.fastingRequired);

    const newAppointment: Appointment = {
        id: (appointments.length + 1).toString(),
        confirmationNumber: `LAB${Date.now().toString().slice(-6)}`,
        status: 'scheduled',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        userDetails: data.userDetails,
        selectedTests: data.selectedTests,
        appointmentDetails: data.appointmentDetails,
        totalCost,
        estimatedDuration: `${totalMinutes} minutes`,
        fastingRequired
    };

    // appointments.push(newAppointment);
    const AppointmentItem = new Appointments(newAppointment);
    const createdAppointment = await AppointmentItem.save();
    return { ...newAppointment, id: createdAppointment._id.toString() }; // return the created appointment with MongoDB ID}
}

export async function updateAppointmentStatus(id: string, status: Appointment['status'], user: MyTokenPayload): Promise<Appointment | null> {

    await connectDB();
    const updatedData = {
        status,
        notes: `Updated by ${user.userId}.`,
        assignedStaff: user.userId ?? '' // ObjectId of the staff
    };

    const updatedAppointment = await Appointments.findByIdAndUpdate(
        id,
        { $set: updatedData },
        { new: true } // return the updated document
    );
    return updatedAppointment ? updatedAppointment.toObject() : null;
}

export async function getAppointmentStats() {
    await connectDB();
    const allAppointments = await Appointments.find();
    const total = allAppointments.length;
    const scheduled = allAppointments.filter(apt => apt.status === 'scheduled').length;
    const confirmed = allAppointments.filter(apt => apt.status === 'confirmed').length;
    const completed = allAppointments.filter(apt => apt.status === 'completed').length;
    const cancelled = allAppointments.filter(apt => apt.status === 'cancelled').length;

    return { total, scheduled, confirmed, completed, cancelled };
}