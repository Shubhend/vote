import Widget from "../components/Widget";
import {Typography} from "../components/Wrappers";
import Dot from "../components/Sidebar/components/Dot";
import {Grid, MenuItem, OutlinedInput, Select} from "@material-ui/core";
import {
    Area,
    CartesianGrid,
    ComposedChart,
    Legend,
    Line,
    LineChart, Pie, PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from "recharts";

import {Doughnut} from "react-chartjs-2";
import React, {useState} from "react";
import {useTheme} from "@material-ui/styles";
import useStyles from "../pages/dashboard/styles";


function CustomPie(props){
    var theme = useTheme();
    var classes = useStyles();



    const chartdata = {
        labels: props.label,
        hoverOffset: 4,

        datasets: [
            {
                backgroundColor: [
                    "#83ce83",
                    "#959595",
                    "#f96a5d",
                    "#00A6B4",
                    "#6800B4",
                ],
                data: props.data,
            },
        ],
    };

    return (


        <Widget
            bodyClass={classes.mainChartBody}
            header={
                <div className={classes.mainChartHeader}>
                    <Typography
                        variant="h5"
                        color="text"
                        colorBrightness="secondary"
                    >
                        {props.title}
                    </Typography>
                </div>
            }
        >

            <ResponsiveContainer width="100%">
                            <Doughnut
                                data={chartdata}
                                options={{
                                    legend: { display: true, position: "right" },
                                    datalabels: {
                                        display: true,
                                        color: "white",
                                    },
                                    tooltips: {
                                        backgroundColor: "#5a6e7f",
                                    },
                                }}
                            />
            </ResponsiveContainer>






        </Widget>

    )



}







export default CustomPie;