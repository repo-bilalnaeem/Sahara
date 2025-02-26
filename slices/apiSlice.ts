import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, logout } from "./authSlice";
import { jwtDecode } from "jwt-decode";
import { secureStorage } from "@/store/secureStorage";

const baseUrl = "http://192.168.1.102:3001/";

const baseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: async (headers) => {
    const token = await secureStorage.getItem("access_token"); // 🔹 Use helper
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery,
  endpoints: (builder) => ({
    // Login User
    login: builder.mutation({
      query: (credentials) => ({
        url: "auth/signin",
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          // 🔹 Use helper to store tokens
          await secureStorage.setItem("access_token", data.access_token);
          await secureStorage.setItem("refresh_token", data.refresh_token);

          dispatch(
            setCredentials({
              access_token: data.access_token,
              refresh_token: data.refresh_token,
            })
          );
        } catch (err) {
          console.error("Login failed: ", err);
        }
      },
    }),

    // Signup User
    signup: builder.mutation({
      query: (userData) => ({
        url: "auth/signup",
        method: "POST",
        body: userData,
      }),
    }),

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

    getDoctorSchedule: builder.query({
      query: (doctorId) => ({
        url: `schedules/${doctorId}`,
      }),
    }),

    // Get USERS ALL Appointmnets
    getAllAppointments: builder.query({
      query: () => ({
        url: "appointments",
      }),
    }),

    // Get RECENTLY VIEWED Doctors
    getRecentlyViewed: builder.query({
      query: () => ({
        url: "/users/recently-viewed",
      }),
    }),

    // GET DOCTOR BY ID
    getDoctorById: builder.query({
      query: ({ id, date }) => ({
        url: `doctors/${id}?date=${date}`,
      }),
    }),

    getAllDoctors: builder.query({
      query: ({ page, limit, department }) => ({
        url: `doctors?department=${department}`,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
  useCreatePaymentIntentMutation,
  useCreateAppointmentIntentMutation,
  useConfirmAppointmentMutation,
  useGetPopularProductsQuery,
  useGetGeneralProductsQuery,
  useGetProductByIdQuery,
  useGetAllAppointmentsQuery,
  useGetDoctorScheduleQuery,
  useGetRecentlyViewedQuery,
  useGetDoctorByIdQuery,
  useGetAllDoctorsQuery,
} = apiSlice;
