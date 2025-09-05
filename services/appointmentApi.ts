// services/appointmentApi.ts
import { CreateAppointmentRequest } from '@/lib/appointment/types'
import { AuthResponse, UsersResponse, AppointmentResponse, Appointment, AppointmentQueryParams } from './types'
import baseApi from '@/redux/baseApi';

export interface CreateAppointmentResponse {
    success: boolean;
    data: {
        confirmationNumber: string;
    };
    error?: string;
}

export const appointmentApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createAppointment: builder.mutation<CreateAppointmentResponse, CreateAppointmentRequest>({
            query: (body) => ({
                url: '/appointments',
                method: 'POST',
                body,
            }),
        }),
        login: builder.mutation<AuthResponse, { email: string; password: string }>({
            query: (credentials) => ({
                url: '/auth/login',
                method: 'POST',
                body: credentials,
            }),
            invalidatesTags: ['Auth'],
        }),
        getUserDetails: builder.mutation<AuthResponse,void>({
            query:()=> '/auth/me',
        }),
        register: builder.mutation<AuthResponse, {
            email: string;
            password: string;
            firstName: string;
            lastName: string;
            role?: string;
        }>({
            query: (userData) => ({
                url: '/auth/register',
                method: 'POST',
                body: userData,
            }),
            invalidatesTags: ['Auth'],
        }),
        logout: builder.mutation<{ success: boolean }, void>({
            query: () => ({
                url: '/auth/logout',
                method: 'POST',
            }),
            invalidatesTags: ['Auth'],
        }),
        getMe: builder.query<AuthResponse, void>({
            query: () => '/auth/me',
            providesTags: ['Auth'],
        }),

        // User endpoints
        getUsers: builder.query<UsersResponse, void>({
            query: () => '/users',
            providesTags: ['User'],
        }),

        // Appointment endpoints
        getAppointments: builder.query<AppointmentResponse, void>({
            query: () => '/appointments',
            
        }),
        getAllAppointments: builder.query<AppointmentResponse, AppointmentQueryParams>({
            query: ({ page = 1, limit = 10, status, search }) => {
                const params = new URLSearchParams();
                params.set('page', page.toString());
                params.set('limit', limit.toString());
                if (status) params.set('status', status);
                if (search?.length) {
                    search.forEach((value) => params.append('search', value));
                }
                return `/appointments?${params.toString()}`;
            },
            providesTags: ['Appointment'],
        }),
        updateAppointmentStatus: builder.mutation<AppointmentResponse, {
            id: string;
            status: Appointment['status'];
        }>({
            query: ({ id, status }) => ({
                url: `/appointments/${id}`,
                method: 'PATCH',
                body: { status },
            }),
            invalidatesTags: ['Appointment'],
        }),
        getAppointmentStats: builder.query<{
            success: boolean;
            data: {
                total: number;
                scheduled: number;
                confirmed: number;
                completed: number;
                cancelled: number;
            };
        }, void>({
            query: () => '/appointments/stats',
            providesTags: ['Appointment'],
        }),
        getAppointmentsById: builder.query<{
            success: boolean;
            data: Appointment;
        }, {id:string}>({
            query: ({id}) => `/appointments/${id}`,
        }),
    }),

});

export const { useCreateAppointmentMutation } = appointmentApi;
