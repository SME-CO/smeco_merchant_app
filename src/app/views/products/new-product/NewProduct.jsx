import {  SimpleCard } from "app/components";
import { Autocomplete, } from '@mui/material';
import { createFilterOptions } from '@mui/material/Autocomplete';
import React, { Fragment } from 'react';
import {
    Button,
    FormControlLabel,
    Grid,
    Icon,
    Radio,
    RadioGroup,
    styled,
    Snackbar,
    Alert
  } from "@mui/material";
  import Select, { SelectChangeEvent } from '@mui/material/Select';

import { Span } from "app/components/Typography";
import { useEffect, useState } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import ApiIndex from "../../../../api/index";


const TextField = styled(TextValidator)(() => ({
    width: "100%",
    marginBottom: "16px",
}));

const AutoComplete = styled(Autocomplete)(() => ({
  width: 300,
  marginBottom: '16px',
}));

const suggestions = [
  { label: 'Appliances ' },
  { label: 'Automotive Parts & Accessories' },
  { label: 'Beauty & Personal Care' },
  { label: 'Cell Phones & Accessories' },
  { label: 'Garden & Outdoor' },
  { label: 'Sports & Outdoors' },
  { label: 'Toys & Games' },
  { label: 'Baby' },
  { label: 'Home & Kitchen' },
  { label: 'Arts, Crafts & Sewing' },
  
];

const suggestions2 = [
  { label: 'Offers ' },
  { label: 'Disscount' },
  { label: 'Regurds' },  
];

const Container = styled("div")(({ theme }) => ({
    margin: "30px",
    [theme.breakpoints.down("sm")]: { margin: "16px" },
    "& .breadcrumb": {
        marginBottom: "30px",
        [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
    },
}));

const NewProduct = () => {
    const [state, setState] = useState({ date: new Date() });
    //const [isOTPSent, setIsOTPSent] = useState(false);
    // const [openOTPSuccess, setOpenOTPSuccess] = React.useState(false);
    // const [openOTPFail, setOpenOTPFail] = React.useState(false);

    const [file, setFile] = useState();
    const [fileName, setFileName] = useState("");

    const [isAlert, setIsAlert] = React.useState(false);
    const [alertMessage, setAlertMessage] = React.useState('');
    const [alertType, setAlertType] = React.useState('');


    const hideAlert = () => {
      if(isAlert){
        setTimeout(() => {setIsAlert(false)}, 3000);
      }
    }

  
    useEffect(() => {
      hideAlert();
    }, [isAlert]);
  
    const handleSubmit = async (value) => {
      try {

        if(state.productName  && state.price && state.category){

          const formData = {
              productName : state.productName,
              image : state.image,
              price: state.price,
              category: state.category,
              merchantId : parseInt(window.localStorage.getItem('merchant_id')),
          }
          const response = await ApiIndex.ProductApi.createProduct(formData);
          uploadImage(response.data.id)
          setAlertType('success');
          setAlertMessage(`Product, ${state.productName} was added successfully!`);
          setIsAlert(true)
          cleanForm();
        }else{
          setAlertType('error');
          setAlertMessage('Please fill all required fields');
          setIsAlert(true)
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

    
  
    const handleChange = (event) => {
      event.persist();
      setState({ ...state, [event.target.name]: event.target.value });
    };

    const handleChangeCategory = (event) => {
      state.category = event.target.value;
    };

    const cleanForm = () => {
      setState({productName : "", image : "", price : "", category : "", offers : ""});
    }

    const handleChangeFile = (event) => {
      setFile(event.target.files[0]);
      setFileName(event.target.files[0].name);
    }

    const uploadImage = async (productId) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("fileName", fileName);
  
      try {
        const res = await ApiIndex.ProductApi.uploadImage(formData, productId);
        console.log(res);
      } catch (ex) {
        console.log(ex);
      }
    };
   

  
    const {
      productName,
      image,
      price,
      category,
      offers
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
            <SimpleCard title="New Product">
                <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
                    <Grid container spacing={6}>
                        <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                        <TextField
                            type="text"
                            name="productName"
                            label="Product Name"
                            onChange={handleChange}
                            value={productName || ""}
                            validators={["required"]}
                            errorMessages={["This field is required"]}
                        /> <br/>
            
                        <Grid container spacing={2}> 

                            <Grid item xs={6}>
                              <label>Upload Product Image</label>
                              <TextField
                                fullWidth
                                size="small"
                                type="file"
                                variant="outlined"
                      
                                onChange={handleChangeFile}
                                sx={{ mb: 3 }}
                              />
                          
                                <TextField
                                   type="number"
                                   name="price"
                                   label="Enter The Price Of Product"
                                   value={price || ""}
                                   onChange={handleChange}
                                   validators={["required"]}
                                   errorMessages={["this field is required"]}
                                />
                                 
                                </Grid>
                        </Grid>
                    
            
                        <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                        <Fragment>
                          <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    name="category"
                                    label="Category"
                                    onChange={handleChangeCategory}
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
                      </Fragment>

                        
                        </Grid>
                        </Grid>
                      </Grid>
  
                    <Button color="primary" variant="contained" type="submit">
                        <Icon>send</Icon>
                        <Span sx={{ pl: 1, textTransform: "capitalize" }}>Submit</Span>
                    </Button>
                 </ValidatorForm>
            </SimpleCard>
        </Container>
    );
  };
  
  export default NewProduct;