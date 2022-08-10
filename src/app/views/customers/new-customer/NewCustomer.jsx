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
    Alert
  } from "@mui/material";
import { Span } from "app/components/Typography";
import { useEffect, useState } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import React from "react";
import ApiIndex from "../../../../api/index";

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
    const [isOTPSent, setIsOTPSent] = useState(false);
    // const [openOTPSuccess, setOpenOTPSuccess] = React.useState(false);
    // const [openOTPFail, setOpenOTPFail] = React.useState(false);
  
    useEffect(() => {
      ValidatorForm.addValidationRule("isPasswordMatch", (value) => {
        if (value !== state.password) return false;
  
        return true;
      });
      return () => ValidatorForm.removeValidationRule("isPasswordMatch");
    }, [state.password]);
  
    const handleSubmit = async () => {
      try {

        const formData = {
            firstName : state.firstName,
            lastName : state.lastName,
            nic: state.nic,
            mobile: state.mobile,
            otp : state.otp
        }

        const response = await ApiIndex.CustomerApi.createCustomer(formData).then(()=>{cleanForm()});
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };

    const handleSendOTP = async () => {
        try {
          const formData = {
              mobile: state.mobile
          }
  
          const response = await ApiIndex.CustomerApi.sendOTP(formData);
          setIsOTPSent(true);
        } catch (error) {
          console.log(error);
        }
      };
  
    const handleChange = (event) => {
      event.persist();
      setState({ ...state, [event.target.name]: event.target.value });
    };

    const cleanForm = () => {
      state.firstName = "";
      state.lastName = "";
      state.nic = "";
      state.mobile = "";
      state.otp = "";
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
  
  export default NewCustomer;