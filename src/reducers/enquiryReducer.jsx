import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAllEnquiries ,postEnquiry} from "../apis/Apis";
export const getAllEnquiries = createAsyncThunk(
  "enquiry/getAll",
  async () => {
    const response = await fetchAllEnquiries();
    // console.log(response)
    return response;
  }
);
export const createEnquiry = createAsyncThunk(
  "enquiry/save",
  async (data) => {
    const response = await postEnquiry(data);
    // console.log(response)
    return response;
  }
);

const enquiry = createSlice({
  name: "enquiry",
  initialState:{
    enquiries:null,
    newEnquiry:null,
    error:null,
  },reducers:{

  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllEnquiries.pending, (state) => {
        state.enquiries = null;
        state.error = null;
      })
      .addCase(getAllEnquiries.fulfilled, (state, action) => {
        state.enquiries = action.payload;
        // state.error =null;
      })
      .addCase(getAllEnquiries.rejected, (state, action) => {
        // state.employee = action.payload;  
        state.error = action.payload;
      })
      .addCase(createEnquiry.pending, (state) => {
        state.newEnquiry = null;
        state.error = null;
      })
      .addCase(createEnquiry.fulfilled, (state, action) => {
        // console.log(action.payload)
        state.newEnquiry = action.payload;
        // state.error =null;
      })
      .addCase(createEnquiry.rejected, (state, action) => {
        // state.employee = action.payload;  
        state.error = action.payload;
      });
    
  },
});
export default enquiry.reducer;
