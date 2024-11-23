import { configureStore,combineReducers } from "@reduxjs/toolkit";
// import { applyMiddleware } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";

import userReducer from "../reducers/userReducer";
import employeeReducer from "../reducers/employeeReducer";
import enquiryReducer from "../reducers/enquiryReducer";
import documentReducer from "../reducers/documentReducer";
const rootReducer = combineReducers({
  auth: userReducer,
  employees: employeeReducer,
  enquiry:enquiryReducer,
  documents:documentReducer,

});
const store = configureStore({
  reducer: rootReducer,
    middleware:  (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(thunk);
      },
  // Other configuration options if needed
});

export default store;
