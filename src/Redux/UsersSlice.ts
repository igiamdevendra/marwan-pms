import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface User {
  id: string;
  name: string;
  coName: string;
  contact: string;
  description?: string;
}

export interface UserState {
  users: User[];
  isLoading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  isLoading: false,
  error: null,
};

export const fetchUsers = createAsyncThunk<User[]>("users/fetchUsers", async () => {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/users"
  );
  return response.data;
});

export const deleteUserAsync = createAsyncThunk<string, string>(
  "users/deleteUser",
  async (id: string) => {
    const response = await axios.delete(
      `https://jsonplaceholder.typicode.com/users/${id}`
    );
    return id;
  }
);

export const addUserAsync = createAsyncThunk<User, User>("users/addUser", async (value: User) => {
  const response = await axios.post(
    `https://jsonplaceholder.typicode.com/users/`,
    value
  );
  return value;
});

export const editUserAsync = createAsyncThunk<User, User>(
  "users/editUser",
  async (value: User) => {
    const response = await axios.put(
      `https://jsonplaceholder.typicode.com/users/${value.id}`,
      value
    );
    return value;
  }
);


export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //fetching users
    builder.addCase(fetchUsers.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
      state.isLoading = false;
      state.users = action.payload;
      console.log("rak", state.users);
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || "Failed to fetch users";
    });


    //editing user
    builder.addCase(editUserAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(editUserAsync.fulfilled, (state, action: PayloadAction<User>) => {
      state.isLoading = false;
      state.users = state.users.map((user) =>
        user.id === action.payload.id ? action.payload : user
      );
    });
    builder.addCase(editUserAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || "Failed to edit user";
    });


    //adding new user
    builder.addCase(addUserAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addUserAsync.fulfilled, (state, action: PayloadAction<User>) => {
      state.isLoading = false;
      console.log("add user payload", action.payload);
      state.users.push(action.payload);
      console.log(state.users);
    });
    builder.addCase(addUserAsync.rejected, (state, action) => {
      state.isLoading = false;
      console.log("first");
      state.error = action.error.message || "Failed to add user";
    });
    

    //deleting a user
    builder.addCase(deleteUserAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteUserAsync.fulfilled, (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.users = state.users.filter((user) => user.id !== action.payload);
    });
    builder.addCase(deleteUserAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || "Failed to delete user";
    });
  },
});

export default userSlice.reducer;
