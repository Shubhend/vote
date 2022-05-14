import {Box, Button, Grid} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import CustomAppBar from "../../Global/CustomAppBar";
import CampaignBox from "../../Global/CampaignBox";
import {GetCampaign} from "../../../Action/CampaignController";
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import {ShareSocial} from "react-share-social";
import {withRouter} from "react-router-dom";



 function List({history}){
    const [dopen,setOpen]=useState(false);
    const [media,setmedia]=useState({});
    const [campaignList,setcampaignList]=useState(null);
    const [count,setCount]=useState(0);
    const [url,setUrl]=useState(0);

    const handleClose = () => {
        setOpen(false);
    };

    const Share =(val)=>{
        setUrl(val)
        setOpen(true);
    }

    const GetCamp = async () =>{

        const data= await GetCampaign();
        setcampaignList(data.campaign);
        setmedia(data.media);
    };

    useEffect(   ()=>{

      GetCamp();

    },[history])



    return (
        <>

        <Grid container spacing={4}>
            <CustomAppBar title="Campaign List"/>
            <Grid lg={12} md={4} sm={6} xs={12}>

                <Grid container spacing={4}  direction="row"
                      justifyContent="center"
                      alignItems="center">

                    {

                        campaignList && campaignList.map((val,key) => {
                        return ( <CampaignBox data={val} media={media}  share={Share}/> )
                        })


                    }


                </Grid>

            </Grid>
        </Grid>



                    <Dialog onClose={handleClose}   fullWidth={"lg"} aria-labelledby="responsive-dialog-title"  open={dopen}>
                        <DialogTitle>Share to your freinds</DialogTitle>
                        <ShareSocial url ={url}
                                     socialTypes={['facebook','twitter','reddit','linkedin','whatsapp']}/>
                    </Dialog>




        </>
    )


}

export default List;