import {Grid} from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import Widget from "../../components/Widget";
import Table from "../dashboard/components/Table/Table";
import mock from "../dashboard/mock";
import React, {useEffect, useState} from "react";
import CustomAppBar from "../../Global/CustomAppBar";
import {makeStyles} from "@material-ui/styles";
import {getVotedUser} from "../../../Action/CampaignController";
import {useParams} from "react-router-dom";



const datatableData = [
    ["Joe James", "Example Inc.", "Yonkers", "NY"],
    ["John Walsh", "Example Inc.", "Hartford", "CT"],
    ["Bob Herm", "Example Inc.", "Tampa", "FL"],
    ["James Houston", "Example Inc.", "Dallas", "TX"],
    ["Prabhakar Linwood", "Example Inc.", "Hartford", "CT"],
    ["Kaui Ignace", "Example Inc.", "Yonkers", "NY"],
    ["Esperanza Susanne", "Example Inc.", "Hartford", "CT"],
    ["Christian Birgitte", "Example Inc.", "Tampa", "FL"],
    ["Meral Elias", "Example Inc.", "Hartford", "CT"],
    ["Deep Pau", "Example Inc.", "Yonkers", "NY"],
    ["Sebastiana Hani", "Example Inc.", "Dallas", "TX"],
    ["Marciano Oihana", "Example Inc.", "Yonkers", "NY"],
    ["Brigid Ankur", "Example Inc.", "Dallas", "TX"],
    ["Anna Siranush", "Example Inc.", "Yonkers", "NY"],
    ["Avram Sylva", "Example Inc.", "Hartford", "CT"],
    ["Serafima Babatunde", "Example Inc.", "Tampa", "FL"],
    ["Gaston Festus", "Example Inc.", "Tampa", "FL"],
];

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
    useEffect(()=>{

        async function run() {

            let query={};
            if (params.campId > 0) {
                query={campaignId:params.campId};
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