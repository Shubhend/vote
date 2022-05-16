import {Grid} from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import Widget from "../../components/Widget";
import Table from "../dashboard/components/Table/Table";
import mock from "../dashboard/mock";
import React, {useEffect, useState} from "react";
import CustomAppBar from "../../Global/CustomAppBar";
import {makeStyles} from "@material-ui/styles";
import {getVotedUser,GetCampaign} from "../../../Action/CampaignController";
import {useParams} from "react-router-dom";



const useStyles = makeStyles(theme => ({
    tableOverflow: {
        overflow: 'auto'
    }
}))

export default function VotedUser(props){
    const classes = useStyles();

    const [column,setColumn]=useState([]);
    const [data,setData]=useState([]);
    const params = useParams();
    console.log(props);
    useEffect(()=>{

        async function run() {


            let CampList=await GetCampaign();

console.log(CampList.campaign);

            let cid=[];

            for(let i=0;i<CampList.campaign.length;i++){

                cid.push(CampList.campaign[i].id);

            }
console.log(cid);

            let query={};
            query={ where:{campaignId:cid} };
            if (params.campId > 0) {
                query={ where:{id:[params.campId] } };
            }



            const data = await getVotedUser(query);
            setColumn(data.column);
            setData(data.data);

        }
       run();

        },[]);



    return (

        <>
            <CustomAppBar title="Users List"/>
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <MUIDataTable
                        title="All Voted List"
                        data={data}
                        columns={column}
                    />
                </Grid>
            </Grid>


</>
    )

}