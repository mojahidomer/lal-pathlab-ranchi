// src/api/baseApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";

const BASE_URL =  process.env.NEXT_PUBLIC_BASE_URL||"http://localhost:3000/api"; // Change this to your actual backend URL

//  type ExtendedRTKError = FetchBaseQueryError | SerializedError | CustomError;
const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL,
  prepareHeaders: (headers) => {
    headers.set("x-api-key", process.env.NEXT_PUBLIC_API_KEY!); // send API key
    return headers;
  }
 });

// Define a Custom Error Type that extends FetchBaseQueryError
export type ExtendedRTKError = FetchBaseQueryError & {
  data: {
    message: string;
    errors?: unknown;
  };
};

// Error Handling Function
const handleError = (error: FetchBaseQueryError | SerializedError): ExtendedRTKError => {
  if ("status" in error && "data" in error) {
    return {
      status: error.status as number,
      data: {
        message: "Validation failed",
        errors: (error as { message?: unknown }).message ?? "Unknown error",
      },
    };
  }


  return {
    status: 500,
    data: {
      message: "An unknown error occurred",
      errors: error,
    },
  };
};

const baseQueryWithErrorHandling: typeof baseQuery = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result.error) {
    result.error = handleError(result.error); // Ensure compatibility
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  tagTypes: ["labcare",'Auth', 'User', 'Appointment','LabTest'],
  baseQuery: baseQueryWithErrorHandling, //fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: () => ({}), // Empty, will be extended in other files

});

export default baseApi;