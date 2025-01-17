import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import * as SecureStore from "expo-secure-store";

const baseUrl = "http://192.168.0.105:3001/";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: async (headers) => {
      const access_token = await SecureStore.getItemAsync("access_token");
      if (access_token) {
        headers.set("Authorization", `Bearer ${access_token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    // Payments
    createPaymentIntent: builder.mutation({
      query: (data) => ({
        url: "stripe/intent",
        method: "POST",
        body: data,
      }),
    }),



    // Doctors
    getDoctors: builder.query({
      query: (data) => ({
        url: "doctors",
        method: "GET",
        body: data,
      }),
    }),

    getProducts: builder.query({
      query: (data) => ({
        url: "products",
        method: "GET",
      }),
    }),

    // Doctor by Id
    getDoctor: builder.query({
      query: (id) => ({
        url: `/doctors/${id}`,
        method: "GET",
      }),
    }),

    // Authentication
    signin: builder.mutation({
      query: (data) => ({
        url: "auth/signin",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useCreatePaymentIntentMutation,
  useGetDoctorsQuery,
  useGetDoctorQuery,
  useSigninMutation,
  useGetProductsQuery,
} = apiSlice;
