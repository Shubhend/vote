import {Button, Grid} from "@material-ui/core";
import React from "react";

import {
    AppBar,
    Toolbar,
    IconButton,
    InputBase,
    Menu,
    MenuItem,
    Fab,
    Link
} from "@material-ui/core";
import { Badge, Typography } from "../components/Wrappers";




export default  function CustomAppBar(props){

    const title=props.title;

    return (
        <>

            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >

                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        { title }
                    </Typography>
                </Toolbar>
            </AppBar>


        </>
    )


}

