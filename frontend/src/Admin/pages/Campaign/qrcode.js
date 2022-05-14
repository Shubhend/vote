import React, {Fragment, useEffect, useRef, useState} from "react";
import {useParams} from "react-router-dom";
import {GetCampaignById} from "../../../Action/CampaignController";
import ReactToPrint from "react-to-print";
import {QRCode} from "react-qrcode-logo";
import {SITEURL} from "../../../Theme/Theme12/Globals/variables";
import CustomAppBar from "../../Global/CustomAppBar";
import {Grid} from "@material-ui/core";


export function QrCode({history,location}){


    const mediaStructure={
        uniqueId:'0',

    }

    const [campaign,setcampaign]=useState(mediaStructure);
    const [count,setCount]=useState(0);


    const params = useParams();



    useEffect( ()=>{

        async function run(){
            if (params.CampaignId > 0) {

                let data = await GetCampaignById(params.CampaignId);
                setcampaign(data.campaign[0]);


            }
        }
        run();

    },[history])

    const componentRef = useRef();

    return (
        <Fragment>

            <CustomAppBar title="Qr code "/>

            <div className="main-content right-chat-active">

                <div className="middle-sidebar-bottom middle-wrap">
                    <div className="middle-sidebar-left" >
                        <div className="row">
                            <div className="col-xl-12  chat-left scroll-bar">



                                <div className="row ps-2 pe-2">
                                    <ReactToPrint style={{float:'right'}}
                                        trigger={() => <button className="btn btn-primary col-sm-2 text-white">Print this out!</button>}
                                        content={() => componentRef.current}
                                    />

                                    <center ref={componentRef}>

                                        <h2 className="fw-700 mb-0 mt-0 font-md text-grey-900" style={{fontSize:'54px'}}>{campaign.name }</h2>

                                        <QRCode  value={SITEURL+'/'+campaign.uniqueId} />

                                        <br/>

                                        <b style={{fontSize:'47px'}}>Scan <img src="/pub/voteIcon.png" style={{width:"100px"}} />  vote</b>

                                        <br/>

                                        <b style={{fontSize:'35px'}}> {SITEURL+'/'+campaign.uniqueId} </b>

                                        <br/>
                                        <br/>
                                        <div className="row" style={{fontSize:'20'}}>
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