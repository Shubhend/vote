import React, {useContext, useEffect, useState} from 'react';
import {login, register} from "../../../Action/usercontroller";
import {useDispatch, useSelector} from "react-redux";
import Inputs from "../../../Component/Form/inputs";
import Notify from "../../../Helper/notify";
import NotificationContainer from "react-notifications/lib/NotificationContainer";
import SimpleReactValidator from 'simple-react-validator';
import * as yup from 'yup';
import {ErrorMessage, Form, Formik,useFormik} from "formik";
import {LoginApi} from "../../../Component/Comman/loginApi";
import {REGISTERURL} from "../../../Constant/allurls";
import { Link } from 'react-router-dom';
import {RoutesContext} from "../../../Context/context";

let schema = yup.object().shape({
    email: yup.string().email('Email is Required').required('This Field is required'),
    password: yup.string().required('This Field is required')
});


function LoginPage({location,history}){

     const [count,setCount]=useState([0]);

    const formik = useFormik({
        initialValues:{
        email:'',
        password:''
    },
    validationSchema:schema,
    onSubmit:values =>{
        console.log(values);
      dispatch(login(values));

    }

    });

    const dispatch = useDispatch();

    const redirect=location.search ?location.search.split("=")[1] : "/";
    const userLoggedIn=useSelector(state => state.user);
    
    console.log(userLoggedIn);
    useEffect(()=>{
       if(userLoggedIn && userLoggedIn.userInfo){
           setCount(count=> count+1);
           history.push(redirect);
       }

    },[history,userLoggedIn]);
    


    return(
        <div className="main-content right-chat-active">

            <div className="row">


              {/*  <a href="#"
                   className="header-btn d-none d-lg-block "
                   data-bs-toggle="modal" data-bs-target="#Modallogin">Login</a>
                <a href="#"
                   className="header-btn d-none d-lg-block  text-center lh-20 rounded-xl"
                   data-bs-toggle="modal" data-bs-target="#Modalregister">Register</a>
*/}

                <div className="col-xl-2 d-none d-xl-block p-0 vh-100"></div>
                <div className="col-xl-7 align-items-center d-flex  rounded-3 overflow-hidden">
                    <div className="card shadow-none border-0 ms-auto me-auto login-card">
                        <div className="card-body rounded-0 text-left">
                            <h2 className="fw-700 display1-size display2-md-size mb-3">Login into <br/>your account</h2>


                                        <form onSubmit={formik.handleSubmit}>


                                                <Inputs
                                                    li="font-sm ti-email text-grey-500 pe-0"
                                                    type="text"
                                                    name="email"
                                                    className="style2-input ps-5 form-control text-grey-900 font-xsss fw-600"
                                                    placeholder="Your Email Address"
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.email}
                                                    formik={formik}
                                                />


                                                <Inputs
                                                    li="font-sm ti-lock text-grey-500 pe-0"
                                                    type="Password"
                                                    name="password"
                                                    className="style2-input ps-5 form-control text-grey-900 font-xss ls-3"
                                                    placeholder="Password"
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.password}
                                                    formik={formik}
                                                />




                                            <div className="form-check text-left mb-3">
                                                <a href="button"
                                                   className="fw-600 font-xsss text-grey-700 mt-1 float-right">Forgot your
                                                    Password?</a>
                                                <div className="form-group mb-1">
                                                    <button type="submit" className="form-control text-center style2-input text-white fw-600 bg-dark border-0 p-0 " >Login</button>
                                                </div>
                                            </div>



                                        </form>



                            <div className="col-sm-12 p-0 text-left">

                                <h6 className="text-grey-500 font-xsss fw-500 mt-0 mb-0 lh-32">Dont have account <Link
                                    to={REGISTERURL} className="fw-700 ms-1">Register</Link></h6>
                            </div>
                            <LoginApi/>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );

}

export default LoginPage;