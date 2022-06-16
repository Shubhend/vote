import React, { Fragment, useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import {GetCampaignByUniqueId, RawTraffic, UpdateTraffic} from "../../../Action/CampaignController.js";
import { useParams } from "react-router-dom";
import { checkimages } from "../Globals/GlobalFunction.js";
import {useSelector} from "react-redux";
import {vote} from "../../../Action/CampaignController";
import DOMPurify from 'dompurify';
import {decode} from 'html-entities';
import Box from "@material-ui/core/Box";
import {makeStyles} from "@material-ui/core/styles";
import moment from 'moment';
import Container from "@material-ui/core/Container";




const useStyles = makeStyles((theme) => ({
    appBar: {
        backgroundColor: "#fff"
    },
    hero: {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1558981852-426c6c22a060?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80')`,
        height: "300px",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "#fff",
        fontSize: "4rem",
        [theme.breakpoints.down("sm")]: {
            height: 300,
            fontSize: "3em"
        }
    },

}));


function Detail({history}){
    const classes = useStyles();
     const defaultdata={
         categoryData:{name:'Default'},
         keywords:null,

     }

    const [campaign,setCampaign]=useState(defaultdata);
    const [media,setMedia]=useState([]);
    const [votedata,setVotedata]=useState({});



    const params = useParams();
useEffect( async ()=>{

    if(params.campId>0){
    const data=await GetCampaignByUniqueId(params.campId);


    data.data.description=DOMPurify.sanitize( JSON.parse(decode(data.data.description)));
    setCampaign(data.data);
    setMedia(data.media);

     RawTraffic({campaignId:params.campId,count:1, device:navigator.userAgentData.platform});


    UpdateTraffic({campaignId:params.campId,impression:1,type:'im'});



    }


    setVotedata({
        exactLocation:0,
        device:navigator.userAgentData.platform
    })

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
           alert("not support")
        }



},[]);

    function showPosition(position) {

        setVotedata({
            longitude:position.coords.longitude,
            latitude:position.coords.latitude,
            exactLocation:1,
            device:navigator.userAgentData.platform
        })
    }



    const userLogged=useSelector(state => state.user);
    const voteClick = async ()=>{

    
    UpdateTraffic({campaignId:params.campId,clicks:1,type:'cl'});



    if(userLogged && userLogged.userInfo){

       await vote({...votedata,campaignId:params.campId});

    }else{
        alert("Not Loggedin ");
    }



}

return (
    
<Fragment>



    <Box className={classes.hero}>
        <Box>React Blog</Box>
    </Box>

<div className="main-content right-chat-active">



            <div className="middle-sidebar-bottom">
                <div className="middle-sidebar-left">
                    <div className="row">
                        <div className="col-xl-12 mt-3">
                            <div className="row">
                                <div className="col-lg-5 offset-lg-1 mb-4">
                                   
                                   
                        <Carousel>

                            {
                               media ? media.map((val)=>{

                                   return(  <div>
                                      <img src={val.images } />
                              
                                   </div>
                                   )
                                }) : <div>   <img src="pub/voteIcon.png" /> </div> 
                            }
                        

                        </Carousel>



                                </div>
                                {
                                    campaign && campaign.userData && (

                                <div className="col-lg-6 text-left col-md-12 pad-top-lg-200 pad-bottom-lg-100 pad-top-100 pad-bottom-75 ps-md--5">
                                    <h4 className="text-danger font-xssss fw-700 ls-2">Online Voting</h4>
                                    <h2 className="fw-700 text-grey-900 display1-size lh-3 porduct-title display2-md-size"> {campaign.name} </h2>
                                    <div className="star d-block w-100 text-left">
                                        <li  alt="star" className="fa fa-star w15 float-left" style={{color:'yellow'}} ></li>
                                        <li  alt="star" className="fa fa-star w15 float-left" style={{color:'yellow'}} ></li>
                                      
                                        <li  alt="star" className="fa fa-star w15 float-left" style={{color:'yellow'}} ></li>
                            
                                        <li  alt="star" className="fa fa-star w15 float-left" style={{color:'yellow'}} ></li>
                                        <li  alt="star" className="fa fa-star w15 float-left" style={{color:'yellow'}} ></li>
                                      
                                    </div>


                                    <div className="clearfix"></div>
                                    <p className="font-xsss fw-400 text-grey-500 lh-30 pe-5 mt-3 me-5">
                                    {campaign.title}</p>


                                    <div className="clearfix"></div>

                                    <ul className="product-feature-list mt-5">
                                        <li className="w-50 lh-32 font-xsss text-grey-500 fw-500 float-left"><b className="text-grey-900"> Category : </b></li>
                                        <li className="w-50 lh-32 font-xsss text-grey-500 fw-500 float-left">{campaign.categoryData.name}</li> 
                                        <li className="w-50 lh-32 font-xsss text-grey-500 fw-500 float-left"><b className="text-grey-900">Region : </b></li>
                                        <li className="w-50 lh-32 font-xsss text-grey-500 fw-500 float-left"> { 
                                        campaign.region==0 ? 'Global' : null }
                                       { campaign.region==1 ? campaign.countryData.name : null }
                                       { campaign.region==2 ? campaign.stateData.name : null
                                        } 
                                         { campaign.region==3 ? campaign.cityData.name : null } 
                                        </li>
                                        <li className="w-50 lh-32 font-xsss text-grey-500 fw-500 float-left"><b className="text-grey-900">Tags : </b></li>
                                        <li className="w-50 lh-32 font-xsss text-grey-500 fw-500 float-left">{ campaign.keywords ? JSON.parse(campaign.keywords).map((val)=>{
                                            return (<span> {val.id},</span>)
                                        }): null


                                        }</li>

                                        <li className="w-50 lh-32 font-xsss text-grey-500 fw-500 float-left"><b className="text-grey-900"> CreatedOn : </b></li>
                                        <li className="w-50 lh-32 font-xsss text-grey-500 fw-500 float-left">{moment(campaign.createdAt).fromNow()}</li>

                                        <li className="w-50 lh-32 font-xsss text-grey-500 fw-500 float-left"><b className="text-grey-900"> Created By : </b></li>
                                        <li className="w-50 lh-32 font-xsss text-grey-500 fw-500 float-left">{campaign.userData.name}</li>


                                    </ul>

                                    <div className="clearfix"></div>  

                                    <center>

                                        <br/>
                                            <a href="#" onClick={voteClick} className=" col-sm-10 add-to-cart bg-dark text-white fw-700 ps-lg-5 pe-lg-5 text-uppercase font-xssss  border-dark border rounded-3 border-size-md d-inline-block mt-0 p-3 text-center ls-3">Vote Now</a>
                                    </center>

                                </div>

                                    )
                                }
                                    </div>

                            <Container maxWidth="lg" className={classes.blogsContainer}>

                            <div className="row bg-white mt-4 m-3">

                                <h2>Details</h2>
                                <div className="htmlrender col-sm-12" dangerouslySetInnerHTML={{__html: campaign.description }} >

                                </div>


                            </div>

                            </Container>

                        </div>               
                    </div>
                </div>
            </div>
       </div>








</Fragment>
)

}

export default Detail;