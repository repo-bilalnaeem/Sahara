import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
import { secureStorage } from "@/store/secureStorage"; // 🔹 Use helper

interface User {
  id: string;
  email: string;
  role: string;
  exp: number;
  iat: number;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  streamToken: string | null;
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  streamToken: null,
};

// 🔹 Load token from SecureStore when the app starts
export const loadToken = createAsyncThunk("auth/loadToken", async () => {
  const access_token = await secureStorage.getItem("access_token"); // 🔹 Use helper
  const refresh_token = await secureStorage.getItem("refresh_token");
  const stream_token = await secureStorage.getItem("stream_token");

  if (access_token) {
    const decodedUser: User = jwtDecode(access_token);

    // console.log("Decoded user:", decodedUser);

    return { access_token, refresh_token, stream_token, user: decodedUser };
  }
  return {
    access_token: null,
    refresh_token: null,
    stream_token: null,
    user: null,
  };
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{
        access_token: string;
        refresh_token: string;
        stream_token: string;
      }>
    ) => {
      const { access_token, refresh_token, stream_token } = action.payload;
      const decodedUser: User = jwtDecode(access_token);

      // console.log("Access Token:", access_token);
      // console.log("Refresh Token:", refresh_token);
      // console.log("Stream Token:", stream_token);

      state.accessToken = access_token;
      state.refreshToken = refresh_token;
      state.streamToken = stream_token;
      state.user = decodedUser;
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.streamToken = null;

      // 🔹 Use helper to clear SecureStore
      secureStorage.removeItem("access_token");
      secureStorage.removeItem("refresh_token");
      secureStorage.removeItem("stream_token");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadToken.fulfilled, (state, action) => {
      state.accessToken = action.payload.access_token;
      state.refreshToken = action.payload.refresh_token;
      state.streamToken = action.payload.stream_token;
      state.user = action.payload.user;
    });
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
