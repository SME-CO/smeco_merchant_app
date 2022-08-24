import {
    Box,
    Icon,
    IconButton,
    styled,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
  } from "@mui/material";
  import { useState, useEffect } from "react";

  import { SimpleCard } from "app/components";
  import ApiIndex from "../../../api/index";
  
  const StyledTable = styled(Table)(() => ({
    whiteSpace: "pre",
    "& thead": {
      "& tr": { "& th": { paddingLeft: 0, paddingRight: 0 } },
    },
    "& tbody": {
      "& tr": { "& td": { paddingLeft: 0, textTransform: "capitalize" } },
    },
  }));
  
  const AllMerchants = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [customersList, setCustomerList] = useState([]);
  
    const handleChangePage = (_, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };

    const getMerchants = async () => {
      try {
          const response = await ApiIndex.MerchantApi.getAllMerchants();
          setCustomerList(response.data);
      }
      catch (error) {
        console.error(error);
      }
    } 

    useEffect(() => {
        getMerchants();
    });
  
    return (
      <SimpleCard title="Registered Merchants in the System">
          <Box width="97%" overflow="auto">
            <StyledTable>
              <TableHead>
                <TableRow>
                  <TableCell align="left">First Name</TableCell>
                  <TableCell align="center">Last Name</TableCell>
                  <TableCell align="center">Shop Name</TableCell>
                  <TableCell align="center">Shop Mobile</TableCell>
                  <TableCell align="center">Shop Address</TableCell>
                  <TableCell align="center">Mobile</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {customersList && customersList
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((customer, index) => (
                    <TableRow key={index}>
                      <TableCell align="left">{customer.firstName}</TableCell>
                      <TableCell align="center">{customer.lastName}</TableCell>
                      <TableCell align="center">{customer.shopName}</TableCell>
                      <TableCell align="center">{customer.shopMobile}</TableCell>
                      <TableCell align="center">{customer.shopAddress}</TableCell>
                      <TableCell align="center">{customer.phoneNumber}</TableCell>
                      <TableCell align="center">
                        <IconButton>
                          <Icon color="error">edit</Icon>
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </StyledTable>
      
            <TablePagination
              sx={{ px: 2 }}
              page={page}
              component="div"
              rowsPerPage={rowsPerPage}
              count={5}
              onPageChange={handleChangePage}
              rowsPerPageOptions={[5, 10, 25]}
              onRowsPerPageChange={handleChangeRowsPerPage}
              nextIconButtonProps={{ "aria-label": "Next Page" }}
              backIconButtonProps={{ "aria-label": "Previous Page" }}
            />
          </Box>
      </SimpleCard>
    );
  };
  
  export default AllMerchants;
  