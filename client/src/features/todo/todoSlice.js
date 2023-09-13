import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createTodo,
  deleteTodo,
  getTodo,
  updatePatchTodo,
  updateTodo,
} from "./todoAPI";

const initialState = {
  todos: [],
  isLoading: false,
  isError: null,
};

export const createTodoAsyn = createAsyncThunk(
  "todo/createTodoAsyn",
  async (todoData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await createTodo(todoData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const getAllTodoAsyn = createAsyncThunk(
  "todo/getAllTodoAsyn",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await getTodo(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const updateTodoPatch = createAsyncThunk(
  "todo/updatePatchTodo",
  async (updateData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await updatePatchTodo(updateData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const updateTodoAsync = createAsyncThunk(
  "todo/updateTodo",
  async (update, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await updateTodo(update, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const deleteTodoAsync = createAsyncThunk(
  "todo/deleteTodoAsync",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await deleteTodo(id, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  extraReducers: {
    [createTodoAsyn.pending]: (state, action) => {
      state.isLoading = true;
    },
    [createTodoAsyn.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.todos.push(action.payload);
    },
    [createTodoAsyn.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = action.payload;
    },
    [getAllTodoAsyn.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getAllTodoAsyn.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.todos = action.payload;
    },
    [getAllTodoAsyn.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = action.payload;
    },
    [updateTodoPatch.pending]: (state, action) => {
      state.isLoading = true;
    },
    [updateTodoPatch.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.todos = state.todos.map((todo) =>
        todo._id === action.payload._id ? action.payload : todo
      );
    },
    [updateTodoPatch.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = action.payload;
    },
    [updateTodoAsync.pending]: (state, action) => {
      state.isLoading = true;
    },
    [updateTodoAsync.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.todos = state.todos.map((todo) =>
        todo._id === action.payload._id ? action.payload : todo
      );
    },
    [updateTodoAsync.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = action.payload;
    },
    [deleteTodoAsync.pending]: (state, action) => {
      state.isLoading = true;
    },
    [deleteTodoAsync.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.todos = state.todos.filter(
        (todo) => todo._id !== action.payload.id
      );
    },
    [deleteTodoAsync.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = action.payload;
    },
  },
});

export default todoSlice.reducer;
