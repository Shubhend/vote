import React, {useEffect, useState} from "react";
import {
  Grid,
  LinearProgress,
  Select,
  OutlinedInput,
  MenuItem,
  Button
} from "@material-ui/core";
import { useTheme } from "@material-ui/styles";
import {
  ResponsiveContainer,
  ComposedChart,
  AreaChart,
  LineChart,
  Line,
  Area,
  PieChart,
  Pie,
  Cell,
  YAxis,
  XAxis, CartesianGrid, Tooltip, Legend,
} from "recharts";

// styles
import useStyles from "./styles";

// components
import mock from "./mock";
import Widget from "../../components/Widget";
import PageTitle from "../../components/PageTitle";
import { Typography } from "../../components/Wrappers";
import Dot from "../../components/Sidebar/components/Dot";
import Table from "./components/Table/Table";
import BigStat from "./components/BigStat/BigStat";
import {GetCampaignStaticsData,GetRecentVoteRecord} from "../../../Action/StatisticsController";
import {Moment} from "react-moment";
import moment from 'moment';
import Box from "@material-ui/core/Box";
import CustomBox from '../../Global/Box';
import ApexCharts from "react-apexcharts";
import CustomLine from "../../Global/CustomLine";
import CustomPie from "../../Global/CustomPie";
import CustomMap from "../../Global/Map";
import MUIDataTable from "mui-datatables";
import {useParams} from "react-router-dom";
import Filter from "../../Global/Filter";


const PieChartData = [
  { name: "Group A", value: 400, color: "primary" },
  { name: "Group B", value: 300, color: "secondary" },
  { name: "Group C", value: 300, color: "warning" },
  { name: "Group D", value: 200, color: "success" },
];

export default function Dashboard(props) {
  var classes = useStyles();
  var theme = useTheme();

  const [data,setData]=useState(null);
  const [record,setRecord]=useState(null);
  const [linechart,setLinechart]=useState([]);
  const [implinechart,setImpLinechart]=useState([]);
    const [mapData,setMapData]=useState([]);
    const [pie,setPie]=useState({country:[],state:[],city:[]});
    const [PageText,setPageText]=useState("Dashboard");
    const [filter,setFilter]=useState(null);
    const params = useParams();

  useEffect(()=>{

    async function run(){

      let query={ startDate:moment().add(1,'d').format('YYYY-MM-DD hh:mm:ss'),toDate:moment().subtract(30,'d').format('YYYY-MM-DD hh:mm:ss') };

        if (params.campId > 0) {

            setPageText("Campaign Data");

            query={...query,campaignId:params.campId}
        }

        setFilter(query);

    }





    run();

  },[]);


  useEffect(()=>{

      if(filter)
      load();

  },[filter]);

  const load= async ()=>{

      let query =filter

      let data=await GetCampaignStaticsData(query);

      let voteData=await GetRecentVoteRecord(query);

      setRecord(voteData);

      // country Pie

      let countryPieData=[];
      let CountryPieLabel=[];
      for(let i=0;i<data.CountryRecord.length;i++){
          let element=data.CountryRecord[i];
          countryPieData.push(element.countryCount);
          CountryPieLabel.push(element.country);

      }

      let statePieData=[];
      let statePieLabel=[];

      for(let i=0;i<data.StateRecord.length;i++){
          let element=data.StateRecord[i];
          statePieData.push(element.stateCount);
          statePieLabel.push(element.state);

      }


      let cityPieData=[];
      let cityPieLabel=[];

      for(let i=0;i<data.CityRecord.length;i++){
          let element=data.CityRecord[i];
          cityPieData.push(element.cityCount);
          cityPieLabel.push(element.city);

      }



      pie.country['label']=CountryPieLabel;
      pie.country['data']=countryPieData;
      pie.state['label']=statePieLabel;
      pie.state['data']=statePieData;
      pie.city['label']=cityPieLabel;
      pie.city['data']=cityPieData;
      setPie(pie);


      let mapd=[];
      for(let i=0;i<voteData.GraphData.length;i++){
          let element=voteData.GraphData[i];

          mapd.push({
              state:element.state,
              count:element.stateCount,
              latitude:element.latitude,
              longitude:element.longitude,
              country:element.country,
              city:element.city
          });
      }
      setMapData(mapd)



      let lineChart=[];
      for(let i=0;i<voteData.TotalVoteCount.length;i++){
          let element=voteData.TotalVoteCount[i];
          lineChart.push({
              name:moment(element.createdAt).fromNow(),
              count:element.count
          });
      }
      setLinechart(lineChart);

      let ImpressionlineChart=[];
      for(let i=0;i<voteData.TotalImpression.length;i++){
          let element=voteData.TotalImpression[i];
          ImpressionlineChart.push({
              name:moment(element.createdAt).fromNow(),
              clicks:element.clicks,
              impression:element.impression
          });
      }

      setImpLinechart(ImpressionlineChart);


      console.log(lineChart)
      setData(data);


  }



  const dateFilter=async(data)=>{


      let query={ ...filter,startDate:moment(data.endDate).format('YYYY-MM-DD hh:mm:ss'),toDate:moment(data.startDate).format('YYYY-MM-DD hh:mm:ss') };

      setFilter(query);


  }

  return (
    <>
      <PageTitle title={PageText}  />


        <Filter setFilter={dateFilter}/>

      <Grid container spacing={4}>

                <Grid item lg={3} md={4} sm={6} xs={12}>
                  <CustomBox title={"Total Votes"} value={data && data.TotalVoteCount} />
                </Grid>
                <Grid item lg={3} md={8} sm={6} xs={12}>
                  <CustomBox title={"Total Immpression"} value={data && data.TotalImpression[0].impression} />
                </Grid>
                <Grid item lg={3} md={8} sm={6} xs={12}>
                  <CustomBox title={"Total Clicks"} value={data && data.TotalClicks[0].clicks} />
                </Grid>
                <Grid item lg={3} md={4} sm={6} xs={12}>
                  <CustomBox title={"Raw Traffic"} value={data && data.RawTrafficCount} />
                </Grid>


          <Grid item xs={12}>

          <CustomMap data={mapData}/>

          </Grid>
        <Grid item xs={12}>

        <CustomLine data={linechart}  title={"Voted User Graph"} selector1={'count'}   />

        </Grid>

          <Grid item xs={12}>

              <CustomLine data={implinechart}  title={"Impression Clicks  Graph"} selector1={'impression'} selector2={'clicks'}   />

          </Grid>


          <Grid item md={4} sm={6} xs={12} >
              <CustomPie title={"Country Data"} data={pie.country.data} label={pie.country.label}/>
          </Grid>

          <Grid item md={4} sm={6} xs={12} >
              <CustomPie title={"State Data"} data={pie.state.data} label={pie.state.label}/>
          </Grid>


          <Grid item md={4} sm={6} xs={12} >
              <CustomPie title={"City Data"} data={pie.city.data} label={pie.city.label}/>
          </Grid>


          <Grid item xs={12}>
              <MUIDataTable
                  title="Datewise Records"
                  data={ record ? record.CollectionData:[]}
                  columns={['createdAt','clicks','voteCount','impression']}
              />
          </Grid>


        <Grid item xs={12}>

              <MUIDataTable
                  title="Recent Vote List"
                  data={ record ? record.RecentVote:[]}
                  columns={['name','email','phone' ,'country','state','city','createdAt']}
              />





        </Grid>
      </Grid>
    </>
  );
}

