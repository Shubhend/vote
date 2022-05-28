import React,{useState,useEffect} from "react";
import {
  Route,
  Switch,
  Redirect,
  withRouter,
} from "react-router-dom";
import classnames from "classnames";
import {Box, IconButton, Link} from '@material-ui/core'
import Icon from '@mdi/react'

//icons
import {
  mdiFacebook as FacebookIcon,
  mdiTwitter as TwitterIcon,
  mdiGithub as GithubIcon,
} from '@mdi/js'

// styles
import useStyles from "./styles";

// components
import Header from "../Header";
import Sidebar from "../Sidebar";

// pages
import Dashboard from "../../pages/dashboard";
import Typography from "../../pages/typography";
import Notifications from "../../pages/notifications";
import Maps from "../../pages/maps";
import Tables from "../../pages/tables";
import Icons from "../../pages/icons";
import Charts from "../../pages/charts";
import List from "../../pages/Campaign/list";

// context
import { useLayoutState } from "../../context/LayoutContext";
import {useUserState} from "../../context/UserContext";
import {QrCode} from "../../pages/Campaign/qrcode";
import Login from "../../pages/login";
import Media from "../../pages/Campaign/Media";
import CampaignPage from "../../pages/Campaign/create";
import Profile from "../../pages/User/profile";
import NotificationContainer from "react-notifications/lib/NotificationContainer";
import VotedUser from "../../pages/Campaign/VotedUser";
import Statics from "../../pages/Campaign/Statics";

function Layout(props) {
  var classes = useStyles();

  // global
  var layoutState = useLayoutState();

  var { isAuthenticated,userInfo } = useUserState();

  props={...props,user:userInfo};

  return (
    <div className={classes.root}>




      {
        isAuthenticated==false ? ( <Redirect to="/admin/login" /> ): null
      }

        <>


          <Header history={props.history} />

          <Sidebar />
          <div
            className={classnames(classes.content, {
              [classes.contentShift]: layoutState.isSidebarOpened,
            })}
          >
            <div className={classes.fakeToolbar} />
            <Switch>


              <Route exact path="/admin/VotedUser" component={VotedUser} />
              <Route exact path="/admin/CampaignVotedUser/:campId" component={VotedUser} />
              <Route exact path="/admin/profile" component={Profile} />
              <Route  exact path="/admin/campaign/camp" component={CampaignPage} />
              <Route  exact path="/admin/campaign/camp/:campId" component={CampaignPage} />
              <Route exact path="/admin" component={Dashboard} />
              <Route exact path="/admin/dashboard" component={Dashboard} />
              <Route  exact path="/admin/campaign/qr/:CampaignId" component={QrCode} />
              <Route  exact path="/admin/campaign/media/:CampaignId" component={Media} />
              <Route exact  path="/typography" component={Typography} />
              <Route exact path="/admin/tables" component={Tables} />
              <Route exact path="/notifications" component={Notifications} />
              <Route exact path="/admin/campaign" component={List} />
              <Route exact path="/admin/statics/:campId" component={Dashboard} />
              <Route
                exact
                path="/app/ui"
                render={() => <Redirect to="/ui/icons" />}
              />
              <Route exact path="/ui/maps" component={Maps} />
              <Route exact path="/ui/icons" component={Icons} />
              <Route exact path="/admin/ui/charts" component={Charts} />
            </Switch>

          </div>
        </>
    </div>
  );
}

export default withRouter(Layout);
