import React, {Fragment, useEffect, useState} from "react";
import Inputs from "../../../Component/Form/inputs";
import {useDropzone} from "react-dropzone";
import {useDispatch, useSelector} from "react-redux";
import Select from "../../../Component/Form/select";
import {GetCountry} from "../../../Action/PublicController";
import { GetProfile} from "../../../Helper/userHelper";
import TextArea from "../../../Component/Form/TextArea";
import {UploadProfile, userProfile} from "../../../Action/usercontroller";
import {Link, useParams} from "react-router-dom";
import {
    GetCampaign,
    GetCampaignById,
    GetMedia,
    RemoveMedia,
    SetFeaturedMedia,
    SetMedia
} from "../../../Action/CampaignController";



function ImageCampaign  ({location,history}){


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

    useEffect(async () => {

        if(files.length >0) {
            const image=await SetMedia(files[0],params.CampaignId);

            const profiledata=await GetMedia(params.CampaignId);
            // let data=  await GetCampaignById(params.CampaignId);
            setcampaignMedia(profiledata);

           // setuserInfo(profiledata);

            // Make sure to revoke the data uris to avoid memory leaks
            files.forEach(file => URL.revokeObjectURL(file.preview));
        }

    }, [files]);



    useEffect(async ()=>{

      //  const data=await GetCampaign();

       // setcampaignList(data);

        if(params.CampaignId>0){
            const profiledata=await GetMedia(params.CampaignId);
           // let data=  await GetCampaignById(params.CampaignId);
            setcampaignMedia(profiledata);

           // setTags(JSON.parse(data[0].keywords));

         //   console.log(data[0]);

        }

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

            <div className="main-content right-chat-active">

                <div className="middle-sidebar-bottom middle-wrap">
                    <div className="middle-sidebar-left" >
                        <div className="row">
                            <div className="col-xl-12  chat-left scroll-bar">
                                <div className="card shadow-xss w-100 d-block d-flex border-0 p-4 mb-3">
                                    <div className="card-body d-flex align-items-center p-0">
                                        <h2 className="fw-700 mb-0 mt-0 font-md text-grey-900">Campaign Images</h2>
                                    </div>
                                </div>





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



                                    {

                                        campaignMedia ?  campaignMedia.map((val)=>{


                                            return (
                                                <div className="col-lg-6 col-md-6 col-sm-6 mb-3 pe-2 ps-2">
                                                    <div className="card w-100 p-0 hover-card shadow-xss border-0 rounded-3 overflow-hidden me-1">
                                                        <button className="font-xsssss fw-700 ps-3 pe-3 lh-32 text-uppercase rounded-3 ls-2 bg-primary-gradiant d-inline-block text-white position-absolute mt-3 ms-3 z-index-1" onClick={()=>{remove(val.id)}} >Remove</button>
                                                        <div className="card-image w-100 mb-3">
                                                            <img src={val.images} className="w-100"/>
                                                        </div>
                                                        {
                                                            val.featured==0 ?
                                                            <button className="font-xsssss fw-700 ps-3 pe-3 lh-32 text-uppercase rounded-3 ls-2 bg-primary-gradiant d-inline-block text-white position-absolute mt-3 ms-0 z-index-1" style={{right:'12px'}} onClick={()=>{setFeature(val.id)}}>Set Featured</button>
                                                            : null
                                                        }


                                                    </div>
                                                </div>
                                            )


                                            }) :null


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

export default ImageCampaign;