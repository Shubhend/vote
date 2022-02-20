import React, {Fragment} from "react";
import SimpleReactValidator from 'simple-react-validator';
import {useField} from "formik";
import {ErrorMessage, Form, Formik} from "formik";

const Inputs= (props) =>{

    // const [field,meta] = useField(props.name);

    const formik=props.formik;

    return (
        <Fragment>

            <div className="form-group icon-input mb-1">
                <i className={props.li}></i>
                <div className="form-group icon-input mb-3">

                    <textarea
                        {...props}
                    />


                </div>

                {
                    props.formik ?
                        formik.touched[props.name] && formik.errors[props.name] ? (
                            <div className="error">{formik.errors[props.name]}</div>
                        ) : null
                        : null
                }
            </div>

        </Fragment>

    )
}

export default Inputs;