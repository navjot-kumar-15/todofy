import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: user ? user : null,
  isLoading: false,
  isError: null,
};

const URL = "/todo/v1/auth";

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (value, thunkAPI) => {
    try {
      const { data } = await axios.post(`${URL}/register`, value);
      if (data) {
        localStorage.setItem("user", JSON.stringify(data));
      }
      return data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue({ message });
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (value, thunkAPI) => {
    try {
      const { data } = await axios.post(`${URL}/login`, value);
      if (data) {
        localStorage.setItem("user", JSON.stringify(data));
      }
      return data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue({ message });
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  return localStorage.removeItem("user");
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: {
    [registerUser.pending]: (state, action) => {
      state.isLoading = true;
    },
    [registerUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    },
    [registerUser.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = action.payload;
    },
    [loginUser.pending]: (state, action) => {
      state.isLoading = true;
    },
    [loginUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    },
    [loginUser.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = action.payload;
    },
    [logout.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.user = null;
    },
  },
});

export default authSlice.reducer;
