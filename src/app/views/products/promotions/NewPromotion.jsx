import {  SimpleCard } from "app/components";
import {
    Button,
    FormControlLabel,
    Grid,
    Icon,
    Radio,
    RadioGroup,
    styled,
    Snackbar,
    Alert,
    filledInputClasses,
    InputLabel,
    FormControl,
    Box,
    Stack,
    Paper,
    List,
    ListItemAvatar,
    ListItemIcon,
    ListItemText,
    IconButton,
    ListItem,
    Avatar,
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
import { isEmpty } from "lodash";

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

const NewPromotion = () => {
    const [state, setState] = useState({ date: new Date() });
    const [isAlert, setIsAlert] = React.useState(false);
    const [alertMessage, setAlertMessage] = React.useState('');
    const [alertType, setAlertType] = React.useState('');
    const [promotionType, setPromotionType] = React.useState('');
    const [offerType, setOfferType] = React.useState('');
    const [productsList, setProductList] = useState([]);
    const [selectedCategory, setCategory] = useState('');
    const [productBundle, setProductBundle] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
  
    const hideAlert = () => {
      if(isAlert){
        setTimeout(() => {setIsAlert(false)}, 3000);
      }
    }
  
    useEffect(async () => {
      hideAlert();
      await syncProductsByCategory(selectedCategory);
    }, [selectedCategory, productBundle, selectedProduct, isAlert]);

    const handleSubmit = async () => {
      try {
        switch(promotionType){
          case 'offer' : 

            switch(offerType){
              case 'buyGet' :
                console.log(selectedProduct)
                if(selectedProduct!=null && state.buyQuantity != '' && state.getQuantity != ''){
                  console.log(selectedProduct);

                  let formData = {
                    productId : selectedProduct.id,
                    merchantId : parseInt(window.localStorage.getItem('merchant_id')),
                    buyQuantity : state.buyQuantity,
                    getQuantity : state.getQuantity 
                  }

                  console.log(formData)

                  let response = await ApiIndex.OfferApi.createBuyGetOffer(formData);
                  setAlertType('success');
                  setAlertMessage('Buy Get Offer Successfully Created!');
                  setIsAlert(true);
                  setOfferType('');

                }else{
                  setAlertType('error');
                  setAlertMessage('Please fill all required fields');
                  setIsAlert(true);
                }
                break;

                case 'bundle' : {
                    console.log("came")
                    if(state.bundleName != '' && state.bundlePrice != '' ){
                      if(productBundle.length!=0){
                        console.log("came inside")
                        let productIds = productBundle.map(item => item.id);
    
                        let formData = {
                          productIds : productIds,
                          merchantId : parseInt(window.localStorage.getItem('merchant_id')),
                          name : state.bundleName,
                          price : state.bundlePrice 
                        }

                        console.log(formData);
    
                        let response = await ApiIndex.OfferApi.createBundleOffer(formData);
                        setAlertType('success');
                        setAlertMessage('Bundle Offer Successfully Created!');
                        setIsAlert(true);
                        setOfferType('');
                        cleanForm();
                        setProductBundle([]);
    
                      }else{
                        setAlertType('error');
                        setAlertMessage('Please Add products to create a bundle');
                        setIsAlert(true);
                      }
                    }else{
                      setAlertType('error');
                      setAlertMessage('Please fill all required fields');
                      setIsAlert(true);
                    }  
                }

            }
            break;

            
        }
        
        
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

    const handleChangeProduct = (event) => {
      let productId = event.target.value;
      let filtered = productsList.filter((item) => item.id == productId);
      console.log(filtered)
      setSelectedProduct(filtered[0]);
    }
  
    const handleChange = (event) => {
      setState({ ...state, [event.target.name]: event.target.value });
      console.log(event.target.value);
    };

    const handleAddProduct = () => {
      if(selectedProduct != null){
        if(productBundle){
          const productExists = productBundle.filter(product => product.id == selectedProduct.id);
          if(productExists.length==0){
            setProductBundle(current => [...current, selectedProduct]);
          }
        }
      }else{
        setAlertType('error');
        setAlertMessage('Please Select A product to Add');
        setIsAlert(true);
      }
    }

    const handleRemoveProduct = (id) => {
      setProductBundle(productBundle.filter(product => product.id != id))
    }

    const handleBundleProductChange = (event) => {
      let productId = event.target.value;
      let filtered = productsList.filter((item) => item.id == productId);
      console.log(filtered[0])
      setSelectedProduct(filtered[0]);
    }
    

    const handleChangeType = (event) => {
        setPromotionType(event.target.value);
    };

    const handleChangeCategoryType = async(event) => {
      try {
        setCategory(event.target.value);
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
      setState({ discountPercentage : '', bundleName: '', bundlePrice: ''});
    }

    const {
      getQuantity,
      buyQuantity,
      discountPercentage,
      bundlePrice,
      bundleName
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
              <Grid item xs={6}>
                <SimpleCard title="Select Promotion Type" >
                    <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Type</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                name="offerType"
                                label="Offer Type"
                                onChange={handleChangeType}
                                value={promotionType}
                                >
                                <MenuItem value='offer'>Offer</MenuItem>
                                <MenuItem value='discount'>Discount</MenuItem>
                                <MenuItem value='reward'>Reward</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </SimpleCard>
              </Grid>
            </Grid>
            
            <br /><br />
            
            { promotionType=='offer' && <SimpleCard title="Create New Offer">
               
                    <Grid container spacing={6}>
                        <Grid item lg={4} md={4} sm={12} xs={12} sx={{ mt: 2 }}>
                          <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Offer Type</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    name="offerType"
                                    label="Offer Type"
                                    onChange={handleChangeOfferType}
                                    value={offerType}
                                    >
                                    <MenuItem value='buyGet'>Buy Get Offer</MenuItem>
                                    <MenuItem value='bundle'>Bundle Offer</MenuItem>
                                    <MenuItem value='couple'>Couple Offer</MenuItem>
                                </Select>
                            </FormControl>
                          </Box>
 
                        </Grid>
                    </Grid>

                    <br /><br />

                  { offerType=='buyGet' && <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
                    <h5>Buy Get Offer</h5>

                    <Grid container spacing={6}>

                      <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                        <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Categories</InputLabel>
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

                          <br /><br />

                          <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Buy Quantity</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    name="buyQuantity"
                                    onChange={handleChange}
                                    label="Buy Quantity"
                                    >
                                    <MenuItem value={1}>1</MenuItem>
                                    <MenuItem value={2}>2</MenuItem>
                                    <MenuItem value={3}>3</MenuItem>
                                </Select>
                          </FormControl>
                      </Grid>

                      <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                        <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Product</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Offer Type"
                                    onChange={handleChangeProduct}
                                    >

                                    { 
                                      productsList && productsList
                                      .map((product, index) => (
                                      <MenuItem value={product.id}>{product.productName}</MenuItem>
                                      ))
                                    }
                                </Select>
                          </FormControl>

                          <br /><br />

                          <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Get Quantity</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    name="getQuantity"
                                    onChange={handleChange}
                                    label="Get Quantity"
                                    >
                                    <MenuItem value={1}>1</MenuItem>
                                    <MenuItem value={2}>2</MenuItem>
                                    <MenuItem value={3}>3</MenuItem>
                                </Select>
                          </FormControl>
                      </Grid>

                    </Grid>
                    <br /><br />
                    <Button color="primary" variant="contained" type="submit">
                        <Icon>send</Icon>
                        <Span sx={{ pl: 1, textTransform: "capitalize" }}>Submit</Span>
                    </Button>
                 </ValidatorForm> }

                 { offerType=='bundle' && <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
                    <h5>Bundle Offer</h5>

                    <Grid container spacing={6}>
                      <Grid item xs={6}>
                        <TextField
                              type="text"
                              name="bundleName"
                              value={bundleName || ""}
                              label="Bundle Name"
                              onChange={handleChange}
                          />
                        </Grid>
                      </Grid>
      
                    <Grid container spacing={6}>
                      <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                        <br />
                        <FormControl fullWidth>
                              <InputLabel id="demo-simple-select-label">Categories</InputLabel>
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

                          <br /><br />

                          <Grid container spacing={2}>

                            <Grid item xs={9}>
                              <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Product</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        name="offerType"
                                        label="Offer Type"
                                        onChange={handleBundleProductChange}
                                        >
                                        { 
                                          productsList && productsList
                                          .map((product, index) => (
                                          <MenuItem value={product.id}>{product.productName}</MenuItem>
                                          ))
                                        }
                                    </Select>
                              </FormControl>
                            </Grid>

                            <Grid item xs={3}>
                              <Button color="success" variant="contained" size="small"  onClick={handleAddProduct}>
                                  Add Product
                              </Button>
                            </Grid>
                          </Grid>
                      </Grid>

                      <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                        <List sx={{
                            width: '100%',
                            maxWidth: 300,
                            bgcolor: 'background.paper',
                            position: 'relative',
                            alignItems : 'right',
                            overflow: 'auto',
                            float: 'right',
                            maxHeight: 230,
                            '& ul': { padding: 0 },
                          }}>

                            { 
                              productBundle && productBundle
                                .map((product, index) => (
                                  <ListItem
                                  secondaryAction={
                                    <IconButton edge="end" aria-label="delete" onClick={() => handleRemoveProduct(product.id)}>
                                      <DeleteIcon />
                                    </IconButton>
                                  }
                                  >
                                    <ListItemAvatar>
                                      <Avatar>
                                        <ShoppingBasketIcon />
                                      </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                      primary={product.productName}
                                      secondary='Secondary'
                                    />
                                </ListItem>
                              ))
                            }
                        </List>
                      </Grid> 

                    </Grid>
                    <br /><br /><br /><br />

                    <Grid container spacing={4}>
                      <Grid item xs={6}>
                        <TextField
                              type="number"
                              name="bundlePrice"
                              value={bundlePrice || ""}
                              label="Price"
                              onChange={handleChange}
                          />
                        </Grid>
                      </Grid>
                    
                    
                    <br />
                    <Button color="primary" variant="contained" type="submit">
                        <Icon>send</Icon>
                        <Span sx={{ pl: 1, textTransform: "capitalize" }}>Submit</Span>
                    </Button>
                 </ValidatorForm> }

                 { offerType=='couple' && <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
                    <h5>Couple Offer</h5>
                    <Grid container spacing={6}>

                      <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Categories</InputLabel>
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

                          <br /><br />

                          <FormControl fullWidth>
                              <InputLabel id="demo-simple-select-label">Product 1</InputLabel>
                              <Select
                                  labelId="demo-simple-select-label"
                                  id="demo-simple-select"
                                  name="offerType"
                                  label="Offer Type"
                                  onChange={handleChangeCategoryType}
                                  >
                                    {  
                                      productsList && productsList
                                      .map((product, index) => (
                                      <MenuItem value={product.productName}>{product.productName}</MenuItem>
                                      ))
                                    }
                              </Select>
                            </FormControl>
                      </Grid>

                      <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                          <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Categories</InputLabel>
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

                          <br /><br />

                          <FormControl fullWidth>
                              <InputLabel id="demo-simple-select-label">Product 2</InputLabel>
                              <Select
                                  labelId="demo-simple-select-label"
                                  id="demo-simple-select"
                                  name="offerType"
                                  label="Offer Type"
                                  onChange={handleChangeOfferType}
                                  >
                                    { 
                                      productsList && productsList
                                      .map((product, index) => (
                                      <MenuItem value={product.productName}>{product.productName}</MenuItem>
                                      ))
                                    }
                              </Select>
                            </FormControl><br /><br />
                      </Grid>

                    </Grid>
                    <Button color="primary" variant="contained" type="submit">
                        <Icon>send</Icon>
                        <Span sx={{ pl: 1, textTransform: "capitalize" }}>Submit</Span>
                    </Button>
                 </ValidatorForm> }




            </SimpleCard> }


            { promotionType=='discount' && <SimpleCard title="Create Discounts">
                <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
                    <Grid container spacing={6}>
                        <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
    
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Categories</InputLabel>
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

                          <br /><br />

                          <FormControl fullWidth>
                              <InputLabel id="demo-simple-select-label">Product 2</InputLabel>
                              <Select
                                  labelId="demo-simple-select-label"
                                  id="demo-simple-select"
                                  name="offerType"
                                  label="Offer Type"
                                  onChange={handleChangeOfferType}
                                  >
                                  { 
                                    productsList && productsList
                                    .map((product, index) => (
                                    <MenuItem value={product.productName}>{product.productName}</MenuItem>
                                    ))
                                  }
                              </Select>
                            </FormControl><br /><br />

                        </Grid>
            
                        <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                        <TextField
                            type="text"
                            name="discountPercentage"
                            value={discountPercentage || ""}
                            label="Discount Percentage"
                            onChange={handleChange}
                        />

                        {/* <TextField
                            type="text"
                            name="nic"
                            value={nic || ""}
                            label="NIC Number"
                            onChange={handleChange}
                        /> */}
                        </Grid>
                    </Grid>
  
                    <Button color="primary" variant="contained" type="submit">
                        <Icon>send</Icon>
                        <Span sx={{ pl: 1, textTransform: "capitalize" }}>Submit</Span>
                    </Button>
                 </ValidatorForm>
            </SimpleCard> }


            { promotionType=='reward' && <SimpleCard title="Create New Rewards (Monthly)">
                <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
                    <Grid container spacing={6}>
                        <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
    
                          <TextField
                            type="date"
                            name="otp"
                            label="Start Date"
                            onChange={handleChange}
                            validators={["required"]}
                            errorMessages={["this field is required"]}
                          />

                        <TextField
                            type="number"
                            name="otp"
                            label="Reward Eligible Limit"
                            onChange={handleChange}
                            validators={["required"]}
                            errorMessages={["this field is required"]}
                          />
                        </Grid>
            
                        <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                        <TextField
                            type="date"
                            label="End Date"
                            onChange={handleChange}
                        />

                        <TextField
                            type="text"
                            name="reward_amount"
                            label="Reward Amount"
                            onChange={handleChange}
                        />
                        </Grid>
                    </Grid>

                   
  
                    <Button color="primary" variant="contained" type="submit">
                        <Icon>send</Icon>
                        <Span sx={{ pl: 1, textTransform: "capitalize" }}>Submit</Span>
                    </Button>
                 </ValidatorForm>
            </SimpleCard> }



        </Container>
    );
  };
  
  export default NewPromotion;