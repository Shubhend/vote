import {Box, Button, Grid} from "@material-ui/core";
import React, {useState} from "react";
import {
    AppBar,
    Toolbar,
    IconButton,
    InputBase,
    Menu,
    MenuItem,
    Fab
} from "@material-ui/core";
import { Badge, Typography } from "../components/Wrappers";

import { styled } from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';

import Avatar from '@material-ui/core/Avatar';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';

import DateObject from "react-date-object";
import {Edit, Image, Scanner} from "@material-ui/icons";

import { Link } from "react-router-dom";
import {SITEURL} from "../../Theme/Theme12/Globals/variables";




export default  function CampaignBox(props){
    const [open,setOpen]=useState(false);
    const data=props.data;
    const media=props.media;
    const share=props.share;

    var date = new DateObject(data.createdAt);

    const shareDialog = ()=>{
        share(SITEURL+'/'+data.uniqueId);
    }


    return (
        <>
            <Grid item xs>
                    <Card sx={{ maxWidth: 400 }} style={{ maxWidth:'400px',width:'auto' }}>
                        <CardHeader
                            avatar={
                                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                    V
                                </Avatar>
                            }
                            title={data.name}
                            subheader={date.format("DD MMM YYYY ")}
                        />
                        <CardMedia
                            component="img"
                            height="194"
                            image={media[data.id]}
                            alt="Image"
                        />
                        <CardContent>
                            <Typography variant="body2" color="text.secondary">
                                {data.title}
                            </Typography>
                        </CardContent>
                        <CardActions disableSpacing>
                            <IconButton aria-label="share">
                                <Button onClick={ shareDialog }>
                                <ShareIcon />
                                </Button>
                            </IconButton>

                            <Link to={'/admin/campaign/qr/'+data.id}>
                                <IconButton aria-label="share">
                                    <li className="fa-solid fa-qrcode" ></li>
                                </IconButton>
                            </Link>
                            <Link to={'/admin/campaign/media/'+data.id}>
                            <IconButton aria-label="share">
                                <Image/>
                            </IconButton>
                            </Link>
                            <IconButton aria-label="share">
                                <Edit/>
                            </IconButton>

                            <a href={ SITEURL+'/'+data.uniqueId} target="_blank" >

                                <IconButton aria-label="share">
                                    <li className="fa-solid fa-link" ></li>
                                </IconButton>

                            </a>

                            <IconButton aria-label="share">
                                <li className="fa-solid fa-bar-chart" ></li>
                            </IconButton>

                        </CardActions>
                    </Card>
            </Grid>






        </>
    )


}

