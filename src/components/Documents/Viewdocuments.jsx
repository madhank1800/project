import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllDocumentsBYEmployeeId } from "../../apis/Apis";
import { getDocsbyEmpId } from "../../reducers/documentReducer";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import { downloadDocument } from "../../apis/Apis";
import pdfIcon from "../../assests/images/pdf.png";
const Viewdocuments = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const empId = useSelector((state) => state.auth?.user?._id || 0);
  const documents = useSelector(
    (state) => state.documents?.getDocsByEmpID || []
  );
  console.log(empId);
  console.log(documents);
  useEffect(() => {
    dispatch(getDocsbyEmpId(localStorage.getItem("userid")))
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {});
  }, []);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleDownload = async (id, name) => {
    try {
      const response = await downloadDocument(id);

      // Create a Blob from the response data
      const blob = new Blob([response.data], { type: "application/pdf" });

      // Create a URL for the Blob
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;

      link.setAttribute("download", `${name.split(".")[0]}`);

      document.body.appendChild(link);

      // Click the link to trigger the download
      link.click();

      // Cleanup
      window.URL.revokeObjectURL(response.config.url);
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading PDF:", error);
      // Handle error
    }
  };
  return (
    <>
      {" "}
      <TableContainer
        component={Paper}
        style={{ margin: "15px", width: "75vw" }}
      >
        <Table sx={{ minWidth: 550 }} aria-label="simple table">
          <TableHead
            style={{
              background:
                "linear-gradient(45deg, rgb(16, 137, 211) 0%, rgb(18, 177, 209) 100%)",
            }}
          >
            <TableRow>
              <TableCell align="left">
                <b>DocmentName</b>
              </TableCell>
              <TableCell align="left">
                <b>Actions</b>
              </TableCell>
              {/* <TableCell align="center"></TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {documents
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              ?.map((doc, index) => {
                return (
                  <>
                    <TableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="left">
                        <img
                          src={pdfIcon}
                          style={{ width: "34px", paddingRight: "10px" }}
                        />
                        {doc.documentName}
                      </TableCell>
                      <TableCell align="left">
                        {/* <VisibilityIcon
                        style={{ color: "#1677ff", cursor: "pointer" }}
                      /> */}
                        <CloudDownloadIcon
                          onClick={() => {
                            handleDownload(doc._id, doc.documentName);
                          }}
                          style={{ color: "#1677ff", cursor: "pointer" }}
                        />
                      </TableCell>
                      {/* <TableCell>
                      
                    </TableCell> */}
                    </TableRow>
                  </>
                );
              })}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 100]}
          component="div"
          count={documents.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </>
  );
};
export default Viewdocuments;
