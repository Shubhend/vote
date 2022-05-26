import Box from "@material-ui/core/Box";
import React from "react";

export  default function CustomBox(props){


    return (
        <Box
            sx={{
                bgcolor: 'background.paper',
                boxShadow: 1,
                borderRadius: 2,
                p: 2,
                minWidth: 300,
            }}
        >
            <Box sx={{ color: 'text.secondary' }}>{props.title}</Box>
            <Box sx={{ color: 'text.primary', fontSize: 34, fontWeight: 'medium' }}>
                {props.value}
            </Box>

        </Box>

    )



}