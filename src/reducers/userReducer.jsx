import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { signInApi, fetchAllUserApi } from "../apis/Apis";

export const loginAsync = createAsyncThunk(
  "auth/loginAsync",
  async (credentials) => {
    // Simulate an API call (replace with actual API call)
    const response = await signInApi(credentials);
    return response;
  }
);

export const fetchAllUserAsync = createAsyncThunk(
  "auth/fetchAllUserAsync",
  async () => {
    const response = await fetchAllUserApi();
    return response;
  }
);

// Auth slice
const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    isAuthenticated: false,
    user: null,
    updateUser:null,
    allUsers:null,
    error: null,
    token: null,
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload.user;
      state.loading = false;
      state.isAuthenticated = true;
      state.error = null;
      state.token = action.payload.token;
    },
    setAllUsers: (state, action) => {
      state.user = action.payload.user;
      state.loading = false;
      state.isAuthenticated = true;
      state.error = null;
    },
    updateUser:(state,action)=>{
      state.updateUser = action?.payload;
      state.loading = false;
      state.isAuthenticated = true;
      state.error = null;
    },
    logoutUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.loading = true;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
        state.updateUser = action.payload;
        state.error = null; 
        state.token = action.payload.token;

      
        if (!action.payload || action.payload.error) {
          state.isAuthenticated = false;
          state.error = "Invalid response from the server";
        }
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.error.message;
      }).addCase(fetchAllUserAsync.pending, (state) => {
        state.loading = 'loading';
      })
      .addCase(fetchAllUserAsync.fulfilled, (state, action) => {
        state.allUsers = action.payload;
      })
      .addCase(fetchAllUserAsync.rejected, (state, action) => {
        
        state.error = action.error.message;
      })
  },
});

export const { logoutUser, login,updateUser } = authSlice.actions;
export default authSlice.reducer;
// export const userReducer=(state=intialState,action)=>{
//     switch (action.type) {
//         case types.LOGIN_REQUEST:
//           return { ...state, isAuthenticated: true,userData: action.payload, error: null };

//         case types.LOGIN_FAILURE:
//           return { ...state, isLoading: false, error: action.payload };

//         default:
//           return state;
//       }
// }
