import Allroutes from "./routes";
import Header from "./layout/header";
import Footer from "./layout/footer";
import Indexpage from "./index";
import React, {createContext, useState} from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link, Redirect
} from "react-router-dom";

import {RoutesContext, UserLogedInContext} from '../../Context/context'
import LoginPage from "./user/login";
import ImageCampaign from "./Campaign/Images";
import RegisterPage from "./user/register";
import PofilePage from "./user/profile";
import QrCampaign from "./Campaign/qrcode";
import ListCampaign from "./Campaign/listCampaign";
import CreateCampaign from "./Campaign/CreateCampaign";
import Navscrollbar from "./layout/navscrollbar";
import Rightnavbar from "./layout/rightnavbar";
import Feed from "./feed";
import Include from "./layout/include";
import { componentWillAppendToBody } from "react-append-to-body";
import NotificationContainer from "react-notifications/lib/NotificationContainer";
import {useSelector} from "react-redux";
import Detail from "./Campaign/Detail.js";
import Statistics from "./Campaign/statistics";

const AppendedMyComponent= componentWillAppendToBody(Include);

function Home(){

    const userLoggedIn={'status':false,'data':null};
    var user=false;
    const userLogged=useSelector(state => state.user);

    if(userLogged && userLogged.userInfo){
        const userLoggedIn={'status':true,'data':userLogged.userInfo};
        user=true;

    }


    const [contextdata, setContextdata] = useState({'route':Allroutes,'userStatus':userLoggedIn});



    return(

        <div className="main-wrapper">
            <NotificationContainer/>
            <Router>
                <RoutesContext.Provider  value={{contextdata,setContextdata}}>

                    <Header/>
                    <Navscrollbar/>
                    <Switch>

                        {


                            Allroutes.map((key,val)=>{

                                if(key.showOnLogin==true){
                                    return( <Route path={key.path}    render = {() => (user ?  (<key.action/>) : (<Redirect to="/user/login" />))}    exact /> )

                                }else{
                                    return( <Route path={key.path}   component={key.action}   exact /> )

                                }

                            })


                        }

                    </Switch>

                    <Footer/>
                </RoutesContext.Provider>





            </Router>

            <AppendedMyComponent>
                The content for my appended component
            </AppendedMyComponent>
        </div>



    )

}

export default Home;