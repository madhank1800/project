import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useTheme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import PageLoader from "../../PageLoader";
import { useDispatch } from "react-redux";
import {  message } from "antd";
import { addEmployee } from "../../reducers/employeeReducer";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { makeStyles } from "@mui/styles";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
const useStyles = makeStyles((theme) => ({
  btn: {
    background:
      "linear-gradient(45deg, rgb(16, 137, 211) 0%, rgb(18, 177, 209) 100%)",
    color: "#fff !important",
  },
  header: {
    textAlign: "center",
    fontWeight: " 900",
    fontSize: "30px",
    color: "rgb(16, 137, 211)",
  },
}));
const AddEmployee = (props) => {
  const classes = useStyles();
  const [open, setOpen] = useState(props.open);
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState();
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

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
    // const formData = new FormData(event.currentTarget);
    // const formJson = Object.fromEntries(formData.entries());
    // // setLoading(true);
    setLoading(true);
    // console.log(formJson);
    const res = await dispatch(addEmployee(data));
    console.log(res);
    if (res?.meta.requestStatus === "fulfilled") {
      setLoading(false);
      message.success(res?.payload?.message);
      handleClose();
    } else if (res?.meta.requestStatus === "rejected") {
      setLoading(false);
      // console.log(res)
      message.error("server error");
    }
  };
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
     
      >
        {loading && <PageLoader />}
        <DialogTitle className={classes.header}>Add New Employee</DialogTitle>
        <DialogContent>
          <FormControl fullWidth>
            <TextField
              autoFocus
              required
              margin="dense"
              id="outlined-required"
              name="employeeId"
              label="Employee Id"
              type="text"
              onChange={handleChange}
              fullWidth
              variant="outlined"
            />
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Department</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              //   value={role}
              onChange={handleChange}
              name="department"
              label="department"
            >
              <MenuItem value={"Development"}>Development</MenuItem> 
              <MenuItem value={"Testing"}>Testing</MenuItem>
              <MenuItem value={"HR"}>HR</MenuItem>
              <MenuItem value={"Businees"}>Businees</MenuItem>
              <MenuItem value={"Marketing"}>Marketing</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <TextField
              autoFocus
              required
              margin="dense"
              id="outlined-required"
              name="designation"
              label="Designation"
              onChange={handleChange}
              type="text"
              fullWidth
              variant="outlined"
            />
          </FormControl>
          <FormControl fullWidth>
            <TextField
              autoFocus
              required
              margin="dense"
              id="outlined-required"
              name="firstname"
              label="First Name"
              onChange={handleChange}
              type="text"
              fullWidth
              variant="outlined"
            />
          </FormControl>
          <FormControl fullWidth>
            <TextField
              autoFocus
              required
              margin="dense"
              id="outlined-required"
              name="lastname"
              label="Last Name"
              onChange={handleChange}
              type="text"
              fullWidth
              variant="outlined"
            />
          </FormControl>
          <FormControl fullWidth>
            <TextField
              autoFocus
              required
              margin="dense"
              id="outlined-required"
              name="email"
              onChange={handleChange}
              label="Email Address"
              type="email"
              fullWidth
              variant="outlined"
            />
          </FormControl>
          <FormControl fullWidth>
            {/* <div style={{ display: "flex" }}> */}
            <TextField
              autoFocus
              required
              margin="dense"
              id="outlined-required"
              name="password"
              onChange={handleChange}
              label="Password"
              InputProps={{
                endAdornment: (
                  <IconButton
                    onClick={handleTogglePasswordVisibility}
                    edge="end"
                  >
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}{" "}
                  </IconButton>
                ),
              }}
              type={showPassword ? "text" : "password"}
              fullWidth
              variant="outlined"
            />
            {/* <IconButton onClick={handleTogglePasswordVisibility}>
                {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </IconButton> */}
            {/* </div> */}
          </FormControl>
          <FormControl fullWidth>
            <TextField
              autoFocus
              required
              margin="dense"
              id="outlined-required"
              name="mobile"
              onChange={handleChange}
              label="Mobile Number"
              type="text"
              fullWidth
              variant="outlined"
            />
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Role</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              //   value={role}
              onChange={handleChange}
              name="role"
              label="Role"
            >
              <MenuItem value={"admin"}>Admin</MenuItem>
              <MenuItem value={"employee"}>Employee</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="cancel" color="danger">
            <CloseIcon />
            Cancel
          </Button>
          <Button
            variant="contained"
            type="submit"
            onClick={handleSubmit}
            className={classes.btn}
          >
            <PersonAddIcon />
            <span style={{ paddingLeft: "10px" }}> Add</span>
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default AddEmployee;
