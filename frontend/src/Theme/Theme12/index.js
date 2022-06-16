import React, {useEffect, useState} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';


//
import { SlideTestimonial } from 'react-materialui-testimonials-transition'

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import {GetCampaign} from "../../Action/PublicController";
import {SITEURL} from "./Globals/variables";


const useStyles = makeStyles((theme) => ({
    appBar: {
        backgroundColor: "#fff"
    },
    hero: {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1558981852-426c6c22a060?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80')`,
        height: "500px",
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
    blogsContainer: {
        paddingTop: theme.spacing(3)
    },
    blogTitle: {
        fontWeight: 800,
        paddingBottom: theme.spacing(3)
    },
    card: {
        maxWidth: "100%",
    },
    media: {
        height: 240
    },
    cardActions: {
        display: "flex",
        margin: "0 10px",
        justifyContent: "space-between"
    },
    author: {
        display: "flex"
    },
    paginationContainer: {
        display: "flex",
        justifyContent: "center"
    }
}));



function Indexpage(){
    const classes = useStyles();

    const [campaign,setCampaign]=useState([]);

    async function loadCamp(){
        let data=await GetCampaign({});
        setCampaign(data.data.campaign);

    }

    useEffect(()=>{


        loadCamp();

    },[]);


    return(


        <div className="">
            <Box className={classes.hero}>
                <Box>React Blog</Box>
            </Box>


            <Container maxWidth="lg" className={classes.blogsContainer}>

                <Typography variant="h4" className={classes.blogTitle}>
                    Some Features
                </Typography>
                <Grid container spacing={12}>
                    <Card className={classes.card}>
            <section id="features" className="grey lighten-4">
                <div className="container">

                    <CardActionArea>
                        <center>
                    <div className="row">
                        <div className="col-sm-6">
                            <svg xmlns="http://www.w3.org/2000/svg" height="100" viewBox="0 0 24 24" width="100%"><path d="M0 0h24v24H0z" fill="none"/><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-5h2v5zm4 0h-2v-3h2v3zm0-5h-2v-2h2v2zm4 5h-2V7h2v10z"/></svg>
                            <Typography gutterBottom variant="h5" component="h2">Pixel-Perfect Design</Typography>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor dolore magna aliqua. Ut enim!</p>
                        </div>
                        <div className="col-sm-6">
                            <i style={{
                                fontSize:83
                            }} className="fa-solid fa-eye"></i>
                            <Typography gutterBottom variant="h5" component="h2">Pixel-Perfect Design</Typography>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor dolore magna aliqua. Ut enim!</p>
                        </div>
                        <div className="col-sm-6">
                            <i style={{
                                fontSize:83
                            }} className="fa-solid fa-globe"></i>
                            <Typography gutterBottom variant="h5" component="h2">Pixel-Perfect Design</Typography>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor dolore magna aliqua. Ut enim!</p>
                        </div>
                        <div className="col-sm-6">
                            <i  style={{
                                fontSize:83
                            }} className="fa-solid fa-bullhorn"></i>
                            <Typography gutterBottom variant="h5" component="h2">Pixel-Perfect Design</Typography>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor dolore magna aliqua. Ut enim!</p>
                        </div>
                    </div>
                        </center>
                    </CardActionArea>
                </div>
            </section>

                    </Card>
                </Grid>
            </Container>







            <Container maxWidth="lg" className={classes.blogsContainer}>
                <Typography variant="h4" className={classes.blogTitle}>
                    Articles
                </Typography>
                <Grid container spacing={3}>


                            {
                                campaign && campaign.map((val)=>{

                                    return (
                                        <Grid item xs={12} sm={6} md={4}>

                                            <Link to={'/'+val.uniqueId}>
                                            <Card className={classes.card}>
                                        <CardActionArea>
                                            <CardMedia
                                                className={classes.media}
                                                image={val.mediaData[0].images}
                                                title="Contemplative Reptile"
                                            />
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="h2">
                                                    {val.name}
                                                </Typography>
                                                <Typography variant="body2" color="textSecondary" component="p">
                                                    {val.title}
                                                </Typography>
                                            </CardContent>
                                        </CardActionArea>
                                            </Card>
                                            </Link>
                                        </Grid>
                                    )


                                })

                            }


                </Grid>

            </Container>


            <Container maxWidth="lg" className={classes.blogsContainer}>

                <Typography variant="h4" className={classes.blogTitle}>
                    Testimonials
                </Typography>

            <SlideTestimonial

                alt='Arif Shariati'
                imageRadius='50%'
                title='Arif Shariati'
                subtitle='CEO'
                testimonial={'Awesome React Material UI Testimonial component Package'}
                backgroundGradient={['#FE6B8B', '#FF8E53']}
                backgroundColor='#f9f9f9'
                transition={true}
                direction='left'
                speed={1000}
                shadow={5}
            />
<br/>

                <SlideTestimonial

                    alt='Arif Shariati'
                    imageRadius='50%'
                    title='Arif Shariati'
                    subtitle='CEO'
                    testimonial={'Awesome React Material UI Testimonial component Package'}
                    backgroundGradient={['#FE6B8B', '#FF8E53']}
                    backgroundColor='#f9f9f9'
                    transition={true}
                    direction='left'
                    speed={1000}
                    shadow={5}
                />

                <br/>
                <SlideTestimonial

                    alt='Arif Shariati'
                    imageRadius='50%'
                    title='Arif Shariati'
                    subtitle='CEO'
                    testimonial={'Awesome React Material UI Testimonial component Package'}
                    backgroundGradient={['#FE6B8B', '#FF8E53']}
                    backgroundColor='#f9f9f9'
                    transition={true}
                    direction='left'
                    speed={1000}
                    shadow={5}
                />




            </Container>



        </div>
    );

}

export default Indexpage;
