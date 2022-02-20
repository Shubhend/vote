import React, {Fragment, useEffect, useState} from "react";
import Inputs from "../../../Component/Form/inputs";
import {useDropzone} from "react-dropzone";
import {useDispatch, useSelector} from "react-redux";
import Select from "../../../Component/Form/select";
import {GetCountry} from "../../../Action/PublicController";
import { GetProfile} from "../../../Helper/userHelper";
import TextArea from "../../../Component/Form/TextArea";
import {UploadProfile, userProfile} from "../../../Action/usercontroller";



 function PofilePage  ({location,history}){

    const userLoggedIn=useSelector(state => state.user);

    const dispatch = useDispatch();
    var userDetail={}
    if(userLoggedIn.userInfo){
         userDetail=userLoggedIn.userInfo;
    }

    const [userInfo,setuserInfo]=useState({});
    const [country,setcountry]=useState(null);
    const [count,setCount]=useState(0);



    useEffect(async()=>{
        if(!userLoggedIn || !userLoggedIn.userInfo){
            history.push("/user/login");
        }

        const data =await GetCountry();
        setcountry(data.data);

        const profiledata=await GetProfile();

        console.log(profiledata);
        setuserInfo(profiledata);


       // console.log(data);
    },[history,userLoggedIn]);




    const [files, setFiles] = useState([]);
    const {getRootProps, getInputProps} = useDropzone({
        maxFiles:1,
        accept: 'image/*',
        onDrop: acceptedFiles => {
            setFiles(acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            })));
        }
    });

    const handleChange= (e) =>{
      let tempuser=  userInfo;
      let name=e.target.name;
        userInfo[name]=e.target.value;
        setuserInfo(userInfo);

        setCount(count+1)

     }

     const submit = (e) =>{

        e.preventDefault();
        dispatch(userProfile(userInfo));

     }


    const thumbs = files.map(file => (

        <div  key={file.name}>
            <div >
                <img
                    src={file.preview}
                />
            </div>
        </div>
    ));

    useEffect(async () => {

        if(files.length >0) {
           await dispatch(UploadProfile(files[0]));

            const profiledata=await GetProfile();

            setuserInfo(profiledata);

            // Make sure to revoke the data uris to avoid memory leaks
            files.forEach(file => URL.revokeObjectURL(file.preview));
        }

    }, [files]);

    return (
<Fragment>

    <div className="main-content right-chat-active">

        <div className="row">

            <div className="middle-sidebar-bottom">
                <div className="middle-sidebar-left">
                    <div className="middle-wrap">
                        <div className=" col-xl-8 col-xxl-9 col-lg-8 card w-100 border-0 bg-white shadow-xs p-0 mb-4">
                            <div className="card-body p-4 w-100 bg-current border-0 d-flex rounded-3">
                                <a href="#" className="d-inline-block mt-2"><i
                                    className="ti-arrow-left font-sm text-white"></i></a>
                                <h4 className="font-xs text-white fw-600 ms-4 mb-0 mt-2">Account Details</h4>
                            </div>
                            <div className="card-body p-lg-5 p-4 w-100 border-0 ">
                                <div className="row justify-content-center">
                                    <div className="col-lg-4 text-center">
                                        <div className="avatar ms-auto me-auto mb-0 mt-2 w100"><img
                                            src={userInfo.image} alt="image" className="shadow-sm rounded-3 w-100"/>
                                        </div>
                                        <h2 className="fw-700 font-sm text-grey-900 mt-3">{userInfo.name}</h2>
                                        <h4 className="text-grey-500 fw-500 mb-3 font-xsss mb-4">{userInfo.email}</h4>
                                    </div>
                                </div>

                                <form>
                                    <div className="row">
                                        <div className="col-lg-6 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss">First Name</label>


                                                <Inputs
                                                    li="font-sm ti-email text-grey-500 pe-0"
                                                    type="text"
                                                    name="name"
                                                    className="form-control"
                                                    placeholder="Your Name"
                                                    value={userInfo.name}
                                                    onChange={handleChange}
                                                />
                                                
                                            </div>
                                        </div>

                                        <div className="col-lg-6 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss">Last Name</label>
                                                <Inputs
                                                    type="text"
                                                    name="lname"
                                                    className="form-control"
                                                    placeholder="Last Name"
                                                    value={userInfo.lname}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-lg-6 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss">Email</label>
                                                <Inputs
                                                    li="font-sm ti-email text-grey-500 pe-0"
                                                    type="text"
                                                    name="email"
                                                    className="form-control"
                                                    placeholder="Your Name"
                                                    value={userInfo.email}
                                                    disabled="disabled"
                                                />
                                            </div>
                                        </div>

                                        <div className="col-lg-6 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss">Phone</label>
                                                <Inputs
                                                    li="font-sm ti-email text-grey-500 pe-0"
                                                    type="text"
                                                    name="phone"
                                                    className="form-control"
                                                    placeholder="Phone"
                                                    value={userInfo.phone}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-lg-12 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss">Country</label>
                                                <Select
                                                    li="font-sm ti-email text-grey-500 pe-0"
                                                    type="text"
                                                    name="country"
                                                    className="form-control"
                                                    placeholder="Your Country"
                                                    value={userInfo.country}
                                                    option={country}
                                                    valueKey="iso2"
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-lg-12 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss">Address</label>
                                                <TextArea
                                                    type="textarea"
                                                    name="address"
                                                    className="form-control mb-0 p-3 h100 bg-greylight lh-16"
                                                    placeholder="Address"
                                                    defaultValue={userInfo.address}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">

                                        <div className="col-lg-6 mb-2">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss"> State</label>
                                                <Inputs
                                                    li="font-sm ti-email text-grey-500 pe-0"
                                                    type="text"
                                                    name="state"
                                                    className="form-control"
                                                    placeholder="State"
                                                    value={userInfo.state}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-lg-6 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss"> City</label>
                                                <Inputs
                                                    li="font-sm ti-email text-grey-500 pe-0"
                                                    type="text"
                                                    name="city"
                                                    className="form-control"
                                                    placeholder="City"
                                                    value={userInfo.city}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-lg-6 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss">Postcode</label>
                                                <Inputs
                                                    li="font-sm ti-email text-grey-500 pe-0"
                                                    type="text"
                                                    name="zipcode"
                                                    className="form-control"
                                                    placeholder="zipcode"
                                                    value={userInfo.zipcode}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-lg-12 mb-3">
                                            <div className="card mt-3 border-0">
                                                <label className="mont-font fw-600 font-xsss">Profile Image</label>
                                                <div
                                                    className="card-body d-flex justify-content-between align-items-end p-0">
                                                    <div className="form-group mb-0 w-100"  {...getRootProps({className: 'dropzone'})}>
                                                        <div  {...getInputProps()} ></div>
                                                            <label htmlFor="file"
                                                                   className="rounded-3 text-center bg-white btn-tertiary js-labelFile p-4 w-100 border-dashed">
                                                                <i className="ti-cloud-down large-icon me-3 d-block"></i>
                                                                <span className="js-fileName">Drag and drop or click to replace</span>
                                                            </label>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-lg-12 mb-3">
                                            <label className="mont-font fw-600 font-xsss">Description</label>

                                            <TextArea
                                                type="textarea"
                                                name="description"
                                                className="form-control mb-0 p-3 h100 bg-greylight lh-16"
                                                placeholder="description"
                                                defaultValue={userInfo.description}
                                                onChange={handleChange}
                                            />

                                        </div>

                                        <div className="col-lg-12">
                                            <button type="button" onClick={submit}
                                               className="bg-current text-center text-white font-xsss fw-600 p-3 w175 rounded-3 d-inline-block">Save</button>
                                        </div>
                                    </div>

                                </form>
                            </div>
                        </div>

                    </div>
                </div>

            </div>



        </div>

    </div>

</Fragment>

    )

}

export default PofilePage;