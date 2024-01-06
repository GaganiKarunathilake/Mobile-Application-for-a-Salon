import React, { useEffect } from 'react'
import CustomeInput from '../components/CustomeInput';
import {Link, useNavigate} from "react-router-dom";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {useDispatch, useSelector} from "react-redux";
import {login} from "../features/auth/authSlice";


let schema = Yup.object().shape({
  email: Yup
  .string()
  .email("email should be valid")
  .required("email is Required"),
  password: Yup.string().required("Password is Required"),
});

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
     email: "",
     password: "",
      
    },
    validationSchema: schema,
    onSubmit: values => {
      dispatch(login(values));
      //alert(JSON.stringify(values, null, 2));
    },
  });
  const authState = useSelector((state) => state);
  const { user, isError, isSuccess, isLoading, message } = authState.auth;
    
  useEffect(() => {
    if (isSuccess) {
      navigate("admin");
    } else {
      navigate("");
    }
  }, [user, isError, isSuccess, isLoading]);
  return (
    <div className='appBg'>
    <br />
    <br />
    <br />
    <br />
    <br />

    <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
      <h3 className="text-center">Login</h3>
      <p className="text-center">Loging to your account</p>
      <div className="error text-center">
        {message.message == "Rejected" ? "You are not an Admin" : ""}
      </div>
      <form action="" onSubmit={formik.handleSubmit}>
      <CustomeInput 
      type="text" 
      name= 'email' 
      lable="Email Address" 
      id="email" 
      val = {formik.values.email}
      onCh={formik.handleChange("email")}
      onBlr={formik.handleBlur("email")}
      
      
      />
      <div className="error mt-2">
      {formik.touched.email && formik.errors.email ? (
         <div>{formik.errors.email}</div>
       ) : null}
      </div>
 

      <CustomeInput 
      type="password" 
      name= 'password' 
      lable="Password" 
      id="pass" 
      val = {formik.values.password}
      onCh={formik.handleChange("password")}
      onBlr={formik.handleBlur("password")}
      /><br/>
      <div className="error mt-2">
      {formik.touched.password && formik.errors.password ? (
         <div>{formik.errors.password}</div>
       ) : null}
      </div>
 

      <div className= "mb-3 text-end ">
        <Link to= "forgot-password" className="">Forgot Password?</Link>
      </div>
      <button 
      className="border-0 px-3 py-2 text-white fw-bold w-100 text-center text-decoration-none fs-5"
      style={{"background": "#ed95cc"}}
      type="submit"
      >
        Login
      </button>
      </form>
    </div>
  </div>
  );
};

export default Login;