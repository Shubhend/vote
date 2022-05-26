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
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from "recharts";
import React, {useState} from "react";
import {useTheme} from "@material-ui/styles";
import useStyles from "../pages/dashboard/styles";
const mainChartData = getMainChartData();

function CustomLine(props){
    var theme = useTheme();
    var classes = useStyles();
    var [mainChartState, setMainChartState] = useState("monthly");
    const lineChartData = props.data;


    console.log(mainChartData);

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

        <ResponsiveContainer width="100%" height="100%" minWidth={500} height={350}>
            <LineChart
                data={lineChartData}
            >

                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line
                    type="linear"
                    dataKey={props.selector1}
                    stroke={theme.palette.warning.main}
                    strokeWidth={2}
                    dot={{
                        stroke: theme.palette.warning.dark,
                        strokeWidth: 2,
                        fill: theme.palette.warning.main,
                    }}
                />

                {
                    props.selector2 ? (

                        <Line
                            type="linear"
                            dataKey={props.selector2}
                            stroke={"blue"}
                            strokeWidth={2}
                            dot={{
                                stroke: theme.palette.warning.dark,
                                strokeWidth: 4,
                                fill: theme.palette.warning.main,
                            }}
                        />
                    ):null

                }




            </LineChart>
        </ResponsiveContainer>





    </Widget>

)



}

function getRandomData(length, min, max, multiplier = 10, maxDiff = 10) {
    var array = new Array(length).fill();
    let lastValue;

    return array.map((item, index) => {
        let randomValue = Math.floor(Math.random() * multiplier + 1);

        while (
            randomValue <= min ||
            randomValue >= max ||
            (lastValue && randomValue - lastValue > maxDiff)
            ) {
            randomValue = Math.floor(Math.random() * multiplier + 1);
        }

        lastValue = randomValue;

        return { value: randomValue };
    });
}



function getMainChartData() {
    var resultArray = [];
    var tablet = getRandomData(31, 3500, 6500, 7500, 1000);
    var desktop = getRandomData(31, 1500, 7500, 7500, 1500);
    var mobile = getRandomData(31, 1500, 7500, 7500, 1500);

    for (let i = 0; i < tablet.length; i++) {
        resultArray.push({
            tablet: tablet[i].value,
            desktop: desktop[i].value,
            mobile: mobile[i].value,
        });
    }

    return resultArray;
}


export default CustomLine;