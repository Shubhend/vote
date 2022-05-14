import React, {Fragment, useEffect, useState} from "react";
import Inputs from "../../../Component/Form/inputs";
import {useDropzone} from "react-dropzone";
import IconButton from "@material-ui/core/IconButton";
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';

import {Link, useParams} from "react-router-dom";
import {
    GetCampaign,
    GetCampaignById,
    GetMedia,
    RemoveMedia,
    SetFeaturedMedia,
    SetMedia
} from "../../../Action/CampaignController";
import InfoIcon from '@material-ui/icons/Info';
import {ImageList} from "@material-ui/core";
import {RemoveCircle} from "@material-ui/icons";
import CustomAppBar from "../../Global/CustomAppBar";



function Media  ({location,history}){


    const mediaStructure={
        campaignId:'',
        userId:'',
        images:'',
        campaignType:'',
        type:'',
        featured:''
    }

    const [campaignMedia,setcampaignMedia]=useState(null);
    const [count,setCount]=useState(0);


    const params = useParams();

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



    const thumbs = files.map(file => (

        <div  key={file.name}>
            <div >
                <img
                    src={file.preview}
                />
            </div>
        </div>
    ));

    useEffect( () => {

        async function run() {
            if (files.length > 0) {
                const image = await SetMedia(files[0], params.CampaignId);

                const profiledata = await GetMedia(params.CampaignId);
                // let data=  await GetCampaignById(params.CampaignId);
                setcampaignMedia(profiledata);

                // setuserInfo(profiledata);

                // Make sure to revoke the data uris to avoid memory leaks
                files.forEach(file => URL.revokeObjectURL(file.preview));
            }
        }
        run();



    }, [files]);



    useEffect(()=>{


        async function run() {
            if (params.CampaignId > 0) {
                const profiledata = await GetMedia(params.CampaignId);
                // let data=  await GetCampaignById(params.CampaignId);
                setcampaignMedia(profiledata);
            }
        }

        run();

    },[history])

    const remove = async (id)=>{
        const profiledata=await RemoveMedia({mediaId:id,campainId:params.CampaignId});

        const d=await GetMedia(params.CampaignId);
        setcampaignMedia(d);
    }

    const setFeature = async (id)=>{
        const profiledata=await SetFeaturedMedia({mediaId:id,campainId:params.CampaignId});

        const d=await GetMedia(params.CampaignId);
        setcampaignMedia(d);
    }
    return (
        <Fragment>

            <CustomAppBar title="Campaign Media "/>
            <div className="main-content right-chat-active">

                <div className="middle-sidebar-bottom middle-wrap">
                    <div className="middle-sidebar-left" >
                        <div className="row">
                            <div className="col-xl-12  chat-left scroll-bar">

                                <div className="row ps-2 pe-2">

                                    <div className="col-lg-12 mb-3">
                                        <div className="card mt-3 border-0">
                                            <h2 className="fw-700 mb-0 mt-0 font-md text-grey-900">Add Image</h2>
                                            <div className="card-body d-flex justify-content-between align-items-end p-0">
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
                                        <br/>
                                    </div>

                                    <ImageList  cols={3} rowHeight={164}>

                                    {

                                        campaignMedia ?  campaignMedia.map((val)=>{


                                            return (
<>

                                                <ImageListItem  style={{margin:'2px',width:'30%'}} key={val.images}>
                                                    <img
                                                        src={`${val.images}?w=164&h=164&fit=crop&auto=format`}
                                                        srcSet={`${val.images}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                                        alt={"Image"}
                                                        loading="lazy"
                                                        style={{width:'100%'}}
                                                    />
                                                    <ImageListItemBar
                                                        subtitle={<span><a href="#" onClick={()=>{remove(val.id)}} >   Remove</a></span>}
                                                        position="bottom"
                                                    />
                                                    <ImageListItemBar
                                                        position="top"
                                                        subtitle={ val.featured==0 ?
                                                            <a href="#" onClick={()=>{setFeature(val.id)}}>Set Featured</a>
                                                            : null}
                                                    />



                                                </ImageListItem>


    </>
                                            )


                                        }) :null


                                    }

                                    </ImageList>







                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </Fragment>

    )

}

export default Media;