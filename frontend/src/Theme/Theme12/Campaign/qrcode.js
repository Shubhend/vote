import React, {Fragment, useEffect, useState,useRef} from "react";

import {UploadProfile, userProfile} from "../../../Action/usercontroller";
import {Link, useParams} from "react-router-dom";
import ReactToPrint from 'react-to-print';


import {
    GetCampaign,
    GetCampaignById,
    GetMedia,
    RemoveMedia,
    SetFeaturedMedia,
    SetMedia
} from "../../../Action/CampaignController";
import { QRCode } from 'react-qrcode-logo';
import {SITEURL} from "../Globals/variables";
import './style.css';



function QrCampaign  ({location,history}){


    const mediaStructure={
        uniqueId:'0',

    }

    const [campaign,setcampaign]=useState(mediaStructure);
    const [count,setCount]=useState(0);


    const params = useParams();



    useEffect(async ()=>{

        //  const data=await GetCampaign();

        // setcampaignList(data);

        if(params.CampaignId>0){

             let data=  await GetCampaignById(params.CampaignId);
            setcampaign(data.campaign[0]);

            setCount(count=>count+1)
            // setTags(JSON.parse(data[0].keywords));

            //   console.log(data[0]);

        }

    },[history])

    const componentRef = useRef();

    return (
        <Fragment>

            <div className="main-content right-chat-active">

                <div className="middle-sidebar-bottom middle-wrap">
                    <div className="middle-sidebar-left" >
                        <div className="row">
                            <div className="col-xl-12  chat-left scroll-bar">
                                <div className="card shadow-xss w-100 d-block d-flex border-0 p-4 mb-3">
                                    <div className="card-body d-flex align-items-center p-0">
                                        <h2 className="fw-700 mb-0 mt-0 font-md text-grey-900">Qr Code</h2>
                                    </div>
                                </div>

                                <div className="row ps-2 pe-2">
                                    <ReactToPrint
                                        trigger={() => <button className="btn btn-primary col-sm-2 text-white">Print this out!</button>}
                                        content={() => componentRef.current}
                                    />

                                    <center ref={componentRef}>


                                        <h2 className="fw-700 mb-0 mt-0 font-md text-grey-900" style={{fontSize:'54px'}}>{campaign.name }</h2>

                                        <QRCode  value={SITEURL+'/'+campaign.uniqueId} />

                                        <br/>

                                        <b style={{fontSize:'47px'}}>Scan <img src="/pub/voteIcon.png" style={{width:"100px"}} />  vote</b>
                                        <br/>
                                        <p style={{fontSize:'25px'}}>

                                            Earn Coupons on voting
                                        </p>

                                        <br/>

                                        <b style={{fontSize:'35px'}}> {SITEURL+'/'+campaign.uniqueId} </b>

                                        <br/>
                                        <br/>
                                        <div class="row" style={{fontSize:'20'}}>
                                           <div> Online Voting  </div><br/>
                                           <p> {campaign.title}</p>
                                        </div>

                                    </center>











                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </Fragment>

    )

}

export default QrCampaign;