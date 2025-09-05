
import baseApi from '@/redux/baseApi';

import { ContactFormData } from '@/components/ContactDialog';


export const landingPageAPI = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        sendQuery: builder.mutation<{ success: boolean; data: any }, ContactFormData>({
            query: (formData) => ({
                url: '/whatsapp',
                method: 'POST',
                body: formData,
            })
        }),

    })
});