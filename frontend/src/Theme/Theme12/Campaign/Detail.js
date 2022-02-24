import { Fragment, useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { GetCampaignByUniqueId, UpdateTraffic } from "../../../Action/CampaignController.js";
import { useParams } from "react-router-dom";
import { checkimages } from "../Globals/GlobalFunction.js";




function Detail({history}){

     const defaultdata={
         categoryData:{name:'Default'},
         keywords:null,

     }

    const [campaign,setCampaign]=useState(defaultdata);
    const [media,setMedia]=useState([]);



    const params = useParams();
useEffect( async ()=>{

    if(params.campId>0){
    const data=await GetCampaignByUniqueId(params.campId);

   
    setCampaign(data.data);
    setMedia(data.media);


     UpdateTraffic({campaignId:params.campId,impression:1,type:'im'});


    }

},[]);
  

const voteClick = async ()=>{

    
    UpdateTraffic({campaignId:params.campId,clicks:1,type:'cl'});

}

return (
    
<Fragment>

<div class="main-content right-chat-active">
            
            <div class="middle-sidebar-bottom">
                <div class="middle-sidebar-left">
                    <div class="row">
                        <div class="col-xl-12 mt-3">
                            <div class="row">
                                <div class="col-lg-5 offset-lg-1 mb-4">
                                   
                                   
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
                                <div class="col-lg-6 text-left col-md-12 pad-top-lg-200 pad-bottom-lg-100 pad-top-100 pad-bottom-75 ps-md--5">
                                    <h4 class="text-danger font-xssss fw-700 ls-2">Online Voting</h4>
                                    <h2 class="fw-700 text-grey-900 display1-size lh-3 porduct-title display2-md-size"> {campaign.name} </h2>
                                    <div class="star d-block w-100 text-left">
                                        <li  alt="star" class="fa fa-star w15 float-left" style={{color:'yellow'}} ></li>
                                        <li  alt="star" class="fa fa-star w15 float-left" style={{color:'yellow'}} ></li>
                                      
                                        <li  alt="star" class="fa fa-star w15 float-left" style={{color:'yellow'}} ></li>
                            
                                        <li  alt="star" class="fa fa-star w15 float-left" style={{color:'yellow'}} ></li>
                                        <li  alt="star" class="fa fa-star w15 float-left" style={{color:'yellow'}} ></li>
                                      
                                    </div>
                                  
                                    <div class="clearfix"></div>
                                    <p class="font-xsss fw-400 text-grey-500 lh-30 pe-5 mt-3 me-5">
                                    {campaign.title}</p>


                                    <div class="clearfix"></div>
                                    <ul class="product-feature-list mt-5">
                                        <li class="w-50 lh-32 font-xsss text-grey-500 fw-500 float-left"><b class="text-grey-900"> Category : </b></li>
                                        <li class="w-50 lh-32 font-xsss text-grey-500 fw-500 float-left">{campaign.categoryData.name}</li> 
                                        <li class="w-50 lh-32 font-xsss text-grey-500 fw-500 float-left"><b class="text-grey-900">Region : </b></li>
                                        <li class="w-50 lh-32 font-xsss text-grey-500 fw-500 float-left"> { 
                                        campaign.region==0 ? 'Global' : null }
                                       { campaign.region==1 ? campaign.countryData.name : null }
                                       { campaign.region==2 ? campaign.stateData.name : null
                                        } 
                                         { campaign.region==3 ? campaign.cityData.name : null } 
                                        </li>
                                        <li class="w-50 lh-32 font-xsss text-grey-500 fw-500 float-left"><b class="text-grey-900">Tags : </b></li>
                                        <li class="w-50 lh-32 font-xsss text-grey-500 fw-500 float-left">{ campaign.keywords ? JSON.parse(campaign.keywords).map((val)=>{
                                            return (<span> {val.id},</span>)
                                        }): null

                                        
                                        }</li>
                                    </ul>

                                    <div class="clearfix"></div>  

                                            <a href="#" onClick={voteClick} class=" col-sm-10 add-to-cart bg-dark text-white fw-700 ps-lg-5 pe-lg-5 text-uppercase font-xssss float-left border-dark border rounded-3 border-size-md d-inline-block mt-0 p-3 text-center ls-3">Vote Now</a>
                                           
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

export default Detail;