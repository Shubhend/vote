import React from "react";
import { HashRouter,BrowserRouter, Route, Switch, Redirect ,Router} from "react-router-dom";

// components
import Layout from "./Layout";

// pages
import Error from "../pages/error";
import Login from "../pages/login";

// context




export default function Admin() {
  // global


  return (

          <BrowserRouter>
                <Switch>
                    <Route exact path="/admin/login" component={Login} />
                    <Route component={Layout} />
                </Switch>
          </BrowserRouter>


  );

  // #######################################################################


}
