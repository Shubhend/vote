import React, {useState} from 'react';
import {register} from "../Action/usercontroller";
import {useDispatch,useSelector} from "react-redux";


function Login(){

    const [name,setName]=useState('');
    const [password,setPassword]=useState('');
    const [email,setEmail]=useState('');

    const dispatch = useDispatch();

    const submit=(e) =>{
        e.preventDefault();
        const data=dispatch(register(name,email,password));

        console.log(data);
    }
    return(
        <div class="top-content loginback" >

            <div class="inner-bg">
                <div class="container">

                    <div class="row">

                    </div>

                    <div class="row">
                        <div class="col-sm-5">




                                <div class="">

                                    <form role="form" action="" method="post" class="login-form">

                                            <h3 style={{color:'white'}}>Sign up now</h3>
                                        <div class="form-group">
                                            <label class="sr-only" for="form-username">Username</label>
                                            <input type="text" name="form-username" placeholder="Username..." class="form-username form-control" id="form-username"/>
                                        </div>
                                        <div class="form-group">
                                            <label class="sr-only" for="form-password">Password</label>
                                            <input type="password" name="form-password" placeholder="Password..." class="form-password form-control" id="form-password"/>
                                        </div>
                                        <div className="form-group">
                                        <button type="submit" class="btn">Sign in!</button>
                                        </div>
                                    </form>
                                </div>


                            <div class="social-login" style={{display:'none'}}>
                                <h3>...or login with:</h3>
                                <div class="social-login-buttons">
                                    <a class="btn btn-link-2" href="#">
                                        <i class="fa fa-facebook"></i> Facebook
                                    </a>
                                    <a class="btn btn-link-2" href="#">
                                        <i class="fa fa-twitter"></i> Twitter
                                    </a>
                                    <a class="btn btn-link-2" href="#">
                                        <i class="fa fa-google-plus"></i> Google Plus
                                    </a>
                                </div>
                            </div>

                        </div>

                        <div class="col-sm-1 middle-border"></div>
                        <div class="col-sm-1"></div>

                        <div class="col-sm-5">

                            <div class="form-box">
                                <div class="form-top">
                                    <div class="form-top-left">
                                        <h3>Sign up now</h3>
                                        <p>Fill in the form below to get instant access:</p>
                                    </div>
                                    <div class="form-top-right">
                                        <i class="fa fa-pencil"></i>
                                    </div>
                                </div>
                                <div class="form-bottom">
                                    <form role="form" action="" method="post" class="registration-form">
                                        <div class="form-group">
                                            <label class="sr-only" for="form-first-name">Name</label>
                                            <input type="text" name="form-first-name" onChange={(e)=>setName(e.target.value)} placeholder="First name..." className="form-first-name form-control" id="form-first-name"/>
                                        </div>

                                        <div class="form-group">
                                            <label class="sr-only" for="form-email">Email</label>
                                            <input type="text" name="form-email" onChange={(e)=>setEmail(e.target.value)} placeholder="Email..." class="form-email form-control" id="form-email"/>
                                        </div>
                                        <div class="form-group">
                                            <label class="sr-only" for="form-about-yourself">Password</label>
                                            <input type="password" name="form-email" placeholder="password"
                                                   onChange={(e)=>setPassword(e.target.value)}   className="form-email form-control" id="form-email"/>
                                        </div>
                                        <button type="submit" className="btn" onClick={submit}>Sign me up!</button>
                                    </form>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>

        </div>

    );

}

export default Login;