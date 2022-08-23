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
    filledInputClasses
  } from "@mui/material";
import { Span } from "app/components/Typography";
import { useEffect, useState } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import React from "react";
import ApiIndex from "../../../../api/index";
import ContinuousSlider from "app/views/material-kit/slider/ContinuousSlider";

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

const NewCustomer = () => {
    const [state, setState] = useState({ date: new Date() });
    const [openAlert, setOpenAlert] = React.useState(false);
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
    }, [hideAlert]);

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

    const handleSendOTP = async () => {
        try {

          if(!state.mobile){
            setAlertType('error');
            setAlertMessage('Please Enter Customer Mobile number');
            setIsAlert(true);
            return;
          }

          const formData = {
              mobile: state.mobile
          }
  
          const response = await ApiIndex.CustomerApi.sendOTP(formData);
          setAlertType('success');
          setAlertMessage('OTP sent to customer mobile, Please enter OTP');
          setIsAlert(true);
        } catch (error) {
          console.log(error);
          setAlertType('error');
          if(error.code == 400) {
            setAlertMessage(error.message);
          }else if(error.code == 500) {
            setAlertMessage("Sorry, OTP is not sent, Please try again later");
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

    const cleanForm = () => {
      setState({firstName : "", lastName : "", nic : "", mobile : "", otp : ""});
    }

    function handleClose(_, reason) {
      if (reason === "clickaway") {
        return;
      }
      setOpenAlert(false);
    }

  
    const {
      firstName,
      lastName,
      nic,
      mobile,
      otp
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
            
            <SimpleCard title="New Customer">
                <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
                    <Grid container spacing={6}>
                        <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                        <TextField
                            type="text"
                            name="firstName"
                            label="First Name"
                            onChange={handleChange}
                            value={firstName || ""}
                            validators={["required"]}
                            errorMessages={["This field is required"]}
                        />
            
                        <Grid container spacing={2}>

                            <Grid item xs={6}>
                              <TextField
                                  type="number"
                                  name="mobile"
                                  label="Customer Mobile Number"
                                  value={mobile || ""}
                                  onChange={handleChange}
                                  validators={["required"]}
                                  errorMessages={["this field is required"]}
                                />
                            </Grid>

                            <Grid item xs={6}>
                            <Button color="primary" variant="outlined" size="small" onClick={handleSendOTP}>
                                Send OTP to Customer Mobile
                            </Button>
                            </Grid>
                        </Grid>

                        

                                <TextField
                                   type="number"
                                   name="otp"
                                   label="Enter the OTP received by the customer"
                                   value={otp || ""}
                                   onChange={handleChange}
                                   validators={["required"]}
                                   errorMessages={["this field is required"]}
                                />

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
                        <TextField
                            type="text"
                            name="lastName"
                            value={lastName || ""}
                            label="Last Name"
                            onChange={handleChange}
                        />

                        <TextField
                            type="text"
                            name="nic"
                            value={nic || ""}
                            label="NIC Number"
                            onChange={handleChange}
                        />
                        </Grid>
                    </Grid>
  
                    <Button color="primary" variant="contained" type="submit">
                        <Icon>send</Icon>
                        <Span sx={{ pl: 1, textTransform: "capitalize" }}>Submit</Span>
                    </Button>
                 </ValidatorForm>
            </SimpleCard>

            <Snackbar open={openAlert} autoHideDuration={4000}>
              <Alert severity="success" sx={{ width: "100%" }} onClose={handleClose} variant="filled">
                  OTP sent Successfully!
              </Alert>
            </Snackbar>

            <Snackbar open={openAlert} autoHideDuration={4000} >
              <Alert severity="error" sx={{ width: "100%" }} onClose={handleClose} variant="filled">
                  Please Enter OTP
              </Alert>
            </Snackbar>
        </Container>
    );
  };
  
  export default NewCustomer;