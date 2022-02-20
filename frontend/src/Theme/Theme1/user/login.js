import {register} from "../../../Action/usercontroller";
import {useDispatch} from "react-redux";


function LoginPage(){

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
        <div className="top-content loginback" >

            <div className="inner-bg">
                <div className="container">

                    <div className="row">

                    </div>

                    <div className="row col-sm-12" style={{marginTop:'10px'}}>
                        <div className="col-sm-6">




                            <div className="">

                                <form role="form" action="" method="post" className="login-formn" style={{'background':'rgb(39 102 152)'}}>

                                    <h3 style={{color:'white'}}>Sign up now</h3>
                                    <div className="form-group">
                                        <label className="sr-only" for="form-username">Username</label>
                                        <input type="text" name="form-username" placeholder="Username..." className="form-username form-control" id="form-username"/>
                                    </div>
                                    <div className="form-group">
                                        <label className="sr-only" for="form-password">Password</label>
                                        <input type="password" name="form-password" placeholder="Password..." className="form-password form-control" id="form-password"/>
                                    </div>
                                    <div className="form-group">
                                        <button type="submit" className="btn">Sign in!</button>
                                    </div>
                                </form>
                            </div>


                            <div className="social-login" style={{display:'none'}}>
                                <h3>...or login with:</h3>
                                <div className="social-login-buttons">
                                    <a className="btn btn-link-2" href="#">
                                        <i className="fa fa-facebook"></i> Facebook
                                    </a>
                                    <a className="btn btn-link-2" href="#">
                                        <i className="fa fa-twitter"></i> Twitter
                                    </a>
                                    <a className="btn btn-link-2" href="#">
                                        <i className="fa fa-google-plus"></i> Google Plus
                                    </a>
                                </div>
                            </div>

                        </div>


                        <div className="col-sm-6">

                            <div className="form-box">
                                <div className="form-top">
                                    <div className="form-top-left">
                                        <h3>Sign up now</h3>
                                        <p>Fill in the form below to get instant access:</p>
                                    </div>
                                    <div className="form-top-right">
                                        <i className="fa fa-pencil"></i>
                                    </div>
                                </div>
                                <div className="form-bottom">
                                    <form role="form" action="" method="post" className="registration-form">
                                        <div className="form-group">
                                            <label className="sr-only" for="form-first-name">Name</label>
                                            <input type="text" name="form-first-name" onChange={(e)=>setName(e.target.value)} placeholder="First name..." className="form-first-name form-control" id="form-first-name"/>
                                        </div>

                                        <div className="form-group">
                                            <label className="sr-only" for="form-email">Email</label>
                                            <input type="text" name="form-email" onChange={(e)=>setEmail(e.target.value)} placeholder="Email..." className="form-email form-control" id="form-email"/>
                                        </div>
                                        <div className="form-group">
                                            <label className="sr-only" for="form-about-yourself">Password</label>
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

export default LoginPage;