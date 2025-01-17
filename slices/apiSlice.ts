import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "http://192.168.0.108:3001/";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    // Payments
    createPaymentIntent: builder.mutation({
      query: (data) => ({
        url: "stripe/intent",
        method: "POST",
        body: data,
      }),
    }),
    // Appointments
    createAppointmentIntent: builder.mutation({
      query: ({ data, id }) => ({
        url: `/appointments/${id}`,
        method: "POST",
        body: data,
      }),
    }),

    // Confirm Appointment
    confirmAppointment: builder.mutation({
      query: ({ data }) => ({
        url: "/appointments",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useCreatePaymentIntentMutation,
  useCreateAppointmentIntentMutation,
  useConfirmAppointmentMutation,
} = apiSlice;
