import React, {Fragment, useEffect, useState} from "react";
import Inputs from "../../../Component/Form/inputs";
import {useDropzone} from "react-dropzone";
import {useDispatch, useSelector} from "react-redux";
import Select from "../../../Component/Form/select";
import {GetCountry} from "../../../Action/PublicController";
import { GetProfile} from "../../../Helper/userHelper";
import TextArea from "../../../Component/Form/TextArea";
import {UploadProfile, userProfile} from "../../../Action/usercontroller";
import {Link} from "react-router-dom";
import DateObject from "react-date-object";
import {GetCampaign} from "../../../Action/CampaignController";
import {ModalBlock} from "../../../Component/Modal/modal";
import {SITEURL} from "../Globals/variables";


function ListCampaign  ({location,history}){



    const [media,setmedia]=useState({});
    const [campaignList,setcampaignList]=useState(null);
    const [count,setCount]=useState(0);


    useEffect(async ()=>{

        const data=await GetCampaign();

        setcampaignList(data.campaign);
        setmedia(data.media);
        setCount(2);
    },[history])



    return (
        <Fragment>

            <div className="main-content right-chat-active">

                <div className="middle-sidebar-bottom middle-wrap">
                    <div className="middle-sidebar-left" >
                        <div className="row">
                            <div className="col-xl-12  chat-left scroll-bar">
                                <div className="card shadow-xss w-100 d-block d-flex border-0 p-4 mb-3">
                                    <div className="card-body d-flex align-items-center p-0">
                                        <h2 className="fw-700 mb-0 mt-0 font-md text-grey-900">Campaign List</h2>
                                        <div className="search-form-2 ms-auto">
                                        <Link to="/campaign/create" className="btn btn-primary">Create New Campaign</Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="row ps-2 pe-2">

                                    {

                                        campaignList ?  campaignList.map((val)=>{

                                            var id=val.id;
                                            var date = new DateObject(val.createdAt);

                                             return (
                                                 <div className="col-lg-3 col-md-6 col-sm-6 mb-3 pe-2 ps-2">
                                                     <div className="card w-100 p-0 hover-card shadow-xss border-0 rounded-3 overflow-hidden me-1">
                                            <Link className="font-xsssss fw-700 ps-3 pe-3 lh-32 text-uppercase rounded-3 ls-2 bg-primary-gradiant d-inline-block text-white position-absolute mt-3 ms-3 z-index-1" to={"/campaign/edit/"+val.id} >Edit</Link>

                                                         <div className="card-image w-100 mb-3">
                                                             <a href="default-hotel-details.html"
                                                                className="position-relative d-block">
                                                                 <img src={media[id]}  alt="image" className="w-100"/></a>
                                                         </div>
                                                         <div className="card-body pt-0">


                                                             <h4 className="fw-700 font-xss mt-0 lh-28 mb-0"><a
                                                                 href="default-hotel-details.html"
                                                                 className="text-dark text-grey-900">{val.name}</a></h4>
                                                             <h6 className="font-xsssss text-grey-500 fw-600 mt-0 mb-2"> {val.title}</h6>

                                                             <div className="clearfix"></div>

                                                             <div className="card-body d-flex ps-0 pe-0 pb-0">
                                                                 <div className="bg-greylight me-3 p-3 border-light-md rounded-xxl theme-dark-bg">
                                                                     <h4 className="fw-700 font-lg ls-3 text-grey-900 mb-0">
                                                                         <span
                                                                             className="ls-3 d-block font-xsss text-grey-500 fw-500">{date.format("MMM")}</span>{date.day}
                                                                     </h4></div>
                                                                 <h2 className="fw-700 lh-3 font-xss">Category 
                                                                     <span
                                                                         className="d-flex font-xssss fw-500 mt-2 lh-3 text-grey-500"> <i
                                                                         className="ti-location-pin me-1"></i> {val.categoryData.name} </span>
                                                                 </h2>
                                                             </div>
                                                             <div className="clearfix"></div>
                                                             <span
                                                                 className="font-lg fw-700 mt-0 pe-3 ls-2 lh-32 d-inline-block text-success float-left">
                                                                 <span className="font-xsssss">
                                                                      <Link to={"/campaign/images/"+val.id} className="btn-round-sm bg-primary-gradiant text-white font-sm " title="images" ><i class="btn-round-sm feather-image"></i></Link>

                                                                     <Link to={"/campaign/qr/"+val.id} className="btn-round-sm bg-primary-gradiant text-white font-sm " title="qr code" style={{marginLeft:'5px'}}><li className="fa-solid fa-qrcode" ></li></Link>

                                                                        <Link to={"/campaign/edit/"+val.id} className="btn-round-sm bg-primary-gradiant text-white font-sm " title="qr code" style={{marginLeft:'5px'}}><li className="fa-solid fa-edit" ></li></Link>

                                                                     <a href={ SITEURL+'/'+val.uniqueId} target="_blank" className="btn-round-sm bg-primary-gradiant text-white font-sm " title="qr code" style={{marginLeft:'5px'}}><li className="fa-solid fa-link" ></li></a>

                                                                     <Link to={"/campaign/statics/"+val.id} className="btn-round-sm bg-primary-gradiant text-white font-sm " title="Graphical Data" style={{marginLeft:'5px'}}><li className="fa-solid fa-bar-chart" ></li></Link>

                                                                 </span>
                                                             </span>


                                                             <a href="#" className="position-absolute bottom-15 mb-2 right-15"><i
                                                                 className="btn-round-sm bg-primary-gradiant text-white font-sm feather-chevron-right"></i></a>

                                                               </div>
                                                     </div>
                                                 </div>


                                             )


                                        }) : null

                                    }




                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </Fragment>

    )

}

export default ListCampaign;