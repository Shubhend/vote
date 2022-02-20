import React, {useState} from 'react';
import {register} from "../../../Action/usercontroller";
import {useDispatch} from "react-redux";
import Inputs from "../../../Component/Form/inputs";
import * as yup from "yup";
import {useFormik} from "formik";
import {LoginApi} from "../../../Component/Comman/loginApi";
import {Link} from "react-router-dom";
import {FORGOTURL} from "../../../Constant/allurls";


let schema = yup.object().shape({
    email: yup.string().email('Email is Invalid').required('This Field is required'),
    name:  yup.string().required('This Field is required'),
    password: yup.string().required('This Field is required')
});


function RegisterPage(){

    const [name,setName]=useState('');
    const [password,setPassword]=useState('');
    const [email,setEmail]=useState('');

    const dispatch = useDispatch();

    const submit=(e) =>{
        e.preventDefault();
        const data=dispatch(register(name,email,password));

        console.log(data);
    }

    const formik = useFormik({
        initialValues:{
            email:'',
            name:'',
            password:''
        },
        validationSchema:schema,
        onSubmit:values =>{
            console.log(values);

            const data=dispatch(register(values));

            console.log(data);


        }

    });

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

                <div className="col-xl-2 d-none d-xl-block p-0 vh-100 bg-image-cover bg-no-repeat"></div>
                <div className="col-xl-7 align-items-center d-flex rounded-3 overflow-hidden">
                    <div className="card shadow-none border-0 ms-auto me-auto login-card">
                        <div className="card-body rounded-0 text-left">
                            <h2 className="fw-700 display1-size display2-md-size mb-3"> Register <br/>your account</h2>
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
                                        type="text"
                                        className="style2-input ps-5 form-control text-grey-900 font-xss ls-3"
                                        placeholder="Name"
                                        name="name"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.name}
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
                                    <Link to={FORGOTURL}>Forgot your
                                        Password?</Link>
                                </div>

                                <div className="col-sm-12 p-0 text-left">
                                    <div className="form-group mb-1">
                                        <button type="submit" className="form-control text-center style2-input text-white fw-600 bg-dark border-0 p-0 " >Register</button>
                                    </div>

                                </div>
                            </form>

<LoginApi/>

                        </div>
                    </div>
                </div>
            </div>

        </div>
    );

}

export default RegisterPage;