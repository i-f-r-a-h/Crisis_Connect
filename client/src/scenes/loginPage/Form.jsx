import {useContext, useState } from "react";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
  InputAdornment
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "state";
import Dropzone from "react-dropzone";
import FlexBetween from "components/FlexBetween";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Link from '@mui/material/Link';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
// import FileBase from "react-file-base64";
import { createTheme, ThemeProvider } from '@mui/material/styles';
const registerSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
  location: yup.string().required("required"),
  occupation: yup.string().required("required"),
  picture: yup.string().required("required"),
});

const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

const initialValuesRegister = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  location: "",
  occupation: "",
  picture: "",
};

const initialValuesLogin = {
  email: "",
  password: "",
};
function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Crisis Connect
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
  const theme = createTheme();

const Form = () => {
  const [pageType, setPageType] = useState("login");
  const [image , setImage] = useState("");
  const [isPasswordVisible , setIsPasswordVisible] = useState(false);
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";

  const register = async (values, onSubmitProps) => {
    // this allows us to send form info with image
    
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }
    if(image){
      const base64 = await convertTobase64(image);
      formData.append("picturePath", base64);
    }
    // formData.append("picturePath", image);
    const savedUserResponse = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/auth/register`,
      {
        method: "POST",
        body: formData,
      }
    );
    const savedUser = await savedUserResponse.json();
    onSubmitProps.resetForm();
    if (savedUser) {
      setPageType("login");
    }
  };

  const convertTobase64 = (file) => {
    return new Promise((resolve, reject)=>{
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    })
  };

  const login = async (values, onSubmitProps) => {
    
      const loggedInResponse = await fetch(`${process.env.REACT_APP_SERVER_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const loggedIn = await loggedInResponse.json();
      onSubmitProps.resetForm();
      if (loggedIn.token) {
        dispatch(
          setLogin({
            user: loggedIn.user,
            token: loggedIn.token,
          })
        );
        navigate("/home");
      }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) await login(values, onSubmitProps);
    if (isRegister) await register(values, onSubmitProps);
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
      validationSchema={isLogin ? loginSchema : registerSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
      
        <Grid container component="main" sx={{ height: '100vh' }} >
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage: 'url(https://source.unsplash.com/1600x900/?nature)',
              backgroundRepeat: 'no-repeat',
              backgroundColor: (t) =>
                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6}  square>
            <Box
    
              sx={{
                mt: 22,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: ' #FFC265' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                  {isRegister
                ? "Register"
                : "Sign In"}
              </Typography>
              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1, display: 'flex', flexDirection: 'column', gap: '1rem', width:'100%' }}>
                {/* REGISTER */}
                    {isRegister && (
              <>
                <TextField
                  label="First Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  name="firstName"
                  error={
                    Boolean(touched.firstName) && Boolean(errors.firstName)
                  }
                  helperText={touched.firstName && errors.firstName}
         sx={{ mt: 3 }}
                />
                <TextField
                  label="Last Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  name="lastName"
                  error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
       
                />
                <TextField
                  label="Location"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.location}
                  name="location"
                  error={Boolean(touched.location) && Boolean(errors.location)}
                  helperText={touched.location && errors.location}
            
                />
                <TextField
                  label="Occupation"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.occupation}
                  name="occupation"
                  error={
                    Boolean(touched.occupation) && Boolean(errors.occupation)
                  }
                  helperText={touched.occupation && errors.occupation}
                     
                />
                <Box
                  gridColumn="span 4"
                  border={`1px solid ${palette.neutral.medium}`}
                  borderRadius="5px"
                  p="1rem"
                >
                  <Dropzone
                    acceptedFiles=".jpg,.jpeg,.png"
                    multiple={false}
                    onDrop={(acceptedFiles) =>{
                      setFieldValue("picture", acceptedFiles[0]);
                      setImage(acceptedFiles[0]);
                    }
                    }
                  >
                    {({ getRootProps, getInputProps }) => (
                      <Box
                        {...getRootProps()}
                        border={`2px dashed ${palette.primary.main}`}
                        p="1rem"
                        sx={{ "&:hover": { cursor: "pointer" } }}
                      >
                        <input {...getInputProps()} />
                        {!values.picture ? (
                          <p>Add Picture Here</p>
                        ) : (
                          <FlexBetween>
                            <Typography>{values.picture.name}</Typography>
                            <EditOutlinedIcon />
                          </FlexBetween>
                        )}
                      </Box>
                    )}
                  </Dropzone>
                  {/* <FileBase type="file" multiple={false} onDone={({base64})=>setImage(base64)} /> */}
                    </Box>
                    
                    <TextField
                      
              label="Email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
 
            />
            
           
            <TextField
              label="Password"
              type={isPasswordVisible ? "text" : "password"}
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name="password"
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
            
              InputProps={{ 
                endAdornment: (
                  <InputAdornment position="end">
                    {isPasswordVisible ? <VisibilityIcon onClick={()=>setIsPasswordVisible(!isPasswordVisible)} sx={{cursor:"pointer"}}/>
                    : <VisibilityOffIcon onClick={()=>setIsPasswordVisible(!isPasswordVisible)} sx={{cursor:"pointer"}}/>}
                  </InputAdornment>
                )
              }}
              />
              </>
            )}

                {/* LOGIN */}
                    {!isRegister && (
                  <>
                
                {/* email */}
              <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  error={Boolean(touched.email) && Boolean(errors.email)}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  helperText={touched.email && errors.email}
            
                />
            
              {/* password */}
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type={isPasswordVisible ? "text" : "password"}
                  id="password"
                  autoComplete="current-password"
                     onBlur={handleBlur}
                onChange={handleChange}
                  value={values.password}
                     error={Boolean(touched.password) && Boolean(errors.password)}
                helperText={touched.password && errors.password}
               InputProps={{ 
                  endAdornment: (
                    <InputAdornment position="end">
                      {isPasswordVisible ? <VisibilityIcon onClick={()=>setIsPasswordVisible(!isPasswordVisible)} sx={{cursor:"pointer"}}/>
                      : <VisibilityOffIcon onClick={()=>setIsPasswordVisible(!isPasswordVisible)} sx={{cursor:"pointer"}}/>}
                    </InputAdornment>
                  )
              }}
                />

</>)}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    m: "2rem 0",
                    p: "1rem",
                    backgroundColor: palette.primary.main,
                    color: palette.background.alt,
                    "&:hover": { color: palette.primary.main },
                   }}
                >
                  {isLogin ? "Sign In" : "Register"}
                </Button>
                <Grid container>
                  {isLogin && (
                    <Grid item xs>
                        <Link href="#" variant="body2">
                        Forgot password?
                        </Link>
                    </Grid>
                  )}
                  <Grid item>
                    <Typography
                      onClick={() => {
                      setPageType(isLogin ? "register" : "login");
                      resetForm();
                      }}
                      sx={{
                      textDecoration: "underline",
                      color: palette.primary.main,
                      "&:hover": {
                      cursor: "pointer",
                      color: palette.primary.light,
                      },
                      }}
                    >
                    {isLogin
                      ? "Don't have an account? Sign Up here."
                      : "Already have an account? Login here."}
                    </Typography>
                  </Grid>
                </Grid>
                <Copyright sx={{ mt: 5 }} />
              </Box>
            </Box>
          </Grid>
        </Grid>
 
      
      
      )}
  
    </Formik>
  );
};

export default Form;