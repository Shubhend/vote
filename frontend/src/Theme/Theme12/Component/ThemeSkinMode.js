import React, {Fragment} from "react";


const ThemeShinMode=()=>{

    return(
        <Fragment>

            <div className="p-2 text-center ms-3 position-relative dropdown-menu-icon menu-icon cursor-pointer">
                <i className="feather-settings animation-spin d-inline-block font-xl text-current"></i>
                <div className="dropdown-menu-settings switchcolor-wrap">
                    <h4 className="fw-700 font-sm mb-4">Settings</h4>
                    <h6 className="font-xssss text-grey-500 fw-700 mb-3 d-block">Choose Color Theme</h6>

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