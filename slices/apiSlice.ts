import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, logout } from "./authSlice";
import { jwtDecode } from "jwt-decode";
import { secureStorage } from "@/store/secureStorage";
import { toast } from "sonner-native";

const baseUrl = "http://192.168.1.100:3001/";

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
          await secureStorage.setItem("stream_token", data.stream_token);

          // 🔹 Decode user and check if the role is CUSTOMER
          const decodedUser = jwtDecode(data.access_token);

          if (decodedUser.role !== "CUSTOMER") {
            throw new Error("User may not exist");
          }

          // Store decoded user with exp
          await secureStorage.setItem(
            "decoded_user",
            JSON.stringify(decodedUser)
          );

          dispatch(
            setCredentials({
              access_token: data.access_token,
              refresh_token: data.refresh_token,
              stream_token: data.stream_token,
            })
          );
        } catch (err) {
          console.error("Login failed: ", err);
          // Handle unauthorized or error appropriately
          // You can dispatch a logout action if the role is not CUSTOMER
          dispatch(logout());
          // Optionally, show a failure toast
          // toast.error("Login failed: User does not exist");
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
    createProductOrderIntent: builder.mutation({
      query: ({ data }) => ({
        url: `/orders`,
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

    // Confirm Appointment
    confirmProductOrder: builder.mutation({
      query: ({ data }) => ({
        url: "/orders/confirm",
        method: "POST",
        body: data,
      }),
    }),

    // Get Popular Products
    getProductsByTags: builder.query({
      query: ({ tag, limit }) => ({
        url: `products?limit=${limit}&tag=${tag}`,
        method: "GET",
      }),
    }),

    // Get GENEREAL Products
    getProductsByCategoryTags: builder.query({
      query: ({ category, tag, limit, page }) => ({
        url: `products?category=${category}&tag=${tag}&limit=${limit}&page=${page}`,
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
    getAllAppointments: builder.query<any, { limit?: number } | void>({
      query: (args) => {
        const limit = args?.limit;

        return {
          url: "appointments",
          params: limit ? { limit } : {}, // Add more params here if needed
        };
      },
    }),

    // Get RECENTLY VIEWED Doctors
    getRecentlyViewed: builder.query({
      query: () => ({
        url: "/users/recently-viewed",
      }),
    }),
    postRecentlyViewed: builder.mutation({
      query: (doctorId) => ({
        url: "/users/recently-viewed",
        method: "POST",
        body: doctorId,
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
        keepUnusedDataFor: 600,
      }),
    }),

    searchDoctors: builder.query({
      // Custom queryFn
      queryFn: async (args, _queryApi, _extraOptions, fetchWithBQ) => {
        const { role, page, limit, department, name } = args;

        const searchParams = new URLSearchParams();

        if (role) searchParams.append("role", role);
        if (page) searchParams.append("page", page.toString());
        if (limit) searchParams.append("limit", limit.toString());
        if (department) searchParams.append("department", department);
        if (name) searchParams.append("name", name); // 👈 pass full name

        const url = `/doctors?${searchParams.toString()}`;

        const result = await fetchWithBQ(url);

        if (result.error) {
          return { error: result.error };
        }

        return { data: result.data };
      },
    }),

    getLoggedUser: builder.query<any, void>({
      query: () => ({
        url: "/users/profile",
      }),
    }),

    getAllOrders: builder.query({
      query: () => ({
        url: "orders",
      }),
    }),

    createUserProfile: builder.mutation({
      query: (data) => ({
        url: "/users/setup-profile",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
  useCreatePaymentIntentMutation,
  useCreateAppointmentIntentMutation,
  useCreateProductOrderIntentMutation,
  useConfirmAppointmentMutation,
  useConfirmProductOrderMutation,
  useGetProductsByTagsQuery,
  // useGetProductsByCateoryQuery,
  useGetProductsByCategoryTagsQuery,
  useGetProductByIdQuery,
  useGetAllAppointmentsQuery,
  useGetDoctorScheduleQuery,
  useGetRecentlyViewedQuery,
  useGetDoctorByIdQuery,
  useGetAllDoctorsQuery,
  usePostRecentlyViewedMutation,
  useLazyGetLoggedUserQuery,
  useGetAllOrdersQuery,
  useSearchDoctorsQuery,
  useCreateUserProfileMutation,
} = apiSlice;
