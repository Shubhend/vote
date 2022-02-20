import React, {Fragment} from "react";
import SimpleReactValidator from 'simple-react-validator';
import {useField} from "formik";
import {ErrorMessage, Form, Formik} from "formik";

const Select= (props) =>{

    // const [field,meta] = useField(props.name);

    const formik=props.formik;
    const option = props.option;
    const valueKey = props.valueKey ? props.valueKey : 'id';

    return (
        <Fragment>

            <div className="form-group icon-input mb-1">
                <div className="form-group icon-input mb-3">

                    <select
                        {...props}
                    >

                        <option value=''>Select</option>
                        {
                           option ? option.map((key,val)=>{
                                return (
                                    <option value={key[valueKey]}>{key.name}</option>
                                )
                            }) :null
                        }


                    </select>


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

export default Select;