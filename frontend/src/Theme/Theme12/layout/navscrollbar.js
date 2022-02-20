import React from 'react';
import { Link } from 'react-router-dom';
import {useContext} from "react";
import {RoutesContext, UserLogedInContext} from "../../../Context/context";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../../Action/usercontroller";


const Navscrollbar = () =>{


    var userLoggedIn=false;

    const userLogged=useSelector(state => state.user);

    if(userLogged && userLogged.userInfo){
         userLoggedIn=true;
    }

    const {contextdata} = useContext(RoutesContext);
    const routes=contextdata.route;
    const dispatch = useDispatch();
    const logoutHandler =()=>{

      dispatch(logout());

    }

    return (
        <nav className="navigation scroll-bar">
            <div className="container ps-0 pe-0">
                <div className="nav-content">
                    <div className="nav-wrap bg-white bg-transparent-card rounded-xxl shadow-xss pt-3 pb-1 mb-2 mt-2">
                        <div className="nav-caption fw-600 font-xssss text-grey-500"><span>New </span>Feeds</div>
                        <ul className="mb-1 top-content">

                            <li className="logo d-none d-xl-block d-lg-block"></li>


                            {

                                routes.map((key,val)=>{

                                    if(key.position !==1){
                                        return false;
                                    }

                                    if(key.showOnLogin && !userLoggedIn){

                                        return false;
                                    }

                                    if(key.hideOnLogin && userLoggedIn){

                                        return false;
                                    }


                                    if(key.display==false){
                                        return false;
                                    }

                                    return (

                                        <li><Link to={key.path}   className="nav-content-bttn open-font"><i
                                            className={key.icon}></i>

                                            { (key.onClick) ?
                                                (  <span data-t="lll" onClick={  eval(key.onClick)} >{key.name}</span>)
                                                :
                                                (  <span>{key.name}</span>)

                                            }


                                        </Link>
                                        </li>

                                    )

                                })

                            }




                        </ul>
                    </div>


                    <div className="nav-wrap bg-white bg-transparent-card rounded-xxl shadow-xss pt-3 pb-1">
                        <div className="nav-caption fw-600 font-xssss text-grey-500"><span></span> Account</div>
                        <ul className="mb-1">
                            <li className="logo d-none d-xl-block d-lg-block"></li>

                            {

                                routes.map((key,val)=>{

                                    if(key.position !=2){
                                        return false;
                                    }

                                    if(key.showOnLogin && !userLoggedIn){

                                        return false;
                                    }

                                    if(key.display==false){
                                        return false;
                                    }

                                    return (

                                        <li><Link to={key.path}   className="nav-content-bttn open-font"><i
                                            className={key.icon}></i><span onClick={eval(key.onClick)} >{key.name}</span></Link>
                                        </li>

                                    )

                                })

                            }



                        </ul>
                    </div>


                </div>
            </div>
        </nav>


    )


}

export default Navscrollbar;