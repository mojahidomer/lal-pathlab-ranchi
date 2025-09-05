// services/appointmentApi.ts

import baseApi from '@/redux/baseApi';

export type LabTestResponse = {
    id:string
    testId: string;
    name: string;
    description: string;
    price: number;
    discount?: number; // new field
    fastingRequired: boolean;
    duration: string;
    includedTests?: string[]; // References to other LabTests
    isGroupedTest: boolean;
    sampleType?: 'blood' | 'urine' | 'saliva' | 'swab';
    category?: string;
    instructions?: string;
    reportAvailability?: string;
    isActive?: boolean;
    isDeleted?: boolean;
  }

export const labTestApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({


        // Lab Tests endpoints
        getLabTests: builder.query<{
            success: boolean;
            data: LabTestResponse[];
        }, { search?: string; fastingRequired?: boolean; minPrice?: number; maxPrice?: number } | void>({
            query: (params = {}) => {
                const searchParams = new URLSearchParams();
                if (params?.search) searchParams.append('search', params.search);
                if (params?.fastingRequired !== undefined) searchParams.append('fastingRequired', params.fastingRequired.toString());
                if (params?.minPrice) searchParams.append('minPrice', params.minPrice.toString());
                if (params?.maxPrice) searchParams.append('maxPrice', params.maxPrice.toString());

                return `/lab-tests?${searchParams.toString()}`;
            },
            providesTags: ['LabTest'],
        }),
        createLabTest: builder.mutation<{ success: boolean; data: any }, any>({
            query: (labTestData) => ({
                url: '/lab-tests',
                method: 'POST',
                body: labTestData,
            }),
            invalidatesTags: ['LabTest'],
        }),
        updateLabTest: builder.mutation<{ success: boolean; data: any }, { id: string; data: any }>({
            query: ({ id, data }) => ({
                url: `/lab-tests/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['LabTest'],
        }),
        deleteLabTest: builder.mutation<{ success: boolean }, string>({
            query: (id) => ({
                url: `/lab-tests/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['LabTest'],
        }),


    }),

});

export const { useGetLabTestsQuery,
    useCreateLabTestMutation,
    useUpdateLabTestMutation,
    useDeleteLabTestMutation, } = labTestApi;
