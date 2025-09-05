import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Mock API for demonstration
export interface Test {
  id: string;
  name: string;
  description: string;
  mrp: number;
  offerPrice: number;
  category: string;
  image: string;
}

export interface Location {
  id: string;
  name: string;
  address: string;
  phone: string;
}

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/',
  }),
  tagTypes: ['Test', 'Location', 'Report'],
  endpoints: (builder) => ({
    // Tests endpoints
    getTests: builder.query<Test[], void>({
      query: () => 'tests',
      providesTags: ['Test'],
      // Mock data for demo
      queryFn: async () => {
        const mockTests: Test[] = [
          {
            id: '1',
            name: 'Lipid Profile Complete',
            description: 'Complete cholesterol and lipid analysis',
            mrp: 1200,
            offerPrice: 599,
            category: 'Cardiac',
            image: 'https://images.pexels.com/photos/3845810/pexels-photo-3845810.jpeg?auto=compress&cs=tinysrgb&w=400'
          },
          {
            id: '2',
            name: 'Full Body Checkup',
            description: 'Comprehensive health screening package',
            mrp: 3500,
            offerPrice: 1999,
            category: 'Preventive',
            image: 'https://images.pexels.com/photos/4021775/pexels-photo-4021775.jpeg?auto=compress&cs=tinysrgb&w=400'
          },
          {
            id: '3',
            name: 'Diabetes Profile',
            description: 'Complete diabetes monitoring tests',
            mrp: 800,
            offerPrice: 399,
            category: 'Diabetes',
            image: 'https://images.pexels.com/photos/3279196/pexels-photo-3279196.jpeg?auto=compress&cs=tinysrgb&w=400'
          }
        ];
        return { data: mockTests };
      }
    }),
    
    getPopularTests: builder.query<Test[], void>({
      query: () => 'tests/popular',
      providesTags: ['Test'],
    }),
    
    searchTests: builder.query<Test[], string>({
      query: (searchTerm) => `tests/search?q=${searchTerm}`,
      providesTags: ['Test'],
    }),

    // Location endpoints
    getLocations: builder.query<Location[], string>({
      query: (city) => `locations?city=${city}`,
      providesTags: ['Location'],
      // Mock data
      queryFn: async () => {
        const mockLocations: Location[] = [
          {
            id: '1',
            name: 'Dr Lal PathLabs - Central Delhi',
            address: 'Connaught Place, New Delhi',
            phone: '+91-11-4567-8900'
          },
          {
            id: '2', 
            name: 'Dr Lal PathLabs - South Delhi',
            address: 'Greater Kailash, New Delhi',
            phone: '+91-11-4567-8901'
          }
        ];
        return { data: mockLocations };
      }
    }),

    // Report endpoints
    downloadReport: builder.mutation<{ url: string }, string>({
      query: (reportId) => ({
        url: `reports/${reportId}/download`,
        method: 'POST',
      }),
      invalidatesTags: ['Report'],
    }),
  }),
});

export const {
  useGetTestsQuery,
  useGetPopularTestsQuery,
  useSearchTestsQuery,
  useGetLocationsQuery,
  useDownloadReportMutation,
} = api;