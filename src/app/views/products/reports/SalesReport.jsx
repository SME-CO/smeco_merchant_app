import {  SimpleCard } from "app/components";
import {
    Button,
    FormControlLabel,
    Grid,
    styled,
    Snackbar,
    Alert,
    filledInputClasses,
    InputLabel,
    FormControl,
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
  } from "@mui/material";
import { Span } from "app/components/Typography";
import { useEffect, useState } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import React from "react";
import ApiIndex from "../../../../api/index";
import ContinuousSlider from "app/views/material-kit/slider/ContinuousSlider";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  width: "80%"
}));

const TextField = styled(TextValidator)(() => ({
    width: "100%",
    marginBottom: "16px",
}));

const Heading = styled('div')(({ subtitle }) => ({
    fontSize: '0.9rem',
    fontWeight: '500',
    marginBottom: !subtitle && '16px',
}));

const Container = styled("div")(({ theme }) => ({
    margin: "30px",
    [theme.breakpoints.down("sm")]: { margin: "16px" },
    "& .breadcrumb": {
        marginBottom: "30px",
        [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
    },
}));

function generate(element) {
  return [0, 1, 2].map((value) =>
    React.cloneElement(element, {
      key: value,
    }),
  );
}

const SalesReport = () => {
    const [state, setState] = useState({ date: new Date() });
    const [isAlert, setIsAlert] = React.useState(false);
    const [alertMessage, setAlertMessage] = React.useState('');
    const [alertType, setAlertType] = React.useState('');
    const [purchaseType, setPurchaseType] = React.useState('normal');
    const [offerType, setOfferType] = React.useState('');
    const [productsList, setProductList] = useState([]);
    const [selectedCategory, setCategory] = useState('');
    const [productBundle, setProductBundle] = useState([]);
    const [customerCart, setCustomerCart] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectedQuantity, setSelectedQuantity] = useState(0);
  
    const hideAlert = () => {
      if(isAlert){
        setTimeout(() => {setIsAlert(false)}, 3000);
      }
    }
  
    useEffect(async () => {
      hideAlert();
      await syncProductsByCategory(selectedCategory);
    }, [selectedCategory, productBundle]);

    const handleSubmit = async () => {
      try {

        const formData = {
            firstName : state.firstName,
            lastName : state.lastName,
            nic: state.nic,
            mobile: state.mobile,
            otp : state.otp
        }

        const response = await ApiIndex.CustomerApi.createCustomer(formData);
        setAlertType('success');
        setAlertMessage('Cutomer created sucessfully');
        setIsAlert(true);
        cleanForm();
      } catch (error) {
        console.log(error);
        setAlertType('error');
        if(error.code == 400) {
          setAlertMessage(error.message);
        }else if(error.code == 500) {
          setAlertMessage("Sorry, something went wrong, Please try again later");
        }else{
          setAlertMessage("Sorry, server not connected, Please try again later");
        }

        setIsAlert(true);
      }
    };
  
    const handleChange = (event) => {
      setState({ ...state, [event.target.name]: event.target.value });
      console.log(event.target.value);
    };

    const handleAddProductToCart = () => {
      if(selectedQuantity > 0 && selectedProduct!=null){
        const productExists = customerCart.filter(item => item.product.id == selectedProduct.id);
        if(productExists.length == 0){
          let item = {
            product : selectedProduct,  
            purchaseType : 'normal',
            quantity : selectedQuantity,
            total : selectedProduct.price * selectedQuantity
          }  
          setCustomerCart(current => [...current, item]);
          console.log(customerCart);
        }
      }
    }

    const handleRemoveProduct = (id) => {
      setProductBundle(productBundle.filter(product => product.id != id))
    }

    const handleProductChange = (event) => {
      setSelectedProduct(event.target.value);
    }

    const handleQuantityChange = (event) => {
       setSelectedQuantity(event.target.value); 
    }

    const handlePurchaseTypeChange = (event) => {
        setPurchaseType(event.target.value);
    };

    const handleChangeCategoryType = async(event) => {
      try {
        setCategory(event.target.value);
        setSelectedProduct(null);
       }
      catch (error) {
        console.error(error);
      }
    };

    const syncProductsByCategory = async (category) => {
      try {
          const response = await ApiIndex.ProductApi.getProductsByCategory(category);
          setProductList(response.data);
      }
      catch (error) {
          console.log(error);
      }
    };

    const handleChangeOfferType = (event) => {
      setOfferType(event.target.value);
    };

    const cleanForm = () => {
      setState({firstName : "", lastName : "", nic : "", mobile : "", otp : ""});
    }

    const {
      firstName,
      lastName,
      nic,
      mobile,
      otp,
   
    } = state;


    return (
        <Container>
            { isAlert && 
            <Grid container alignItems="center" justifyContent="center" style={{ minHeight: '11vh' }}>
              <Grid item xs={6}>
                <Alert severity={alertType}>{alertMessage}</Alert>
              </Grid>
            </Grid>
            }


            <Grid container alignItems="center" justifyContent="center" style={{ minHeight: '11vh' }}>
              <Grid item xs={12}>
                <SimpleCard title="Report Filters" >
                    <Box sx={{ minWidth: 120 }}>

                        <Grid container spacing={1}>
                            <Grid item xs={4}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Customer</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        name="offerType"
                                        label="Offer Type"
                                        onChange={handleChangeCategoryType}
                                        >
                                        
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={4}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Select Purchase Type</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        name="offerType"
                                        label="Offer Type"
                                        onChange={handlePurchaseTypeChange}
                                        >
                                        <MenuItem value='normal'>Normal</MenuItem>
                                        <MenuItem value='bundle_offers'>Bundle Offers</MenuItem>
                                        <MenuItem value='couple_offers'>Couple Offers</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={4}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Select Purchase Type</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        name="offerType"
                                        label="Offer Type"
                                        onChange={handlePurchaseTypeChange}
                                        >
                                        <MenuItem value='normal'>Normal</MenuItem>
                                        <MenuItem value='bundle_offers'>Bundle Offers</MenuItem>
                                        <MenuItem value='couple_offers'>Couple Offers</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>

                        <br />      

                        <Grid container spacing={1}>
                        
                            <Grid item xs={4}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Category</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        name="offerType"
                                        label="Offer Type"
                                        onChange={handleChangeCategoryType}
                                        >
                                        <MenuItem value='Appliances'>Appliances</MenuItem>
                                        <MenuItem value='Automotive Parts'>Automotive Parts</MenuItem>
                                        <MenuItem value='Beauty'>Beauty</MenuItem>
                                        <MenuItem value='Cell Phones & Accessories'>Cell Phones & Accessories</MenuItem>
                                        <MenuItem value='Garden'>Garden & Outdoor</MenuItem>
                                        <MenuItem value='Toys & Games'>Toys & Games</MenuItem>
                                        <MenuItem value='Home & Kitchen'>Home & Kitchen</MenuItem>
                                        <MenuItem value='Baby'>Baby</MenuItem>
                                        <MenuItem value='Arts, Crafts & Sewing'>Arts, Crafts & Sewing</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={4}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Product</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        name="offerType"
                                        label="Offer Type"
                                        onChange={handleProductChange}
                                        >
                                        { 
                                            productsList && productsList
                                                .map((product, index) => (
                                            <MenuItem value={product}>{product.productName}</MenuItem>
                                            ))
                                        }
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={4}>
                                <ValidatorForm>
                                    <TextField
                                        type="number"
                                        name="quantity"
                                        label="Quantity"
                                        onChange={handleQuantityChange}
                                    />
                                </ValidatorForm>    
                            </Grid>

                            <Grid item xs={2}>
                                <Button color="primary" variant="contained" size="medium"  onClick={handleAddProductToCart}>
                                    Generate Report
                                </Button>
                            </Grid>

                            <Grid item xs={2}>
                                <Button color="secondary" variant="contained" size="medium"  onClick={handleAddProductToCart}>
                                    Clear Filters
                                </Button>
                            </Grid>
                        </Grid> 
                    
                    </Box>
                </SimpleCard>
              </Grid>
            </Grid>
            
            <br />
            
            <SimpleCard>

                    {/* <TableContainer component={Paper}> */}
                        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell align="right">Unit Price</TableCell>
                                    <TableCell align="right">Quantity</TableCell>
                                    <TableCell align="right">Amount</TableCell>
                                    <TableCell align="right">Total</TableCell>
                                </TableRow>
                            </TableHead>
                        <TableBody>

                            {customerCart && customerCart.map((item, index) => (
                                <TableRow
                                key={item.product.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">{item.product.productName}</TableCell>
                                    <TableCell align="right">{item.product.price}/=</TableCell>
                                    <TableCell align="right">{item.quantity}</TableCell>
                                    <TableCell align="right">{item.quantity} &#215; {item.product.price}</TableCell>
                                    <TableCell align="right">Rs.{item.total}</TableCell>
                                </TableRow>
                            ))}

                        </TableBody>

                        
                    </Table>
                    {/* </TableContainer> */}

            </SimpleCard> 
        </Container>
    );
  };
  
  export default SalesReport;