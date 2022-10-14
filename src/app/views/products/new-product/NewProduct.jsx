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
  
    useEffect(() => {
      ValidatorForm.addValidationRule("isPasswordMatch", (value) => {
        if (value !== state.password) return false;
  
        return true;
      });
      return () => ValidatorForm.removeValidationRule("isPasswordMatch");
    }, [state.password]);
  
    const handleSubmit = async (value) => {
      try {

        const formData = {
            productName : state.productName,
            image : state.image,
            price: state.price,
            catagory: state.category,
            offers :state.offers,
        }

        console.log(formData);

        const response = await ApiIndex.ProductApi.createProduct(formData);
        cleanForm();
      } catch (error) {
        console.log(error);
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
   

  
    const {
      productName,
      image,
      price,
      category,
      offers
    } = state;


    return (
        <Container>
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
                        />
            
                        <Grid container spacing={2}>

                            <Grid item xs={6}>
                              <TextField
                                  type="file"
                                  name="image"
                                  label="image "
                                  value={image || ""}
                                  onChange={handleChange}
                                  validators={["required"]}
                                  errorMessages={["this field is required"]}
                                />
                          
                                <TextField
                                   type="text"
                                   name="price"
                                   label="Enter The Price Of Product"
                                   value={price || ""}
                                   onChange={handleChange}
                                   validators={["required"]}
                                   errorMessages={["this field is required"]}
                                />
                                 
                                </Grid>

                        {/* <RadioGroup
                            row
                            name="gender"
                            sx={{ mb: 2 }}
                            value={gender || ""}
                            onChange={handleChange}
                        >
                                <FormControlLabel
                                value="Male"
                                label="Male"
                                labelPlacement="end"
                                control={<Radio color="secondary" />}
                                />
                
                                <FormControlLabel
                                value="Female"
                                label="Female"
                                labelPlacement="end"
                                control={<Radio color="secondary" />}
                                />
            
                        </RadioGroup> */}
                        </Grid>
                    
            
                        <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                        <Fragment>
                        {/* <AutoComplete
                            options={suggestions}
                            getOptionLabel={(option) => option.label}
                            
                            renderInput={(params) => (
                            <TextField {...params}  name="category"  value={category || ""} 
                            label="Catagory Type" variant="outlined" fullWidth
                            onChange={handleChange}
                             />
                            )}
                        /> */}


                          <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={category || ""}
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

                               {/* <TextField
                                   type="text"
                                   name="offers"
                                   label="Enter The Offers Of Product"
                                   value={offers || ""}
                                   onChange={handleChange}
                                   validators={["required"]}
                                   errorMessages={["this field is required"]}
                      />*/}

                       {/* <AutoComplete
                            options={suggestions2}
                            getOptionLabel={(option) => option.label}
                            renderInput={(value) => (
                            <TextField {...value} label="Offres Type" variant="outlined" fullWidth
                             />
                            )}
                        /> */}
                            


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

            {/* <Snackbar open={openOTPSuccess} autoHideDuration={6000}>
              <Alert severity="success" sx={{ width: "100%" }} variant="filled">
                  OTP sent Successfully!
              </Alert>
            </Snackbar>

            <Snackbar open={openOTPFail} autoHideDuration={6000} >
              <Alert severity="error" sx={{ width: "100%" }} variant="filled">
                  Please Enter OTP
              </Alert>
            </Snackbar> */}
        </Container>
    );
  };
  
  export default NewProduct;