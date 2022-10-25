import { useTheme } from '@emotion/react';
import { LoadingButton } from '@mui/lab';
import { Card, Checkbox, Grid, TextField, Alert } from '@mui/material';
import { Box, styled } from '@mui/system';
import { Paragraph } from 'app/components/Typography';
import useAuth from 'app/hooks/useAuth';
import { Formik, validateYupSchema } from 'formik';
import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import Multiselect from 'multiselect-react-dropdown';
import ApiIndex from "../../../api/index";
import React from "react";

const FlexBox = styled(Box)(() => ({ display: 'flex', alignItems: 'center' }));

const JustifyBox = styled(FlexBox)(() => ({ justifyContent: 'center' }));

const ContentBox = styled(JustifyBox)(() => ({
  height: '100%',
  padding: '32px',
  background: 'rgba(0, 0, 0, 0.01)',
}));

const JWTRegister = styled(JustifyBox)(() => ({
  background: '#1A2038',
  minHeight: '100vh !important',
  '& .card': {
    maxWidth: 800,
    minHeight: 400,
    margin: '1rem',
    display: 'flex',
    borderRadius: 12,
    alignItems: 'center',
  },
}));

// inital login credentials
const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  mobile: '',
  phoneNumber: '',
  shopAddress: '',
  shopName: '',
  password: '',
  cpassword: '',
  // remember: true,
};

// form field validation schema
const validationSchema = Yup.object().shape({
  password: Yup.string()
    .required('Password is required!'),
  email: Yup.string().email('Invalid Email address').required('Email is required!'),
  firstName: Yup.string().required('First name is required!'),
  mobile: Yup.string().required('Phone Number is required!'),
  shopName: Yup.string().required('Shop Name is required!'),
  shopAddress: Yup.string().required('Shop Address is required!'),
  cpassword: Yup.string().required('Confirm Password is required!'),
});

const JwtRegister = () => {
  const theme = useTheme();
  const { register } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isAlert, setIsAlert] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState('');
  const [alertType, setAlertType] = React.useState('');

  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");


  const hideAlert = () => {
    if(isAlert){
      setTimeout(() => {setIsAlert(false)}, 6000);
    }
  }

  useEffect(() => {
    hideAlert();
  }, [hideAlert]);

  const handleFormSubmit = async (values) => {
    setLoading(true);
    console.log(values);

    if(fileName == ''){
      setAlertType('error');
      setAlertMessage('Please Upload Cover Image');
      setIsAlert(true);
      setLoading(false);
      return;
    }

    if(values.cpassword != values.password){
      setAlertType('error');
      setAlertMessage('Confirm Password Mismatch');
      setIsAlert(true);
      setLoading(false);
      return;
    }

    try {
      const formData = {
        firstName: values.firstName,
        lastName: values.lastName,
        shopName: values.shopName,
        email: values.email,
        phoneNumber: values.mobile,
        shopMobile: values.phoneNumber,
        shopAddress: values.shopAddress,
        shopName: values.shopName,
        password: values.password,
      }

      const response = await ApiIndex.MerchantApi.createMerchant(formData);
      uploadFile(response.data.id);
      setLoading(false);
      navigate('/session/signin');
    } catch (error) {
      console.log(error);
      setAlertType('error');
      if(error.code == 400) {
        setAlertMessage(error.message);
      }else if(error.code == 500) {
        setAlertMessage("Sorry, something went wrong, Please try again later");
      }else{
        console.log("came");
        setAlertMessage("Sorry, server not connected, Please try again later");
      }

      setIsAlert(true);
      setLoading(false);
    }
  };

  const handleChangeFile = (event) => {
    setFile(event.target.files[0]);
    setFileName(event.target.files[0].name);
  }

  const uploadFile = async (merchantId) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", fileName);

    try {
      const res = await ApiIndex.MerchantApi.uploadCover(formData, merchantId);
      console.log(res);
    } catch (ex) {
      console.log(ex);
    }
  };

  return (
    <JWTRegister>
      <Card className="card">
        <Grid container>
          <Box p={8} height="100%">
            <Formik
              onSubmit={handleFormSubmit}
              initialValues={initialValues}
              validationSchema={validationSchema}
            >
              {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                  <center>
                    <h2>Merchant Register</h2>
                    <ContentBox>
                      <img
                        width="40%"
                        alt="Register"
                        src="/assets/images/illustrations/posting_photo.svg"
                      />
                    </ContentBox>
                    { isAlert && 
                      <Grid container alignItems="center" justifyContent="center" style={{ minHeight: '11vh' }}>
                        <Grid item xs={8}>
                          <Alert severity={alertType}>{alertMessage}</Alert>
                        </Grid>
                      </Grid>
                    }
                  </center>


                  <h3>Business Owner details</h3>
                  <Grid container>
                    <Grid item sm={6} padding={1}>
                      <TextField
                        fullWidth
                        size="small"
                        type="text"
                        name="firstName"
                        label="First Name"
                        variant="outlined"
                        onBlur={handleBlur}
                        value={values.firstName}
                        onChange={handleChange}
                        helperText={touched.firstName && errors.firstName}
                        error={Boolean(errors.firstName && touched.firstName)}
                        sx={{ mb: 3 }}
                      />
                    </Grid>

                    <Grid item sm={6} padding={1}>
                      <TextField
                        fullWidth
                        size="small"
                        type="text"
                        name="lastName"
                        label="Last Name"
                        variant="outlined"
                        onBlur={handleBlur}
                        value={values.lastName}
                        onChange={handleChange}
                        sx={{ mb: 3 }}
                      />
                    </Grid>
                  </Grid>

                  <Grid item sm={6} padding={1}>
                    <TextField
                      fullWidth
                      size="small"
                      type="number"
                      name="mobile"
                      label="Phone number"
                      variant="outlined"
                      onBlur={handleBlur}
                      value={values.mobile}
                      onChange={handleChange}
                      helperText={touched.mobile && errors.mobile}
                      error={Boolean(errors.mobile && touched.mobile)}
                      sx={{ mb: 3 }}
                    />
                  </Grid>

                  <h3>Business Details</h3>
                  <TextField
                    fullWidth
                    size="small"
                    name="shopName"
                    type="text"
                    label="Shop Name"
                    variant="outlined"
                    onBlur={handleBlur}
                    value={values.shopName}
                    onChange={handleChange}
                    helperText={touched.shopName && errors.shopName}
                    error={Boolean(errors.shopName && touched.shopName)}
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    fullWidth
                    size="small"
                    type="text"
                    name="shopAddress"
                    label="Shop Address"
                    variant="outlined"
                    onBlur={handleBlur}
                    value={values.shopAddress}
                    onChange={handleChange}
                    helperText={touched.shopAddress && errors.shopAddress}
                    error={Boolean(errors.shopAddress && touched.shopAddress)}
                    sx={{ mb: 3 }}
                  />

                  <TextField
                    fullWidth
                    size="small"
                    type="number"
                    name="phoneNumber"
                    label=" Shop Phone Number"
                    variant="outlined"
                    onBlur={handleBlur}
                    value={values.phoneNumber}
                    onChange={handleChange}
                    sx={{ mb: 3 }}
                  />

                  <label onBlur={handleBlur}>Upload a cover image of the Business</label>
                  <TextField
                    fullWidth
                    size="small"
                    type="file"
                    variant="outlined"
                    onBlur={handleBlur}
                    onChange={handleChangeFile}
                    sx={{ mb: 3 }}
                  />

                  <label onBlur={handleBlur}>Busniess Category</label>
                  <Multiselect
                    displayValue="key"
                    onKeyPressFn={function noRefCheck() {}}
                    onRemove={function noRefCheck() {}}
                    onSearch={function noRefCheck() {}}
                    onSelect={function noRefCheck() {}}
                    errorMessages={['This field is required']}
                    options={[
                      {
                        cat: 'Group 1',
                        key: 'Appliances',
                      },
                      {
                        cat: 'Group 1',
                        key: 'Automotive parts & Accessories',
                      },
                      {
                        cat: 'Group 1',
                        key: 'Beauty & personal care',
                      },
                      {
                        cat: 'Group 2',
                        key: 'Celephones & Accessories',
                      },
                      {
                        cat: 'Group 2',
                        key: 'Electronics',
                      },
                      {
                        cat: 'Group 2',
                        key: 'Garden & outdoor',
                      },
                      {
                        cat: 'Group 2',
                        key: 'Sports & outdoors',
                      },
                      {
                        cat: 'Group 2',
                        key: 'Toys & games',
                      },
                      {
                        cat: 'Group 2',
                        key: 'Home & Kitchen',
                      },
                      {
                        cat: 'Group 2',
                        key: 'Arts,crafts & Sewing',
                      },
                      {
                        cat: 'Group 2',
                        key: 'Other',
                      },
                    ]}
                  />
                  <h3>Account Details</h3>
                  <TextField
                    fullWidth
                    size="small"
                    type="text"
                    name="email"
                    label="Email"
                    variant="outlined"
                    onBlur={handleBlur}
                    value={values.email}
                    onChange={handleChange}
                    helperText={touched.email && errors.email}
                    error={Boolean(errors.email && touched.email)}
                    sx={{ mb: 3 }}
                  />

                  <TextField
                    fullWidth
                    size="small"
                    type="password"
                    name="password"
                    label="Password"
                    variant="outlined"
                    onBlur={handleBlur}
                    value={values.password}
                    onChange={handleChange}
                    helperText={touched.password && errors.password}
                    error={Boolean(errors.password && touched.password)}
                    sx={{ mb: 3 }}
                  />

                  <TextField
                    fullWidth
                    size="small"
                    type="password"
                    name="cpassword"
                    label="Confirm Password"
                    variant="outlined"
                    onBlur={handleBlur}
                    value={values.cpassword}
                    onChange={handleChange}
                    helperText={touched.cpassword && errors.cpassword}
                    error={Boolean(errors.cpassword && touched.cpassword)}
                    sx={{ mb: 3 }}
                  />


                  <center>
                    <LoadingButton
                      type="submit"
                      color="primary"
                      loading={loading}
                      variant="contained"
                      sx={{ mb: 2, mt: 3 }}
                    >
                      Register
                    </LoadingButton>

                    <Paragraph>
                      Already have an account?
                      <NavLink
                        to="/session/signin"
                        style={{ color: theme.palette.primary.main, marginLeft: 5 }}
                      >
                        Login
                      </NavLink>
                    </Paragraph>
                  </center>
                </form>
              )}
            </Formik>
          </Box>
        </Grid>
      </Card>
    </JWTRegister>
  );
};

export default JwtRegister;
