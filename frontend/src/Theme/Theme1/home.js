import Allroutes from "./routes";
import Header from "./layout/header";
import Footer from "./layout/footer";
import Indexpage from "./index";
import {createContext, useState} from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import {RoutesContext} from '../../Context/context'
import LoginPage from "./user/login";
import RegisterPage from "./user/register";

function Home(){
    const [contextdata, setContextdata] = useState(Allroutes);


    return(
        <div>
            <Router>
            <RoutesContext.Provider  value={contextdata}>

                <Header/>
                <Switch>

                {


                    Allroutes.map((key,val)=>{

                        return( <Route path={key.path} component={key.action}  exact /> )

                    })


                }

                </Switch>

                <Footer/>
            </RoutesContext.Provider>





            </Router>
        </div>

    )

}

export default Home;