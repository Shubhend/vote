const axios = require('axios')


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



  console.log(data);


};

module.exports={getIpDetails};


