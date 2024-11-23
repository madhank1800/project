import axios from "axios";
import { config } from "../Config/config";

const signInApi = async (userData) => {
  try {
    const response = await axios.post(
      `${config.BASE_URL}${config.login}`,
      userData
    );
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("role", response.data.role);
    localStorage.setItem("userid", response.data._id);
    localStorage.setItem("user", JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

const fetchAllUserApi = async () => {
  try {
    const response = await axios.get(`${config.BASE_URL}${config.getAllUsers}`);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

const addEmployeeApi = async (data) => {
  // console.log("data:", data);

  try {
    const response = await axios.post(
      `${config.BASE_URL}${config.registerEmployee}`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};
const updateEmployeeApi = async (data) => {
const {id,...payload}=data

  try {
    const response = await axios.put(
      `${config.BASE_URL}${config.editEmployee}/${id}`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};
const fetchAllUsersEmployeeIds = async () => {
  try {
    const response = await axios.get(
      `${config.BASE_URL}${config.getEmlpoyeeIds}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};
const fetchAllDocumentsBYEmployeeId = async (id) => {
  try {
    const response = await axios.get(
      `${config.BASE_URL}${config.getDocsByEmpId}/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    // console.log("api", response);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};
const fetchAllEnquiries = async () => {
  try {
    const response = await axios.get(
      `${config.BASE_URL}${config.getAllEnquiries}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    // console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};
const postEnquiry = async (data) => {
  try {
    const response = await axios.post(
      `${config.BASE_URL}${config.postEnquiry}`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    // console.log(response.data)
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};
const postDocument = async (data) => {
  try {
    const response = await axios.post(
      `${config.BASE_URL}${config.uploadDocument}`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    // console.log(response.data)
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};
const downloadDocument = async (id) => {
  try {
    const response = await axios.get(
      `${config.BASE_URL}${config.downloadDoc}/${id}`,

      {
        responseType: "arraybuffer",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    console.log(response.config.url);
    return response;
  } catch (error) {
    throw new Error(error);
  }
};
const deleteEmployee = async (id) => {
  try {
    const response = await axios.delete(`${config.BASE_URL}user/${id}`);
    console.log(response);
    return response;
  } catch (error) {
    throw new Error(error);
  }
};
export {
  signInApi,
  fetchAllUserApi,
  addEmployeeApi,
  fetchAllUsersEmployeeIds,
  fetchAllEnquiries,
  postEnquiry,
  postDocument,
  fetchAllDocumentsBYEmployeeId,
  downloadDocument,
  deleteEmployee,updateEmployeeApi
};
