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
  import ApiIndex from "../../../../api/index";
import ContinuousSlider from "app/views/material-kit/slider/ContinuousSlider";
  
  const StyledTable = styled(Table)(() => ({
    whiteSpace: "pre",
    "& thead": {
      "& tr": { "& th": { paddingLeft: 0, paddingRight: 0 } },
    },
    "& tbody": {
      "& tr": { "& td": { paddingLeft: 0, textTransform: "capitalize" } },
    },
  }));
  
  // const customersList = [
  //   {
  //     name: "john doe",
  //     date: "18 january, 2019",
  //     amount: 1000,
  //     status: "close",
  //     company: "ABC Fintech LTD.",
  //   },
  //   {
  //     name: "kessy bryan",
  //     date: "10 january, 2019",
  //     amount: 9000,
  //     status: "open",
  //     company: "My Fintech LTD.",
  //   },
  //   {
  //     name: "kessy bryan",
  //     date: "10 january, 2019",
  //     amount: 9000,
  //     status: "open",
  //     company: "My Fintech LTD.",
  //   },
  //   {
  //     name: "james cassegne",
  //     date: "8 january, 2019",
  //     amount: 5000,
  //     status: "close",
  //     company: "Collboy Tech LTD.",
  //   },
  //   {
  //     name: "lucy brown",
  //     date: "1 january, 2019",
  //     amount: 89000,
  //     status: "open",
  //     company: "ABC Fintech LTD.",
  //   },
  //   {
  //     name: "lucy brown",
  //     date: "1 january, 2019",
  //     amount: 89000,
  //     status: "open",
  //     company: "ABC Fintech LTD.",
  //   },
  //   {
  //     name: "lucy brown",
  //     date: "1 january, 2019",
  //     amount: 89000,
  //     status: "open",
  //     company: "ABC Fintech LTD.",
  //   },
  //   {
  //     name: "lucy brown",
  //     date: "1 january, 2019",
  //     amount: 89000,
  //     status: "open",
  //     company: "ABC Fintech LTD.",
  //   },
  //   {
  //     name: "lucy brown",
  //     date: "1 january, 2019",
  //     amount: 89000,
  //     status: "open",
  //     company: "ABC Fintech LTD.",
  //   },
  // ];
  
  const ManageCustomers = () => {
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

    const getCustomers = async () => {
      try {
          const response = await ApiIndex.CustomerApi.getCustomers();
          setCustomerList(response.data);
      }
      catch (error) {
        console.error(error);
      }
    } 

    useEffect(() => {
        getCustomers();
    },[getCustomers]);
  
    return (
      <SimpleCard title="Manage your customers here">
          <Box width="97%" overflow="auto">
            <StyledTable>
              <TableHead>
                <TableRow>
                  <TableCell align="left">First Name</TableCell>
                  <TableCell align="center">Last Name</TableCell>
                  <TableCell align="center">Mobile</TableCell>
                  <TableCell align="center">NIC</TableCell>
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
                      <TableCell align="center">{customer.mobile}</TableCell>
                      <TableCell align="center">{customer.nic}</TableCell>
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
  
  export default ManageCustomers;
  