import React, { useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import PageLoader from "../../PageLoader";
import { useDispatch } from "react-redux";
import { updateEmployee } from "../../reducers/employeeReducer";
import { makeStyles } from "@mui/styles";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Typography } from "@mui/material";
import {  message } from "antd";
import { updateUser } from "../../reducers/userReducer";
const useStyles = makeStyles((theme) => ({
  btn: {
    background:
      "linear-gradient(45deg, rgb(16, 137, 211) 0%, rgb(18, 177, 209) 100%)",
    color: "#fff !important",
    width:"100px"
  },
  header: {
    textAlign: "center",
    fontWeight: "600 !important",
    fontSize: "30px !important",
    color: "rgb(16, 137, 211)",
  },
}));
const Settings = (props) => {
  const classes = useStyles();
  const userData = useSelector((state) => state?.auth?.updateUser);
  console.log(userData);
  const navigate = useNavigate();
  const location = useLocation();
  const rowData = location?.state?.rowData;

  const [open, setOpen] = useState(props.open);
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    id: userData?._id,
    employeeId: userData?.employeeId,
    email: userData?.email,
    firstname: userData?.firstname,
    lastname: userData?.lastname,
    mobile: userData?.mobile,
    role: userData?.role,
    department: userData?.department,
    designation: userData?.designation,
    flatno:userData?.address?.flatno,
    city:userData?.address?.city,
    housename:userData?.address?.housename,
    state:userData?.address?.state,
    zipcode:userData?.address?.zipcode,
  });
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

 

  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (event) => {
    setData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  };
 
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(data);

    setLoading(true);

    const res = await dispatch(updateEmployee(data));
    console.log(res);
    if (res?.meta.requestStatus === "fulfilled") {
      setLoading(false);
      dispatch(updateUser(res?.payload?.data))
      message.success(res?.payload?.message);
      handleClose();
    } else if (res?.meta.requestStatus === "rejected") {
      setLoading(false);
      message.error("server error");
    }
  };
  return (
    <>
      {loading && <PageLoader />}
      <form>
        <Grid
          container
          spacing={2}
          style={{padding:"10px"}}
        >
          <Grid md={12} xs={12}>
            {" "}
            <Typography component="h2"  className={classes.header}>Personal Information</Typography>
          </Grid>
          <Grid item md={4} xs={12}>
            <FormControl fullWidth>
              <TextField
                autoFocus
                required
                margin="dense"
                id="outlined-required"
                name="employeeId"
                value={data?.employeeId}
                label="Employee Id"
                type="text"
                onChange={handleChange}
                fullWidth
                variant="outlined"
              />
            </FormControl>
          </Grid>
          <Grid item md={4} xs={12}>
            <FormControl fullWidth>
              <TextField
                autoFocus
                required
                margin="dense"
                id="outlined-required"
                name="firstname"
                label="First Name"
                value={data?.firstname}
                onChange={handleChange}
                type="test"
                fullWidth
                variant="outlined"
              />
            </FormControl>
          </Grid>
          <Grid item md={4} xs={12}>
            <FormControl fullWidth>
              <TextField
                autoFocus
                required
                margin="dense"
                id="outlined-required"
                name="lastname"
                label="Last Name"
                value={data?.lastname}
                onChange={handleChange}
                type="text"
                fullWidth
                variant="outlined"
              />
            </FormControl>
          </Grid>
          <Grid item md={4} xs={12}>
            <FormControl fullWidth>
              <TextField
                autoFocus
                required
                margin="dense"
                id="outlined-required"
                name="department"
                value={data?.department}
                onChange={handleChange}
                label="Department"
                type="text"
                fullWidth
                variant="outlined"
              />
            </FormControl>
          </Grid>
          <Grid item md={4} xs={12}>
            <FormControl fullWidth>
              <TextField
                autoFocus
                required
                margin="dense"
                id="outlined-required"
                name="designation"
                value={data?.designation}
                onChange={handleChange}
                label="Designation"
                type="text"
                fullWidth
                variant="outlined"
              />
            </FormControl>
          </Grid>
          <Grid item md={4} xs={12}>
            <FormControl fullWidth>
              <TextField
                autoFocus
                required
                margin="dense"
                id="outlined-required"
                name="email"
                value={data?.email}
                onChange={handleChange}
                label="Email Address"
                type="email"
                fullWidth
                variant="outlined"
              />
            </FormControl>
          </Grid>
          <Grid item md={4} xs={12}>
            <FormControl fullWidth>
              <TextField
                autoFocus
                required
                margin="dense"
                id="outlined-required"
                name="mobile"
                value={data?.mobile}
                onChange={handleChange}
                label="Mobile Number"
                type="text"
                fullWidth
                variant="outlined"
              />
            </FormControl>
          </Grid>
          <Grid item md={4} xs={12}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Role</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={data?.role}
                onChange={handleChange}
                name="role"
                label="Role"
              >
                <MenuItem value={"admin"}>Admin</MenuItem>
                <MenuItem value={"employee"}>Employee</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item md={12} xs={12}><Typography component="h2">Address</Typography></Grid>
          <Grid item md={4} xs={12}>
            <FormControl fullWidth>
              <TextField
                autoFocus
                required
                margin="dense"
                id="outlined-required"
                name="flatno"
                value={data?.flatno}
                label="Flat no."
                type="text"
                onChange={handleChange}
                fullWidth
                variant="outlined"
              />
            </FormControl>
          </Grid>
          <Grid item md={4} xs={12}>
            <FormControl fullWidth>
              <TextField
                autoFocus
                required
                margin="dense"
                id="outlined-required"
                name="housename"
                value={data?.housename}
                label="House name"
                type="text"
                onChange={handleChange}
                fullWidth
                variant="outlined"
              />
            </FormControl>
          </Grid>
          <Grid item md={4} xs={12}>
            <FormControl fullWidth>
              <TextField
                autoFocus
                required
                margin="dense"
                id="outlined-required"
                name="city"
                value={data?.city}
                label="City"
                type="text"
                onChange={handleChange}
                fullWidth
                variant="outlined"
              />
            </FormControl>
          </Grid>
          <Grid item md={4} xs={12}>
            <FormControl fullWidth>
              <TextField
                autoFocus
                required
                margin="dense"
                id="outlined-required"
                name="state"
                value={data?.state}
                label="State"
                type="text"
                onChange={handleChange}
                fullWidth
                variant="outlined"
              />
            </FormControl>
          </Grid>
          <Grid item md={4} xs={12}>
            <FormControl fullWidth>
              <TextField
                autoFocus
                required
                margin="dense"
                id="outlined-required"
                name="zipcode"
                value={data?.zipcode}
                label="Zip code"
                type="text"
                onChange={handleChange}
                fullWidth
                variant="outlined"
              />
            </FormControl>
          </Grid>
          <Grid item md={12} xs={12}>
            <FormControl fullWidth style={{ marginTop: "5px" }}>
              <Button
                variant="contained"
                onClick={handleSubmit}
                className={classes.btn}
              >
                <AddIcon />
                Save 
              </Button>
            </FormControl>
          </Grid>
         
        </Grid>
      </form>
    </>
  );
};

export default Settings;
