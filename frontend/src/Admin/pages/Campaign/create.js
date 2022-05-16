import React, {Fragment, useEffect, useRef, useState,useCallback} from "react";
import Inputs from "../../../Component/Form/inputs";
import {useDropzone} from "react-dropzone";
import {useDispatch, useSelector} from "react-redux";
import Select from "../../../Component/Form/select";
import {GetCategory, GetCity, GetCountry, GetState} from "../../../Action/PublicController";
import { GetProfile} from "../../../Helper/userHelper";
import TextArea from "../../../Component/Form/TextArea";
import {UploadProfile, userProfile} from "../../../Action/usercontroller";
import {Link, useParams} from "react-router-dom";
import ReactQuill from 'react-quill'; // ES6
import { useHistory } from "react-router-dom";
import ReactTags from 'react-tag-autocomplete'
import {CreateNewCampaign, GetCampaignById} from "../../../Action/CampaignController";
import {decode} from 'html-entities';
import LZString from 'lz-string/libs/lz-string'
import parse from 'html-react-parser'
require('react-quill/dist/quill.snow.css'); // CommonJS




function CampaignPage  ({location,history}){


    const campaignStructure = {

        description:''
    }
    const [tags, setTags] = useState([]);

    const [campaign,setcampaign]=useState(campaignStructure);
    const [country,setcountry]=useState(null);
    const [state,setState]=useState(null);
    const [city,setCity]=useState(null);
    const [count,setCount]=useState(0);
    const [category,setCategory]=useState([]);
    const [campaignLocation,setCampaignLocation]= useState([
        {
            id: 0,
            name: "Global"
        },
        {
            id: 1,
            name: "Selected Country"
        },
        {
            id: 2,
            name: "Selected state"
        },
        {
            id: 3,
            name: "Selected City"
        }
    ])


    const reactTags = useRef()

    const onDelete = useCallback((tagIndex) => {
        setTags(tags.filter((_, i) => i !== tagIndex))
        campaign['keywords']=tags.filter((_, i) => i !== tagIndex);
        setcampaign(campaign);

    }, [tags])

    const onAddition = (newTag) => {
        newTag['id']=newTag['name'];
        setTags([...tags, newTag])
        campaign['keywords']=[...tags, newTag];

        setcampaign(campaign);

    }

    const params = useParams();
    useEffect( ()=>{

        async function run() {
            const data = await GetCategory();
            setCategory(data.data);

            const countrydata = await GetCountry();
            setcountry(countrydata.data);
        }
        run();


        // setCount(count => count+1);
    },[])

    useEffect( ()=>{

        async function run() {
            if (params.campId > 0) {
                let data = await GetCampaignById(params.campId);
                data = data.campaign;
                data[0].description = JSON.parse(decode(data[0].description));


                setcampaign(data[0]);

                if (data[0].keywords && data[0].keywords.length > 10)
                    setTags(JSON.parse(data[0].keywords));

                getState(data[0].country)
                getCity(data[0].country, data[0].state)

                console.log(data[0]);

            }
        }
        run();

    },[country]);

    console.log('home re-rending')


    const getState= async(val) =>{

        const countrydata =await GetState(val);
        setState(countrydata.data);

    }

    const getCity= async(cid,sid) =>{


        const countrydata =await GetCity(cid,sid);
        setCity(countrydata.data);

    }

    const handleDescription=(value)=>{
        campaign['description']=value;

        setcampaign(campaign);
    }
    const handleChange= (e) =>{
        console.log("change"+e.target.name);
        let tempdata=  campaign;
        let name=e.target.name;
        tempdata[name]=e.target.value;
        setcampaign(tempdata);
        if(name=='country'){
            getState(e.target.value);
        }
        if(name=='state'){
            getCity(tempdata.country,e.target.value);
        }

        setCount(count+1)


    }
    const history1 = useHistory();
    const submit= async (e)=>{
        e.preventDefault();



        campaign['description']= JSON.stringify(campaign.description);
        campaign['keywords']=tags;
        const data= await CreateNewCampaign(campaign);

        history1.push("/admin/campaign/media/"+data.id);

    }


    let labelStyle={
        float:'left'
    }

    CampaignPage.modules = {
        toolbar: [
            [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
            [{size: []}],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{'list': 'ordered'}, {'list': 'bullet'},
                {'indent': '-1'}, {'indent': '+1'}],
            ['link', 'image', 'video'],
            ['clean']
        ],
        clipboard: {
            // toggle to add extra line breaks when pasting HTML:
            matchVisual: false,
        }
    }
    /*
     * Quill editor formats
     * See https://quilljs.com/docs/formats/
     */
    CampaignPage.formats = [
        'header', 'font', 'size',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image', 'video'
    ]

    return (


        <Fragment>


            <div className="">

                <div className="middle-sidebar-bottom middle-wrap">
                    <div className="middle-sidebar-left" >
                        <div className="row">
                            <div className="col-xl-12">
                                <div className="card shadow-xss w-100 d-block bg-current d-flex border-0 p-4 mb-2">
                                    <div className="card-body d-flex align-items-center p-0">
                                        <h2 className="fw-700 mb-0 mt-0 font-md text-grey-900"> Campaign</h2>
                                    </div>
                                </div>
                                <div className="row ps-2 pe-2 card-body p-lg-5 p-4 w-100 border-0 ">

                                    <form onSubmit={submit}>



                                        <div className="col-lg-12">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss" style={labelStyle}>Campaign Name</label>


                                                <Inputs
                                                    type="text"
                                                    name="name"
                                                    className="form-control"
                                                    placeholder="Your Name"
                                                    value={campaign.name}
                                                    required="true"
                                                    onChange={handleChange}
                                                />

                                            </div>
                                        </div>

                                        <div className="col-lg-12">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss" style={labelStyle}>Campaign Title</label>


                                                <Inputs
                                                    type="text"
                                                    name="title"
                                                    className="form-control"
                                                    placeholder="Perfect Title"
                                                    value={campaign.title}
                                                    required="true"
                                                    onChange={handleChange}
                                                />

                                            </div>
                                        </div>
                                        <div className="col-lg-12 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss" style={labelStyle}>Category</label>
                                                <Select
                                                    li="font-sm ti-email text-grey-500 pe-0"
                                                    name="category"
                                                    className="form-control"
                                                    placeholder="Select Category"
                                                    required="true"
                                                    value={campaign.category}
                                                    option={category}
                                                    valueKey="id"
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-lg-12 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss" style={labelStyle}>Country</label>
                                                <Select
                                                    li="font-sm ti-email text-grey-500 pe-0"
                                                    name="country"
                                                    className="form-control"
                                                    placeholder="Select Country"
                                                    required="true"
                                                    value={campaign.country}
                                                    option={country}
                                                    valueKey="id"
                                                    onChange={handleChange}

                                                />
                                            </div>
                                        </div>

                                        <div className="col-lg-12 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss" style={labelStyle}>State</label>
                                                <Select
                                                    li="font-sm ti-email text-grey-500 pe-0"
                                                    name="state"
                                                    className="form-control"
                                                    placeholder="Select State"
                                                    required="true"
                                                    value={campaign.state}
                                                    option={state}
                                                    valueKey="id"
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-lg-12 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss" style={labelStyle}>Address ( Complete Address for future Verification )</label>
                                                <TextArea
                                                    name="address"
                                                    className="form-control"
                                                    placeholder="Address "
                                                    required="true"
                                                    value={campaign.address}
                                                    onChange={handleChange}
                                                    height="50px"
                                                />
                                            </div>
                                        </div>




                                        <div className="col-lg-12 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss" style={labelStyle}>City</label>
                                                <Select
                                                    li="font-sm ti-email text-grey-500 pe-0"
                                                    name="city"
                                                    className="form-control"
                                                    placeholder="Select City"
                                                    required="true"
                                                    value={campaign.city}
                                                    option={city}
                                                    valueKey="id"
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-lg-12 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss" style={labelStyle}>Campaign Region</label>
                                                <Select
                                                    li="font-sm ti-email text-grey-500 pe-0"
                                                    name="region"
                                                    className="form-control"
                                                    placeholder="Select Campaign Region"
                                                    required="true"
                                                    value={campaign.region}
                                                    option={campaignLocation}

                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>


                                        <div className="col-lg-12 mb-3">
                                            <label className="mont-font fw-600 font-xsss"  style={labelStyle}>Keywords</label>

                                            <br/>
                                            <div className="form-group">
                                                <ReactTags
                                                    className="form-control"
                                                    ref={reactTags}
                                                    tags={tags}
                                                    allowNew
                                                    onDelete={onDelete}
                                                    delimiters={['Enter', 'Tab']}
                                                    onAddition={onAddition}
                                                />
                                            </div>
                                        </div>


                                        <div className="col-lg-12 mb-3">
                                            <label className="mont-font fw-600 font-xsss" style={labelStyle}>Description </label>

                                            <br/>
                                            <div className="form-group">

                                                <ReactQuill style={{width:'100%',height:'500px','background':'white'}}
                                                            theme="snow"
                                                            name="description"
                                                            modules={CampaignPage.modules}
                                                            formats={CampaignPage.formats}
                                                            onChange={handleDescription}
                                                            value={campaign['description']}

                                                />


                                            </div>
                                        </div>

                                        <br/>
                                        <br/>
                                        <div className="col-lg-12 mb-3">
                                            <button type="submit" className="btn btn-primary" style={{float:'right'}} >Save</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </Fragment>

    )

}

export default CampaignPage;