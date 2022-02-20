import React from 'react';
import { Link } from 'react-router-dom';
import {useContext} from "react";
import {RoutesContext} from "../../../Context/context";




function Nav(){

    const routes = useContext(RoutesContext);

    return (


        <div className="col-xl-10 col-lg-10">
            <div className="menu-wrapper d-flex align-items-center justify-content-end">

                <div className="main-menu d-none d-lg-block">
                    <nav>
                        <ul id="navigation">


                            {

                                routes.map((key,val)=>{


                                  return (
                                      <li className={key.liClassName}><Link to={key.path}>{key.name}</Link></li>

                                  )

                                })

                            }


                        </ul>
                    </nav>
                </div>
            </div>
        </div>


    );

}

export default Nav;