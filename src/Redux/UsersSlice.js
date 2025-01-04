import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/users"
  );
  return response.data;
});

export const deleteUserAsync = createAsyncThunk(
  "users/deleteUser",
  async (id) => {
    const response = await axios.delete(
      `https://jsonplaceholder.typicode.com/users/${id}`
    );
    return id;
  }
);

export const addUserAsync = createAsyncThunk("users/addUser", async (value) => {
  const response = await axios.post(
    `https://jsonplaceholder.typicode.com/users/`,
    value
  );
  return value;
});

export const editUserAsync = createAsyncThunk(
  "users/editUser",
  async (value) => {
    const response = await axios.put(
      `https://jsonplaceholder.typicode.com/users/${value.id}`,
      value
    );
    return value;
  }
);

const initialState = {
  users: [],
  isLoading: false,
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //fetching users
    builder.addCase(fetchUsers.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.users = action.payload;
      console.log("rak", state.users);
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });


    //editing user
    builder.addCase(editUserAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(editUserAsync.fulfilled, (state, action) => {
      state.isLoading = false;
      state.users = state.users.map((user) =>
        user.id === action.payload.id ? action.payload : user
      );
    });
    builder.addCase(editUserAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });


    //adding new user
    builder.addCase(addUserAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addUserAsync.fulfilled, (state, action) => {
      state.isLoading = false;
      console.log("add user payload", action.payload);
      state.users.push(action.payload);
      console.log(state.users);
    });
    builder.addCase(addUserAsync.rejected, (state, action) => {
      state.isLoading = false;
      console.log("first");
      state.error = action.error.message;
    });
    

    //deleting a user
    builder.addCase(deleteUserAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteUserAsync.fulfilled, (state, action) => {
      state.isLoading = false;
      console.log("action", action);
      state.users = state.users.filter((user) => user.id !== action.payload);
    });
    builder.addCase(deleteUserAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export default userSlice.reducer;
export const { deleteUser } = userSlice.actions;
