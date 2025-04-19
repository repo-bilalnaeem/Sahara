import { AppDispatch } from "@/store/store";
import { logout } from "./authSlice";
import { apiSlice } from "@/slices/apiSlice"; // ✅ updated import
import { StreamChat } from "stream-chat"; // or 'stream-video-react-native'

const apiKey = process.env.EXPO_PUBLIC_STREAM_ACCESS_KEY!;

export const logoutUser = () => async (dispatch: AppDispatch) => {
  try {
    const client = StreamChat.getInstance(apiKey); // Replace with getOrCreateInstance if you use it
    await client.disconnectUser();
  } catch (e) {
    console.warn("Failed to disconnect Stream client", e);
  }

  dispatch(logout());
  dispatch(apiSlice.util.resetApiState()); // ✅ fixed usage
};
