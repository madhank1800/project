import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import { Grid } from "@mui/material";
import { useSelector } from "react-redux";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import RefreshIcon from "@mui/icons-material/Refresh";
import AddIcon from "@mui/icons-material/Add";
import AddEmployee from "./addEmployee";
import { fetchAllUserAsync } from "../../reducers/userReducer";
import { useDispatch } from "react-redux";
import { makeStyles } from "@mui/styles";
import { useParams } from "react-router-dom";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import { deleteEmployee } from "../../apis/Apis";
import PageLoader from "../../PageLoader";
import { message } from "antd";

const useStyles = makeStyles((theme) => ({
  btn: {
    background:
      "linear-gradient(45deg, rgb(16, 137, 211) 0%, rgb(18, 177, 209) 100%)",
    color: "#fff !important",
  },
}));
const columns = [
  { id: "employeeId", label: "EmpId", minWidth: 100 },
  { id: "firstname", label: "Firstname", minWidth: 100 },
  { id: "lastname", label: "Lastname", minWidth: 100 },
  { id: "email", label: "Email", minWidth: 100 },
  { id: "mobile", label: "Mobile", minWidth: 100 },
  { id: "role", label: "Role", minWidth: 100 },
];

const Employees = () => {
  const [loading, setLoading] = useState(false);
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const getAllUsers = useSelector((state) => state.auth.allUsers || []);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [isOpen, setIsOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [rowData, setRowData] = useState(0);
  const open = Boolean(anchorEl);
  const handleClick = (event, row) => {
    // console.log(row)
    setRowData(row);
    setAnchorEl(event.currentTarget);
  };
  const handleEdit = () => {
    console.log(rowData);
    navigate("/dashboard/editemployee", { state: { rowData } });
  };
  const handleDelete = async () => {
    setAnchorEl(null);
    const res = await deleteEmployee(rowData._id);
    console.log(res.status);
    setLoading(true);
    if (res?.status == 200) {
      setRefresh(!refresh);
      setLoading(false);
      message.success(res?.data);
    } else {
      setLoading(false);
      message.error("server error");
    }
    // navigate("/dashboard/editemployee", { state: { rowData } })
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleAdd = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    dispatch(fetchAllUserAsync())
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {});
    console.log(getAllUsers);
  }, [refresh]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleRefresh = () => {
    setRefresh(!refresh);
  };
  return (
    <>
      {loading && <PageLoader />}

      {isOpen && <AddEmployee open={true} />}
      <Grid container style={{ margin: "0px 10px" }} spacing={2}>
        <Grid item xs={12} md={12}>
          {" "}
          <Grid container spacing={2} style={{ margin: "5px 0px" }}>
            {" "}
            <Grid item xs={4}>
              {" "}
              <Button
                variant="contained"
                onClick={handleAdd}
                className={classes.btn}
              >
                <AddIcon />
                Add New Employee
              </Button>
            </Grid>
            <Grid item xs={4}>
              {" "}
              <Button
                variant="outlined"
                onClick={handleRefresh}
                className={classes.btn}
              >
                <RefreshIcon />
                refresh
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ width: "90%", overflow: "hidden" }}>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                      >
                        <b> {column.label}</b>
                      </TableCell>
                    ))}
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {getAllUsers
                    ?.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                    ?.map((row,index) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={index}
                        >
                          {columns.map((column) => {
                            const value = row[column.id];
                            return (
                              <>
                                <TableCell key={column.id} align={column.align}>
                                  {column.format && typeof value === "number"
                                    ? column.format(value)
                                    : value}
                                </TableCell>
                              </>
                            );
                          })}
                          <TableCell style={{ cursor: "pointer" }}>
                            <MoreHorizIcon
                              onClick={(event) => handleClick(event, row)}
                            />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, 100]}
              component="div"
              count={getAllUsers.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Grid>
      </Grid>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        style={{
          boxShadow:
            "0px 0px 0px -3px rgba(0,0,0,0.2), 0px 8px 8px 0px rgba(0,0,0,0.14), 0px 3px 6px 2px rgba(0,0,0.)",
        }}
      >
        <MenuItem onClick={handleEdit}>Edit</MenuItem>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>
    </>
  );
};
export default Employees;
