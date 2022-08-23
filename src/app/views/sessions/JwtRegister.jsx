import { useTheme } from '@emotion/react';
import { LoadingButton } from '@mui/lab';
import { Card, Checkbox, Grid, TextField } from '@mui/material';
import { Box, styled } from '@mui/system';
import { Paragraph } from 'app/components/Typography';
import useAuth from 'app/hooks/useAuth';
import { Formik } from 'formik';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import Multiselect from 'multiselect-react-dropdown';

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
  firstname: '',
  lastname: '',
  email: '',
  mobile: '',
  phoneNumber: '',
  address: '',
  emailAddress: '',
  shopName: '',
  username: '',
  password: '',
  // remember: true,
};

// form field validation schema
const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, 'Password must be 6 character length')
    .required('Password is required!'),
  email: Yup.string().email('Invalid Email address').required('Email is required!'),
});

const JwtRegister = () => {
  const theme = useTheme();
  const { register } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = (values) => {
    setLoading(true);

    try {
      console.log(values.firstname);
      console.log(values.shopName);
      register(values.email, values.username, values.password);
      navigate('/');
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
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
                  </center>

                  <h3>Business Owner details</h3>
                  <Grid container>
                    <Grid item sm={6} padding={1}>
                      <TextField
                        fullWidth
                        size="small"
                        type="text"
                        name="firstname"
                        label="First Name"
                        variant="outlined"
                        onBlur={handleBlur}
                        value={values.firstname}
                        onChange={handleChange}
                        helperText={touched.username && errors.username}
                        error={Boolean(errors.username && touched.username)}
                        // formErrors={['This field is required']}
                        sx={{ mb: 3 }}
                      />
                      {/* <p>{formErrors.username}</p> */}
                    </Grid>

                    <Grid item sm={6} padding={1}>
                      <TextField
                        fullWidth
                        size="small"
                        type="text"
                        name="lastname"
                        label="Last Name"
                        variant="outlined"
                        onBlur={handleBlur}
                        value={values.lastname}
                        onChange={handleChange}
                        helperText={touched.username && errors.username}
                        error={Boolean(errors.username && touched.username)}
                        // errorMessages={['This field is required']}
                        sx={{ mb: 3 }}
                      />
                    </Grid>
                  </Grid>

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
                    helperText={touched.username && errors.username}
                    error={Boolean(errors.username && touched.username)}
                    // validators={['required']}
                    // errorMessages={['This field is required']}
                    sx={{ mb: 3 }}
                  />

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
                    helperText={touched.username && errors.username}
                    error={Boolean(errors.username && touched.username)}
                    // errorMessages={['This field is required']}
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    fullWidth
                    size="small"
                    type="text"
                    name="address"
                    label="Shop Address"
                    variant="outlined"
                    onBlur={handleBlur}
                    value={values.address}
                    onChange={handleChange}
                    helperText={touched.username && errors.username}
                    error={Boolean(errors.username && touched.username)}
                    // errorMessages={['This field is required']}
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
                    helperText={touched.username && errors.username}
                    error={Boolean(errors.username && touched.username)}
                    // errorMessages={['This field is required']}
                    sx={{ mb: 3 }}
                  />
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
                    helperText={touched.username && errors.username}
                    error={Boolean(errors.username && touched.username)}
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
                    name="username"
                    label="Username"
                    variant="outlined"
                    onBlur={handleBlur}
                    value={values.username}
                    onChange={handleChange}
                    helperText={touched.username && errors.username}
                    error={Boolean(errors.username && touched.username)}
                    // validators={['required']}
                    // errorMessages={['This field is required']}
                    sx={{ mb: 3 }}
                  />
                  <TextField
                    fullWidth
                    size="small"
                    type="text"
                    name="password"
                    label="Password"
                    variant="outlined"
                    onBlur={handleBlur}
                    value={values.password}
                    onChange={handleChange}
                    helperText={touched.username && errors.username}
                    error={Boolean(errors.username && touched.username)}
                    // validators={['required']}
                    // errorMessages={['This field is required']}
                    sx={{ mb: 3 }}
                  />

                  <TextField
                    fullWidth
                    size="small"
                    type="text"
                    name="emailAddress"
                    label=" Shop Email Address"
                    variant="outlined"
                    onBlur={handleBlur}
                    value={values.emailAddress}
                    onChange={handleChange}
                    helperText={touched.username && errors.username}
                    error={Boolean(errors.username && touched.username)}
                    // errorMessages={['This field is required']}
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
