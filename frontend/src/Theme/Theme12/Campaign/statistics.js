import React, {Fragment, useEffect, useState,useRef} from "react";
import {useParams} from "react-router-dom";
import {
GetCampaignStaticsData
} from "../../../Action/StatisticsController.js";
import Filters from "../Component/Graph/filter.js";
import LineGraph from "../Component/Graph/line.js";

function Statistics(){


    const [data,setData]=useState({});
    const params = useParams();
    const [filter,setFilter]=useState({});
    const [graphData,setGraphData]=useState({});



    const filterSubmit= async ()=>{
         console.log(filter);
         const data=await GetCampaignStaticsData({campaignId:params.CampaignId,filter:filter});
         setData(data.data);

    }

    const hanbleChange = e =>{
        console.log(e.target);

       filter[e.target.name]=e.target.value
       setFilter(filter);
       console.log(filter);

    }


    const handleData= async (data,variables,variableCount)=>{
        var labelsData = [];
        var valueData= [];
  
        await data.map((val)=>{
  
            labelsData.push(val[variables]);
            valueData.push(val[variableCount]);
        });

        return {labels:labelsData,values:valueData};

    }

    useEffect(async ()=>{

        if(params.CampaignId>0) {
            const data=await GetCampaignStaticsData({campaignId:params.CampaignId});
            setData(data.data);
            var cauuntryData=await handleData(data.CountryRecord,'country','countryCount');

            var cityData=await handleData(data.cityRecord,'city','cityCount');
            var stateData=await handleData(data.stateRecord,'state','staeCount');

            console.log(cauuntryData);

            setGraphData({

                country:cauuntryData,
                city:cityData,
                state:stateData

            });


        }


},[])


    return(

        <Fragment>

        <div className="main-content right-chat-active">

            <div className="middle-sidebar-bottom middle-wrap">
                <div className="middle-sidebar-left" >
                    <div className="row">
                        <div className="col-xl-12  chat-left scroll-bar">
                            <div className="card shadow-xss w-100 d-block d-flex border-0 p-4 mb-3">
                                <div className="card-body d-flex align-items-center p-0">
                                    <h2 className="fw-700 mb-0 mt-0 font-md text-grey-900">Your Campaign Data</h2>
                                </div>
                            </div>



                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="card w-100 border-0 shadow-none p-5 rounded-xxl bg-lightblue2 mb-3">
                                        <div className="row">
                                            <div className="col-lg-6">
                                                <img src="/pub/bg-2.png" alt="image" className="w-100"/>
                                            </div>
                                            <div className="col-lg-6 ps-lg-5">
                                                <h2 className="display1-size d-block mb-2 text-grey-900 fw-700">
                                                   <span className="font-xssss fw-600 text-grey-500 d-block mb-2 ms-1">Welcome back</span>
                                                    Set up your Social website  Sociala</h2>
                                                <p className="font-xssss fw-500 text-grey-500 lh-26">After completing  course you'll be confident to create any subtle to complex animation that will turn any project a professional work.</p>

                                                <a href="#" className="btn w200 border-0 bg-primary-gradiant p-3 text-white fw-600 rounded-3 d-inline-block font-xssss">Analysis</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3 pe-2">
                                    <div className="card w-100 border-0 shadow-none p-4 rounded-xxl mb-3" style={{backgroundColor: '#e5f6ff'}}>
                                        <div className="card-body d-flex p-0">
                                            <i className="btn-round-lg d-inline-block me-3 bg-primary-gradiant feather-home font-md text-white"></i>
                                            <h4 className="text-primary font-xl fw-700">{ data.TotalVotes}<span className="fw-500 mt-0 d-block text-grey-500 font-xssss">Total Votes</span></h4>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3 pe-2 ps-2">
                                    <div className="card w-100 border-0 shadow-none p-4 rounded-xxl mb-3" style={{backgroundColor: "#f6f3ff"}}>
                                        <div className="card-body d-flex p-0">
                                            <i className="btn-round-lg d-inline-block me-3 bg-secondary feather-lock font-md text-white"></i>
                                            <h4 className="text-secondary font-xl fw-700">{data.TodayImpression} <span className="fw-500 mt-0 d-block text-grey-500 font-xssss">Today Impression</span></h4>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3 pe-2 ps-2">
                                    <div className="card w-100 border-0 shadow-none p-4 rounded-xxl mb-3" >
                                        <div className="card-body d-flex p-0">
                                            <i className="btn-round-lg d-inline-block me-3 bg-success feather-command font-md text-white"></i>
                                            <h4 className="text-success font-xl fw-700">{data.TodayClicks} <span className="fw-500 mt-0 d-block text-grey-500 font-xssss">Today Clicks</span></h4>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3 ps-2">
                                    <div className="card w-100 border-0 shadow-none p-4 rounded-xxl mb-3" style={{backgroundColor: "#fff0e9"}}>
                                        <div className="card-body d-flex p-0">
                                            <i className="btn-round-lg d-inline-block me-3 bg-warning feather-shopping-bag font-md text-white"></i>
                                            <h4 className="text-warning font-xl fw-700">{data.TotalImpression}<span className="fw-500 mt-0 d-block text-grey-500 font-xssss">Total Impression</span></h4>
                                        </div>
                                    </div>
                                </div>


                            </div>

                            <div>


                             {


                                data.votedData ?
                                <>
                                  <Filters submit={filterSubmit} change={hanbleChange}/>

                                  <LineGraph type="line" label="Voted User" linedata={data.votedData} />

                                  <div class="row col-sm-12">

                                  <div className="col-sm-4">
                               //   <LineGraph type="pie" label="Voted User"  lables={ graphData ? graphData.country.labels : null} value={graphData? graphData.country.values: null}  linedata={data.votedData} />
                                  </div>

                                  <div className="col-sm-4">
                                //  <LineGraph type="pie" label="Voted User" linedata={data.votedData} />
                                  </div>

                                  <div className="col-sm-4">
                                //  <LineGraph type="pie" label="Voted User" linedata={data.votedData} />
                                  </div>
                                  </div>
                                 
                                </> 
                              

                                : null

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

export default Statistics;