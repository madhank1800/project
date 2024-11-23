import React, { useState } from "react";
import { useSelector } from "react-redux";
import Paper from "@mui/material/Paper";
import { Grid } from "@mui/material";
import { Typography, TextField } from "@mui/material";
import Avatar from '@mui/material/Avatar';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import profile from "../../assests/images/profile.png";
import { makeStyles } from "@mui/styles";
import Divider from '@mui/material/Divider';


const useStyles = makeStyles((theme) => ({
  primary: {
    textAlign: "center",
    fontWeight: " 900 !important",
    fontSize: "15px !important",
    color: "rgb(16, 137, 211)",
  },
  secondary: {
    textAlign: "center",
    fontWeight: " 600 !important",
    fontSize: "10px !important",
    color: "rgb(16, 137, 211)",
  },
}));
const getDate = (str) => {
  const date = new Date(str);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate
}
const Profile = () => {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const currentUser = useSelector((state) => state.auth);
  // console.log(currentUser);
  const user = currentUser?.user;
  const getIntials = (firstName, lastName) => {
    return `${firstName?.charAt(0)}${lastName?.charAt(0)}`.toUpperCase();
  }
  return (
    <>
      <Grid container spacing={2} style={{ marginLeft: "10px" }}>
        <Grid item md={9} xs={9}>
          <Grid container spacing={2} >
            <Grid item md={12} xs={12}>
              <Paper elevation={3} sx={{ borderRadius: '12px', overflow: 'hidden' }}>
                <Box sx={{ bgcolor: 'primary.main', height: 60, position: 'relative' }}>
                  <Box sx={{ position: 'absolute', top: '50%', right: 16, transform: 'translateY(-50%)', display: 'flex', alignItems: 'center', color: 'white' }}>
                    <LocationOnIcon fontSize="small" />
                    <Typography variant="body2" sx={{ marginLeft: '4px' }}>
                      IND
                    </Typography>
                  </Box>
                </Box>

                <Grid container spacing={2} sx={{ padding: 2 }}>
                  <Grid item xs={12} sm={2}>
                    <Avatar sx={{ width: 56, height: 56, bgcolor: '#C5E1A5', fontSize: '24px', color: 'black' }}>
                      {getIntials(user?.firstname, user?.lastname)}
                    </Avatar>
                  </Grid>
                  <Grid item xs={12} sm={10}>
                    <Typography variant="h6" fontWeight="bold">
                      Mr./Ms {user?.firstname} {user?.lastname}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                      {user?.designation}
                    </Typography>
                  </Grid>

                  <Grid item xs={12}>
                    <Divider />
                  </Grid>

                  {/* Employee Info */}
                  <Grid item xs={6} sm={3}>
                    <Typography variant="body2" color="primary">Employee ID</Typography>
                    <Typography variant="body1">{user?.employeeId}</Typography>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Typography variant="body2" color="primary">Email</Typography>
                    <Typography variant="body1">{user?.email.toLowerCase()}</Typography>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Typography variant="body2" color="primary">Payroll ID</Typography>
                    <Typography variant="body1">{user?.employeeId}</Typography>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Typography variant="body2" color="primary">Employment Type</Typography>
                    <Typography variant="body1">--</Typography>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Typography variant="body2" color="primary">Department</Typography>
                    <Typography variant="body1">{user?.department}</Typography>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Typography variant="body2" color="primary">Report To</Typography>
                    <Typography variant="body1">--</Typography>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Typography variant="body2" color="primary">Joined Date</Typography>
                    <Typography variant="body1">{getDate(user?.doj)}</Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid item md={12} xs={12}>
              <Grid container>
                <Grid item md={12} xs={9}>
                <Tabs value={value} onChange={handleChange} >
                  <Tab label="Contact" />
                  <Tab label="Address" />
                  <Tab label="Skills" />
                  <Tab label="Availability" />
                  <Tab label="Personal Bank Account" />
                </Tabs>
              </Grid>
            </Grid>
            {value === 0 && (
              <Box sx={{ mt: 1 }}>
                <Paper sx={{ p: 2, mb: 2 }}>
                  <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item md={11} xs={11}>
                      <Typography variant="h6">Primary Number</Typography>
                    </Grid>
                    <Grid item md={1} xs={1}>
                      <IconButton>
                        <EditIcon />
                      </IconButton>
                    </Grid>
                    <Grid item md={12} xs={12}>
                      <label>Mobile:</label>
                      <Typography component="h5">{user?.mobile}</Typography>
                    </Grid>

                  </Grid>
                  <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item md={11} xs={11}>
                      <Typography variant="h6">Secondary Number</Typography>
                    </Grid>
                    <Grid item md={1} xs={1}>
                      <IconButton>
                        <EditIcon />
                      </IconButton>
                    </Grid>
                    <Grid item md={12} xs={12}>
                      <label>Mobile:</label>
                      <Typography component="h5">----------</Typography>
                    </Grid>

                  </Grid>

                </Paper>



              </Box>
            )}
          </Grid>

        </Grid>
      </Grid>
      <Grid item md={2.5} xs={9}>
        <Paper >
          <Card>
            <CardHeader title="Announcements" />
            <CardContent>Currently no announcements..!</CardContent>
          </Card>
        </Paper>
      </Grid>
    </Grid >
    {/* <Grid container spacing={2} m={1}>
        <Grid item md={8} xs={12}>
          <Card>
            <CardHeader title="General Information" />
            <Grid container spacing={2} m={1}>
              <Grid item md={6} xs={12}>
                <label>EmployeeCode:</label>
                <Typography component="h5">{user?.employeeId}</Typography>
              </Grid>
              <Grid item md={6} xs={12}>
                <label>First name:</label>
                <Typography component="h5">{user?.firstname}</Typography>
              </Grid>
              <Grid item md={6} xs={12}>
                <label>Last name:</label>
                <Typography component="h5">{user?.lastname}</Typography>
              </Grid>
              <Grid item md={6} xs={12}>
                <label>Department:</label>
                <Typography component="h5">{user?.department}</Typography>
              </Grid>
              <Grid item md={6} xs={12}>
                <label>Designation:</label>
                <Typography component="h5">{user?.designation}</Typography>
              </Grid>
              <Grid item md={6} xs={12}>
                <label>Mobile:</label>
                <Typography component="h5">{user?.mobile}</Typography>
              </Grid>
              <Grid item md={6} xs={12}>
                <label>Date of Joined:</label>
                <Typography component="h5">{getDate(user?.doj)}</Typography>
              </Grid>
            </Grid>
          </Card>
        </Grid>
        <Grid item md={3} xs={12}>
          <Card>
            <CardHeader />{" "}
            <CardMedia
              component="img"
              height="194"
              image={profile}
              alt="Paella dish"
            />
            <CardContent>
              <Typography component="h5" className={classes.primary}>
                {user?.firstname}
              </Typography>
              <Typography component="h5" className={classes.secondary}>
                {user?.email.toLowerCase()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid> */}
    </>
  );
};

export default Profile;
