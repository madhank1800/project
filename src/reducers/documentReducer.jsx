import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { postDocument,fetchAllDocumentsBYEmployeeId } from "../apis/Apis";
export const uploadDocument = createAsyncThunk(
  "document/upload",
  async (data) => {
    const response = await postDocument(data);
    return response;
  }
);
export const getDocsbyEmpId = createAsyncThunk(
  "document/getdoscById",
  async (data) => {
    const response = await fetchAllDocumentsBYEmployeeId(data);
    console.log("red",response)
    return response;
  }
);
const document = createSlice({
  name: "document",
  initialState: {
    documents: null,
    error: null,
    getDocsByEmpID:null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadDocument.pending, (state) => {
        state.documents = null;
        state.error = null;
      })
      .addCase(uploadDocument.fulfilled, (state, action) => {
        state.documents = action.payload;
        state.error = null;
      })
      .addCase(uploadDocument.rejected, (state, action) => {
        // state.employee = action.payload;
        state.error = action.payload;
      })
      .addCase(getDocsbyEmpId.pending, (state) => {
        state.getDocsByEmpID = null;
        state.error = null;
      })
      .addCase(getDocsbyEmpId.fulfilled, (state, action) => {
        state.getDocsByEmpID = action.payload;
        state.error = null;
      })
      .addCase(getDocsbyEmpId.rejected, (state, action) => {
        // state.employee = action.payload;
        state.error = action.payload;
      });
  },
});
export default document.reducer;
