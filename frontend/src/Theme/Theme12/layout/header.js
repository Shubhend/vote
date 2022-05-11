import React from 'react';
import Nav from './nav';
import {GLOBALASSETPATH} from "../Globals/variables";
import {Link} from "react-router-dom";
import Notification from "../Component/Notification";
import ThemeShinMode from "../Component/ThemeSkinMode";

function Header(){

   return(
      <div>
          <div className="preloader-wrap p-3">
              <div className="box shimmer">
                  <div className="lines">
                      <div className="line s_shimmer"></div>
                      <div className="line s_shimmer"></div>
                      <div className="line s_shimmer"></div>
                      <div className="line s_shimmer"></div>
                  </div>
              </div>
              <div className="box shimmer mb-3">
                  <div className="lines">
                      <div className="line s_shimmer"></div>
                      <div className="line s_shimmer"></div>
                      <div className="line s_shimmer"></div>
                      <div className="line s_shimmer"></div>
                  </div>
              </div>
              <div className="box shimmer">
                  <div className="lines">
                      <div className="line s_shimmer"></div>
                      <div className="line s_shimmer"></div>
                      <div className="line s_shimmer"></div>
                      <div className="line s_shimmer"></div>
                  </div>
              </div>
          </div>

         <div className="nav-header bg-white shadow-xs border-0">
            <div className="nav-top">
               <a href=""><i className="feather-zap text-success display1-size me-2 ms-0"></i><span
                   className="d-inline-block fredoka-font ls-3 fw-600 text-current font-xxl logo-text mb-0">Sociala. </span>
               </a>
               <Link to="/" className="mob-menu ms-auto me-2 chat-active-btn"><i
                   className="feather-home text-grey-900 font-sm btn-round-md bg-greylight"></i></Link>

               <a href="#" className="me-2 menu-search-icon mob-menu"><i
                   className="feather-search text-grey-900 font-sm btn-round-md bg-greylight"></i></a>
               <button className="nav-menu me-0 ms-2"></button>
            </div>


           <div className="ms-auto" >
           <ThemeShinMode/>


           </div>

             <Link to="/user/admin" target="_blank" className="p-0 ms-3 menu-icon"><img src={ GLOBALASSETPATH+'images/profile-4.png'  } alt="user"
                                                                          className="w40 mt--1"/></Link>
         </div>

      </div>





);

}

export default Header;
