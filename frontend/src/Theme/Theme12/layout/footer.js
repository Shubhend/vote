import React, {Fragment} from 'react';
import {GLOBALASSETPATH} from "../Globals/variables";
import {Link} from "react-router-dom";



 function Footer(){

    return (
<Fragment>


    <div className="app-footer border-0 shadow-lg bg-primary-gradiant">
        <Link to="/" className="nav-content-bttn nav-center"><i className="feather-home"></i></Link>
        <Link to="/" className="nav-content-bttn"><i className="feather-plus"></i></Link>
        <Link to="/feed" className="nav-content-bttn" data-tab="chats"><i
            className="feather-layout"></i></Link>
        <Link to="/" className="nav-content-bttn"><i className="feather-thumbs-up"></i></Link>
        <Link to="/user/profile" className="nav-content-bttn"><img src={GLOBALASSETPATH+"images/female-profile.png"} alt="user"
                                                                          className="w30 shadow-xss"/></Link>
    </div>

    <div className="app-header-search">
        <form className="search-form">
            <div className="form-group searchbox mb-0 border-0 p-1">
                <input type="text" className="form-control border-0" placeholder="Search..."/>
                    <i className="input-icon">
                        <ion-icon name="search-outline" role="img" className="md hydrated"
                                  aria-label="search outline"></ion-icon>
                    </i>
                    <a href="#" className="ms-1 mt-1 d-inline-block close searchbox-close">
                        <i className="ti-close font-xs"></i>
                    </a>
            </div>
        </form>
    </div>

</Fragment>


    );


}

export default Footer;