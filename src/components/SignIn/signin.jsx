import   React,{useState} from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";
// import { signInApi } from "../../apis/authApi.jsx";
import "./styles.css";
import { makeStyles } from "@mui/styles";
import { useDispatch } from "react-redux";
import { loginAsync, updateUser } from "../../reducers/userReducer.jsx";
import { message } from "antd";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";

const useStyles = makeStyles((theme) => ({
  font: {
    fontSize: "70px",
    // width: "100%",
    // background: "white",
    // border: "none",
    // padding:" 15px 20px",
    // borderRadius: "20px",
    // marginTop: "15px",
    // boxShadow: "#cff0ff 0px 10px 10px -5px",
    // borderInline:" 2px solid transparent"
  },
}));

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="http://localhost:3000/">
        EYS
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

const SignIn = () => {
  //console.log("props",onSignIn );
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const currentUser = useSelector((state) => state);
  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    let dataToSent = {
      email: data.get("email"),
      password: data.get("password"),
    };

    try {
      dispatch(loginAsync(dataToSent))
        .then(async (res) => {
          if (res.payload) {
            dispatch(updateUser(res.payload))
            // await onSignIn();
            navigate("/dashboard");
            message.success("success");
          } else {
            // toast("Default Notification !");
            message.error("invalid credentials!");
          }
        })
        .catch((error) => {
          message.error("Some thing went wrong?");
        });
    } catch (error) {
      throw new Error(error);
    }
  };
 
  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <Container
          component="main"
          maxWidth="md"
          className="main"
          style={{ marginTop: "60px" }}
        >
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1 }} className="lock">
              <LockOutlinedIcon />
            </Avatar>

            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <FormControl fullWidth>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  error=""
                  autoComplete="email"
                  className={classes.font}
                  autoFocus
                />
                <FormHelperText ></FormHelperText>
              </FormControl>
              <FormControl fullWidth>
                <TextField
                  margin="normal"
                  required
                  fullWidth
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
                  name="password"
                  label="Password"
                 
                  id="password"
                  autoComplete="current-password"
                />
                <FormHelperText ></FormHelperText>
              </FormControl>
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                size="large"
                fullWidth
                variant="contained"
                className="login-button"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body1" style={{ color: "#0099ff" }}>
                    Forgot password?
                  </Link><br/>
                  {/* <Link to={"/signup"} variant="body1" style={{ color: "#0099ff" }}>
                    Register?
                  </Link> */}
                </Grid>
                <Grid item>
                  <Link to={"/"} variant="body1" style={{ color: "#0099ff" }}>
                    {"Go Back"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </ThemeProvider>
    </>
  );
};
export default SignIn;
