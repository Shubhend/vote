const axios = require('axios')


const getAddressFromLocationId= async (long,lat) =>{

    var  datarequest=await axios.get('https://us1.locationiq.com/v1/reverse.php?key=pk.6ff88238e226a7ebed92e4e1d0a43973&lat='+lat+'&lon='+long+'&format=json');

    console.log(datarequest);

    var jsondata={};
    if(datarequest.data.address ){

        var data=datarequest.data.address;
        jsondata.country=data.country;
        jsondata.state=data.state;
        jsondata.city=data.town;
        jsondata.latitude=lat;
        jsondata.longitude=long;

        return {obj:JSON.stringify(datarequest.data),data:jsondata};


    }

    return false;


}


const getIpDetails = async (ip) => {


  var  datarequest=await axios.get('http://ipwhois.app/json/103.46.194.166');

  var jsondata={};
  if( datarequest.data.country){
   var data=datarequest.data;
    jsondata.country=data.country;
    jsondata.state=data.region;
    jsondata.city=data.city;
    jsondata.latitude=data.latitude;
    jsondata.longitude=data.longitude;

    return {obj:JSON.stringify(data),data:jsondata};

  }else{

    var  datarequest=await axios.get('https://ipapi.co/103.46.194.166/json/');

    if(datarequest) {
      var data = datarequest.data;
      jsondata.country = data.country_name;
      jsondata.state = data.region;
      jsondata.city = data.city;
      jsondata.latitude = data.latitude;
      jsondata.longitude = data.longitude;

      return {obj: JSON.stringify(data), data: jsondata};
    }


    return false;





  }



};


const getRawIpDetails= async (ip)=>{

    var  datarequest=await axios.get('https://ipapi.co/103.46.194.166/json/');
    var jsondata={};
    if(datarequest) {
        var data = datarequest.data;
        jsondata.country = data.country_name;
        jsondata.state = data.region;
        jsondata.city = data.city;
        jsondata.latitude = data.latitude;
        jsondata.longitude = data.longitude;

        return {obj: JSON.stringify(data), data: jsondata};
    }


    return false;

}

module.exports={getIpDetails,getAddressFromLocationId,getRawIpDetails};


