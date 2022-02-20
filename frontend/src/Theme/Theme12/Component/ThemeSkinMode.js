import React, {Fragment} from "react";


const ThemeShinMode=()=>{

    return(
        <Fragment>

            <div className="p-2 text-center ms-3 position-relative dropdown-menu-icon menu-icon cursor-pointer">
                <i className="feather-settings animation-spin d-inline-block font-xl text-current"></i>
                <div className="dropdown-menu-settings switchcolor-wrap">
                    <h4 className="fw-700 font-sm mb-4">Settings</h4>
                    <h6 className="font-xssss text-grey-500 fw-700 mb-3 d-block">Choose Color Theme</h6>
                    <ul>
                        <li>
                            <label className="item-radio item-content">
                                <input type="radio" name="color-radio" value="red" checked=""/><i className="ti-check"></i>
                                <span className="circle-color bg-red" style={{'background': '#ff3b30'}}></span>
                            </label>
                        </li>
                        <li>
                            <label className="item-radio item-content">
                                <input type="radio" name="color-radio" value="green"/><i className="ti-check"></i>
                                <span className="circle-color bg-green" style={{'background': '#4cd964'}}></span>
                            </label>
                        </li>
                        <li>
                            <label className="item-radio item-content">
                                <input type="radio" name="color-radio" value="blue" checked=""/><i className="ti-check"></i>
                                <span className="circle-color bg-blue" style={{'background': '#132977'}}></span>
                            </label>
                        </li>
                        <li>
                            <label className="item-radio item-content">
                                <input type="radio" name="color-radio" value="pink"/><i className="ti-check"></i>
                                <span className="circle-color bg-pink" style={{'background': '#ff2d55'}}></span>
                            </label>
                        </li>
                        <li>
                            <label className="item-radio item-content">
                                <input type="radio" name="color-radio" value="yellow"/><i className="ti-check"></i>
                                <span className="circle-color bg-yellow" style={{'background': '#ffcc00'}}></span>
                            </label>
                        </li>
                        <li>
                            <label className="item-radio item-content">
                                <input type="radio" name="color-radio" value="orange"/><i className="ti-check"></i>
                                <span className="circle-color bg-orange" style={{'background': '#ff9500'}}></span>
                            </label>
                        </li>
                        <li>
                            <label className="item-radio item-content">
                                <input type="radio" name="color-radio" value="gray"/><i className="ti-check"></i>
                                <span className="circle-color bg-gray" style={{'background': '#8e8e93'}}></span>
                            </label>
                        </li>

                        <li>
                            <label className="item-radio item-content">
                                <input type="radio" name="color-radio" value="brown"/><i className="ti-check"></i>
                                <span className="circle-color bg-brown" style={{'background': '#D2691E'}}></span>
                            </label>
                        </li>
                        <li>
                            <label className="item-radio item-content">
                                <input type="radio" name="color-radio" value="darkgreen"/><i className="ti-check"></i>
                                <span className="circle-color bg-darkgreen" style={{'background': '#228B22'}}></span>
                            </label>
                        </li>
                        <li>
                            <label className="item-radio item-content">
                                <input type="radio" name="color-radio" value="deeppink"/><i className="ti-check"></i>
                                <span className="circle-color bg-deeppink" style={{'background': '#FFC0CB'}}></span>
                            </label>
                        </li>
                        <li>
                            <label className="item-radio item-content">
                                <input type="radio" name="color-radio" value="cadetblue"/><i className="ti-check"></i>
                                <span className="circle-color bg-cadetblue" style={{'background': '#5f9ea0'}}></span>
                            </label>
                        </li>

                    </ul>

                    <div className="card bg-transparent-card border-0 d-block mt-3">
                        <h4 className="d-inline font-xssss mont-font fw-700">Header Background</h4>
                        <div className="d-inline float-right mt-1">
                            <label className="toggle toggle-menu-color"><input type="checkbox"/><span
                                className="toggle-icon"></span></label>
                        </div>
                    </div>
                    <div className="card bg-transparent-card border-0 d-block mt-3">
                        <h4 className="d-inline font-xssss mont-font fw-700">Menu Position</h4>
                        <div className="d-inline float-right mt-1">
                            <label className="toggle toggle-menu"><input type="checkbox"/><span
                                className="toggle-icon"></span></label>
                        </div>
                    </div>
                    <div className="card bg-transparent-card border-0 d-block mt-3">
                        <h4 className="d-inline font-xssss mont-font fw-700">Dark Mode</h4>
                        <div className="d-inline float-right mt-1">
                            <label className="toggle toggle-dark"><input type="checkbox"/><span
                                className="toggle-icon"></span></label>
                        </div>
                    </div>

                </div>
            </div>

        </Fragment>

    )


}

export default ThemeShinMode;