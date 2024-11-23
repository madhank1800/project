import React, { useEffect, useState } from "react";
import { message } from "antd";
import { Grid,Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getAllEmployeeIds } from "../../reducers/employeeReducer";
// import { Form, Select } from "antd";
import FormControl from "@mui/material/FormControl";
import { uploadDocument } from "../../reducers/documentReducer";
import FormHelperText from "@mui/material/FormHelperText";
import { Button,  TextField } from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import documentLogo from "../../assests/images/document.png";
import Autocomplete from "@mui/material/Autocomplete";
import { makeStyles } from "@mui/styles";
const useStyles = makeStyles((theme) => ({
  btn: {
    background:
      "linear-gradient(45deg, rgb(16, 137, 211) 0%, rgb(18, 177, 209) 100%)",
    color: "#fff !important",
  },
  upload: {
    "&& .css-1rwt2y5-MuiButtonBase-root-MuiButton-root ": {
      color: " #12b1d1 !important",
    },
    image: {
      boxShadow: "0px 0px 20px 3px rgba(150, 190, 238, 0.15) !important",
    },
  },
}));
const Documents = () => {
  const classes = useStyles();
  const empIds = useSelector((state) => state.employees.empIds || []);
  // console.log(empIds);
  const dispatch = useDispatch();
  const [fileList, setFileList] = useState([]);
  const [empId, setEmpId] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const [formData, setFormData] = useState({
    empId: "",
    files: [],
  });
  const [options, setOptions] = useState([]);
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  const handleDelete = (index) => {
    const newFiles = [...formData?.files];
    newFiles.splice(index, 1);
    setFormData(newFiles);
  };
  const handleInputChange = (event, newValue) => {
    const { name, value } = event.target;
    // console.log(name, value, newValue, typeof newValue);
    setFormData({ ...formData, ["empId"]: newValue });
  };

  const handleFileChange = (event) => {
    const files = event.target.files;
    // console.log(event.target.files);
    setFormData({ ...formData, files: [...files] });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      // Form submission logic here
      // console.log("Form submitted:", formData);
      dispatch(uploadDocument(formData))
        .then((res) => {
          // console.log(res);
          if (res?.meta.requestStatus === "fulfilled") {
            // setLoading(false);
            message.success(res?.payload?.message);
            // handleClose()
          } else if (res?.meta.requestStatus === "rejected") {
            // setLoading(false);
            console.log("rejected");

            message.error("some thing went wrong");
            // handleClose()
          }
        })
        .catch((err) => {
          message.error(err);
        });
    } else {
      console.log("Form validation failed:", errors);
    }
  };

  const validateForm = () => {
    let isValid = true;
    let newErrors = {};

    // Validate selected option
    if (!formData.empId) {
      isValid = false;
      console.log(formData)
      newErrors.selectedOption = "Please select an option";
    }

    // Validate files field
    if (formData.files.length === 0) {
      isValid = false;
      newErrors.files = "Please upload at least one file";
    }

    setErrors(newErrors);
    setIsFormValid(isValid);
    return isValid;
  };

  useEffect(() => {
    dispatch(getAllEmployeeIds());
  }, []);

  return (
    <>
      {/* <form onSubmit={handleSubmit}>
        <Grid container spacing={2} pl={2}>
          <Grid item xs={6} md={6}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={12}>
                <FormControl fullWidth>
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    onChange={handleInputChange}
                    name="empId"
                    options={empIds}
                    error={!!errors.selectedOption}
                    sx={{ width: 300 }}
                    renderInput={(params) => (
                      <TextField {...params} label="Select EmployeeId" />
                    )}
                  />

                  {errors.selectedOption && (
                    <FormHelperText error>
                      {errors.selectedOption}
                    </FormHelperText>
                  )}
                </FormControl>
                
              </Grid>
              <Grid item xs={12} md={12}>
                <input
                  accept=".pdf,.doc,.docx"
                  style={{ display: "none" }}
                  id="upload-files"
                  name="file"
                  type="file"
                  onChange={handleFileChange}
                />
                <label htmlFor="upload-files" className={classes.upload}>
                  <Button
                    variant="outlined"
                    component="span"
                    startIcon={<CloudUploadIcon />}
                    style={{ width: "23.5vw" }}
                  >
                    Upload Files
                  </Button>
                </label>
                {errors.files && (
                  <FormHelperText error>{errors.files}</FormHelperText>
                )}
              </Grid>
              <Grid item xs={6}>
                
                {formData?.files?.map((file, index) => (
                  <div key={index} style={{display:"flex",background: "#fff",
                  borderRadius: "10px",
                  boxShadow:" 0px 0px 2px 1px #12B1D2",width:"23.5vw"}}>
                    <AttachFileIcon style={{margin:"10px"}}/>
                    <span  style={{marginTop:"7px"}}>{file.name}</span>
                    <IconButton
                      onClick={() => handleDelete(index)}
                      color="secondary"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </div>
                ))}
              </Grid>
              <Grid item xs={12} md={12}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  className={classes.btn}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={6}>
            <img
              src={documentLogo}
              width={500}
              style={{
                boxShadow: "0px 0px 20px 3px rgba(150, 190, 238, 0.15)",
                borderRadius: "40px",
              }}
            />
          </Grid>
        </Grid>
      </form> */}
      <form onSubmit={handleSubmit}>
      <Grid container spacing={2} pl={2}>
        {/* Left side with form fields */}
        <Grid item xs={12} md={6}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  onChange={handleInputChange}
                  name="empId"
                  options={empIds}
                  error={!!errors.selectedOption}
                  renderInput={(params) => (
                    <TextField {...params} label="Select EmployeeId" />
                  )}
                />
                {errors.selectedOption && (
                  <FormHelperText error>
                    {errors.selectedOption}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>

            {/* File upload section */}
            <Grid item xs={12}>
              <input
                accept=".pdf,.doc,.docx"
                style={{ display: "none" }}
                id="upload-files"
                name="file"
                type="file"
                onChange={handleFileChange}
              />
              <label htmlFor="upload-files">
                <Button
                  variant="outlined"
                  component="span"
                  startIcon={<CloudUploadIcon />}
                  sx={{ width: { xs: "100%", md: "23.5vw" } }} // Adjust width for responsiveness
                >
                  Upload Files
                </Button>
              </label>
              {errors.files && (
                <FormHelperText error>{errors.files}</FormHelperText>
              )}
            </Grid>

            {/* Uploaded file display */}
            <Grid item xs={12}>
              {formData?.files?.map((file, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    background: "#fff",
                    borderRadius: "10px",
                    boxShadow: "0px 0px 2px 1px #12B1D2",
                    width: { xs: "100%", md: "23.5vw" }, // Responsive width
                    mb: 1, // Margin between file items
                  }}
                >
                  <AttachFileIcon sx={{ m: 1 }} />
                  <Box sx={{ flexGrow: 1, mt: 1 }}>{file.name}</Box>
                  <IconButton onClick={() => handleDelete(index)} color="secondary">
                    <DeleteIcon />
                  </IconButton>
                </Box>
              ))}
            </Grid>

            {/* Submit button */}
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                sx={{ width: "100%" }} // Full width for mobile
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Grid>

        {/* Right side with image */}
        <Grid item xs={12} md={6}>
          <img
            src={documentLogo}
            alt="Document Logo"
            width="100%" // Responsive width for image
            style={{
              boxShadow: "0px 0px 20px 3px rgba(150, 190, 238, 0.15)",
              borderRadius: "40px",
            }}
          />
        </Grid>
      </Grid>
    </form>
    </>
  );
};

export default Documents;
