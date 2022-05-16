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

function Layout(props) {
  var classes = useStyles();

  // global
  var layoutState = useLayoutState();

  var { isAuthenticated } = useUserState();

  return (
    <div className={classes.root}>




      {
        isAuthenticated==false ? ( <Redirect to="/admin/login" /> ): null
      }

        <>
          <NotificationContainer/>
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
              <Route exact path="/admin/VotedUser/:campId" component={VotedUser} />
              <Route exact path="/admin/profile" component={Profile} />
              <Route  exact path="/admin/campaign/camp" component={CampaignPage} />
              <Route  exact path="/admin/campaign/camp/:campId" component={CampaignPage} />
              <Route exact path="/admin/" component={Dashboard} />
              <Route exact path="/admin/dashboard" component={Dashboard} />
              <Route  exact path="/admin/campaign/qr/:CampaignId" component={QrCode} />
              <Route  exact path="/admin/campaign/media/:CampaignId" component={Media} />
              <Route exact  path="/typography" component={Typography} />
              <Route exact path="/admin/tables" component={Tables} />
              <Route exact path="/notifications" component={Notifications} />
              <Route exact path="/admin/campaign" component={List} />
              <Route
                exact
                path="/app/ui"
                render={() => <Redirect to="/ui/icons" />}
              />
              <Route exact path="/ui/maps" component={Maps} />
              <Route exact path="/ui/icons" component={Icons} />
              <Route exact path="/ui/charts" component={Charts} />
            </Switch>
            <Box
              mt={5}
              width={"100%"}
              display={"flex"}
              alignItems={"center"}
              justifyContent="space-between"
            >
              <div>
                <Link
                  color={'primary'}
                  href={'https://flatlogic.com/'}
                  target={'_blank'}
                  className={classes.link}
                >
                  Flatlogic
                </Link>
                <Link
                  color={'primary'}
                  href={'https://flatlogic.com/about'}
                  target={'_blank'}
                  className={classes.link}
                >
                  About Us
                </Link>
                <Link
                  color={'primary'}
                  href={'https://flatlogic.com/blog'}
                  target={'_blank'}
                  className={classes.link}
                >
                  Blog
                </Link>
              </div>
              <div>
                <Link
                  href={'https://www.facebook.com/flatlogic'}
                  target={'_blank'}
                >
                  <IconButton aria-label="facebook">
                    <Icon
                      path={FacebookIcon}
                      size={1}
                      color="#6E6E6E99"
                    />
                  </IconButton>
                </Link>
                <Link
                  href={'https://twitter.com/flatlogic'}
                  target={'_blank'}
                >
                  <IconButton aria-label="twitter">
                    <Icon
                      path={TwitterIcon}
                      size={1}
                      color="#6E6E6E99"
                    />
                  </IconButton>
                </Link>
                <Link
                  href={'https://github.com/flatlogic'}
                  target={'_blank'}
                >
                  <IconButton
                    aria-label="github"
                    style={{marginRight: -12}}
                  >
                    <Icon
                      path={GithubIcon}
                      size={1}
                      color="#6E6E6E99"
                    />
                  </IconButton>
                </Link>
              </div>
            </Box>
          </div>
        </>
    </div>
  );
}

export default withRouter(Layout);
