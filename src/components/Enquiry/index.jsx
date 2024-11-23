import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getAllEnquiries } from "../../reducers/enquiryReducer";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  font: {
    fontSize: "15px ",
  },
}));
function Row(props) {
  const { row } = props;
  const [open, setOpen] = useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell>{row.companyname}</TableCell>
        <TableCell>{row.email}</TableCell>
        <TableCell>{row.mobile}</TableCell>
        {/* <TableCell align="right">{row.protein}</TableCell> */}
      </TableRow>
      <TableRow>
        <TableCell
          style={{
            paddingBottom: 0,
            paddingTop: 0,
            background:
              "linear-gradient(45deg, rgb(96, 194, 275) 0%, rgb(18, 238, 193) 100%)",
          }}
          colSpan={6}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography
                variant="h6"
                gutterBottom
                component="div"
                style={{ textAlign: "center" }}
              >
                <b>Idea:</b> {row.idea}
              </Typography>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const Enquiry = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.enquiry || []);
  console.log(data.enquiries);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  useEffect(() => {
    dispatch(getAllEnquiries())
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {});
    console.log(data.enquiries);
  }, []);
  return (
    <>
      <Grid container spacing={2} style={{ margin: "0px 20px", width: "auto" }}>
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead
              stickyHeader
              style={{
                background:
                  "linear-gradient(45deg, rgb(16, 137, 211) 0%, rgb(18, 177, 209) 100%)",
              }}
            >
              <TableRow>
                <TableCell />
                <TableCell className={classes.font}>
                  <b>Name</b>
                </TableCell>
                <TableCell className={classes.font}>
                  <b>Company Name</b>
                </TableCell>
                <TableCell className={classes.font}>
                  <b>Email</b>
                </TableCell>
                <TableCell className={classes.font}>
                  <b>Mobile</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.enquiries
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                ?.map((row) => (
                  // console.log(row)
                  <Row key={row.name} row={row} />
                ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 100]}
            component="div"
            count={data.enquiries?.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </Grid>
    </>
  );
};

export default Enquiry;
