import React from 'react';
import Nav from './nav';

function Header(){

   return(
<div>


   <div id="preloader-active">
      <div class="preloader d-flex align-items-center justify-content-center">
         <div class="preloader-inner position-relative">
            <div class="preloader-circle"></div>
            <div class="preloader-img pere-text">
               <img src="assets/img/logo/loder.png" alt=""/>
            </div>
         </div>
      </div>
   </div>

   <header>

      <div class="header-area header-transparent">
         <div class="main-header ">
            <div class="header-bottom  header-sticky">
               <div class="container-fluid">
                  <div class="row align-items-center">

                     <div class="col-xl-2 col-lg-2">
                        <div class="logo">
                           <a href="index.html"><img src="assets/img/logo/logo.png" alt=""/></a>
                        </div>
                     </div>

                   <Nav/>

                     <div class="col-12">
                        <div class="mobile_menu d-block d-lg-none"></div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>

   </header>


</div>
   );

}

export default Header;
