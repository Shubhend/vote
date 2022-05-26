
import { compose, withProps } from "recompose";
import Map, {
    Marker,
    Popup,
    NavigationControl,
    FullscreenControl,
    ScaleControl,
    GeolocateControl
} from 'react-map-gl';

import React, {useState, useMemo} from 'react';
import {ResponsiveContainer} from "recharts";
import Widget from "../components/Widget";


const CITIESd=[
    {"city":"New York","population":"8,175,133","image":"http://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Above_Gotham.jpg/240px-Above_Gotham.jpg","state":"New York","latitude":40.6643,"longitude":-73.9385},
    {"city":"Los Angeles","population":"3,792,621","image":"http://upload.wikimedia.org/wikipedia/commons/thumb/5/57/LA_Skyline_Mountains2.jpg/240px-LA_Skyline_Mountains2.jpg","state":"California","latitude":34.0194,"longitude":-118.4108},
    {"city":"Chicago","population":"2,695,598","image":"http://upload.wikimedia.org/wikipedia/commons/thumb/8/85/2008-06-10_3000x1000_chicago_skyline.jpg/240px-2008-06-10_3000x1000_chicago_skyline.jpg","state":"Illinois","latitude":41.8376,"longitude":-87.6818},
    {"city":"Houston","population":"2,100,263","image":"http://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Aerial_views_of_the_Houston%2C_Texas%2C_28005u.jpg/240px-Aerial_views_of_the_Houston%2C_Texas%2C_28005u.jpg","state":"Texas","latitude":29.7805,"longitude":-95.3863},
    {"city":"Phoenix","population":"1,445,632","image":"http://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Downtown_Phoenix_Aerial_Looking_Northeast.jpg/207px-Downtown_Phoenix_Aerial_Looking_Northeast.jpg","state":"Arizona","latitude":33.5722,"longitude":-112.0880},
    {"city":"Philadelphia","population":"1,526,006","image":"http://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Philly_skyline.jpg/240px-Philly_skyline.jpg","state":"Pennsylvania","latitude":40.0094,"longitude":-75.1333},
    {"city":"San Antonio","population":"1,327,407","image":"http://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Downtown_San_Antonio_View.JPG/240px-Downtown_San_Antonio_View.JPG","state":"Texas","latitude":29.4724,"longitude":-98.5251},
    {"city":"San Diego","population":"1,307,402","image":"http://upload.wikimedia.org/wikipedia/commons/thumb/5/53/US_Navy_110604-N-NS602-574_Navy_and_Marine_Corps_personnel%2C_along_with_community_leaders_from_the_greater_San_Diego_area_come_together_to_commemora.jpg/240px-US_Navy_110604-N-NS602-574_Navy_and_Marine_Corps_personnel%2C_along_with_community_leaders_from_the_greater_San_Diego_area_come_together_to_commemora.jpg","state":"California","latitude":32.8153,"longitude":-117.1350},
    {"city":"Dallas","population":"1,197,816","image":"http://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Dallas_skyline_daytime.jpg/240px-Dallas_skyline_daytime.jpg","state":"Texas","latitude":32.7757,"longitude":-96.7967},
    {"city":"San Jose","population":"945,942","image":"http://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Downtown_San_Jose_skyline.PNG/240px-Downtown_San_Jose_skyline.PNG","state":"California","latitude":37.2969,"longitude":-121.8193},
    {"city":"Austin","population":"790,390","image":"http://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Austin2012-12-01.JPG/240px-Austin2012-12-01.JPG","state":"Texas","latitude":30.3072,"longitude":-97.7560},
    {"city":"Jacksonville","population":"821,784","image":"http://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Skyline_of_Jacksonville_FL%2C_South_view_20160706_1.jpg/240px-Skyline_of_Jacksonville_FL%2C_South_view_20160706_1.jpg","state":"Florida","latitude":30.3370,"longitude":-81.6613},
    {"city":"San Francisco","population":"805,235","image":"http://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/San_Francisco_skyline_from_Coit_Tower.jpg/240px-San_Francisco_skyline_from_Coit_Tower.jpg","state":"California","latitude":37.7751,"longitude":-122.4193},
    {"city":"Columbus","population":"787,033","image":"http://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Columbus-ohio-skyline-panorama.jpg/240px-Columbus-ohio-skyline-panorama.jpg","state":"Ohio","latitude":39.9848,"longitude":-82.9850},
    {"city":"Indianapolis","population":"820,445","image":"http://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Downtown_indy_from_parking_garage_zoom.JPG/213px-Downtown_indy_from_parking_garage_zoom.JPG","state":"Indiana","latitude":39.7767,"longitude":-86.1459},
    {"city":"Fort Worth","population":"741,206","image":"http://upload.wikimedia.org/wikipedia/commons/thumb/d/db/FortWorthTexasSkylineW.jpg/240px-FortWorthTexasSkylineW.jpg","state":"Texas","latitude":32.7795,"longitude":-97.3463},
    {"city":"Charlotte","population":"731,424","image":"http://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Charlotte_skyline45647.jpg/222px-Charlotte_skyline45647.jpg","state":"North Carolina","latitude":35.2087,"longitude":-80.8307},
    {"city":"Seattle","population":"608,660","image":"http://upload.wikimedia.org/wikipedia/commons/thumb/3/36/SeattleI5Skyline.jpg/240px-SeattleI5Skyline.jpg","state":"Washington","latitude":47.6205,"longitude":-122.3509},
    {"city":"Denver","population":"600,158","image":"http://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/DenverCP.JPG/240px-DenverCP.JPG","state":"Colorado","latitude":39.7618,"longitude":-104.8806},
    {"city":"El Paso","population":"649,121","image":"http://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Downtown_El_Paso_at_sunset.jpeg/240px-Downtown_El_Paso_at_sunset.jpeg","state":"Texas","latitude":31.8484,"longitude":-106.4270}
];




const ICON = `M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
  c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
  C20.1,15.8,20.2,15.8,20.2,15.7z`;

const pinStyle = {
    cursor: 'pointer',
    fill: '#d00',
    stroke: 'none'
};

function Pin({size = 20}) {
    return (
        <svg height={size} viewBox="0 0 24 24" style={pinStyle}>
            <path d={ICON} />
        </svg>
    );
}

function ControlPanel() {
    return (
        <div className="control-panel">
            <h3>Marker, Popup, NavigationControl and FullscreenControl </h3>
            <p>
                Map showing top 20 most populated cities of the United States. Click on a marker to learn
                more.
            </p>
            <p>
                Data source:{' '}
                <a href="https://en.wikipedia.org/wiki/List_of_United_States_cities_by_population">
                    Wikipedia
                </a>
            </p>
            <div className="source-link">
                <a
                    href="https://github.com/visgl/react-map-gl/tree/7.0-release/examples/controls"
                    target="_new"
                >
                    View Code ↗
                </a>
            </div>
        </div>
    );
}

export default function CustomMap(props){
    const [popupInfo, setPopupInfo] = useState(null);
   const CITIES=props.data;

    return (
        <>

            {

                CITIES.length>0 && (

                    <ResponsiveContainer width="100%">
                        <Map
                            initialViewState={{
                                latitude: CITIES.length>0 ? CITIES[0].latitude : 0,
                                longitude: CITIES.length>0 ? CITIES[0].longitude: 0,
                                zoom: 3.5,
                                bearing: 0,
                                pitch: 0
                            }}
                            style={{ height: 500}}
                            mapStyle="mapbox://styles/mapbox/streets-v9"
                            mapboxAccessToken={"pk.eyJ1Ijoid29wZW5zeXMiLCJhIjoiY2wzbXF6OWFqMDc0YzNkbXVud2N4YzB2OSJ9.yCE-qxtRjWYhkXCe6aq0xQ"}
                        >
                            <GeolocateControl position="top-left" />
                            <FullscreenControl position="top-left" />
                            <NavigationControl position="top-left" />
                            <ScaleControl />

                            {
                                CITIES.map((city, index) => (
                                    <Marker
                                        key={`marker-${index}`}
                                        longitude={city.longitude}
                                        latitude={city.latitude}
                                        anchor="bottom"
                                        onClick={e => {
                                            // If we let the click event propagates to the map, it will immediately close the popup
                                            // with `closeOnClick: true`
                                            e.originalEvent.stopPropagation();
                                            setPopupInfo(city);
                                        }}
                                    >
                                        <svg height={20} viewBox="0 0 24 24" style={pinStyle}>
                                            <path d={ICON}/>
                                        </svg>
                                    </Marker>
                                ))
                            }

                            {popupInfo && (
                                <Popup
                                    anchor="top"
                                    longitude={Number(popupInfo.longitude)}
                                    latitude={Number(popupInfo.latitude)}
                                    onClose={() => setPopupInfo(null)}
                                >
                                    <div>
                                        {popupInfo.city}, {popupInfo.state} |{popupInfo.country}
                                        <p> Total Vote : {popupInfo.count} </p>
                                        <p> Country: {popupInfo.country} </p>
                                        <p> City :  {popupInfo.city} </p>

                                    </div>

                                </Popup>
                            )}
                        </Map>
                    </ResponsiveContainer>

                )


            }


            </>
    )

}