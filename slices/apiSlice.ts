import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "http://192.168.1.102:3001/";

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
        url: "/appointments/confirm",
        method: "POST",
        body: data,
      }),
    }),

    // Get Popular Products
    getPopularProducts: builder.query({
      query: ({ tag, limit }) => ({
        url: `products?limit=${limit}&tag=${tag}`,
        method: "GET",
      }),
    }),

    // Get GENEREAL Products
    getGeneralProducts: builder.query({
      query: ({ category, tag }) => ({
        url: `products?category=${category}&tag=${tag}`,
      }),
    }),

    getProductById: builder.query({
      query: (id) => `products/${id}`,
    }),
  }),
});

export const {
  useCreatePaymentIntentMutation,
  useCreateAppointmentIntentMutation,
  useConfirmAppointmentMutation,
  useGetPopularProductsQuery,
  useGetGeneralProductsQuery,
  useGetProductByIdQuery,
} = apiSlice;
