import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Provider} from "react-redux";
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from "./store";
import AdminIndex from "./Admin";
import Home from "./Theme/Theme12/home";
import {LayoutProvider} from "./Admin/context/LayoutContext";
import {UserProvider} from "./Admin/context/UserContext";
import {ThemeProvider} from "@material-ui/styles";
import Themes from "./Admin/themes";
import {CssBaseline} from "@material-ui/core";
import Admin from "./Admin/components/Admin";
import * as serviceWorker from "./Admin/serviceWorker";

ReactDOM.render(
    <Provider store={store}>
    {
        window.location.href.includes('admin') ?

            (   <LayoutProvider>
                <UserProvider>
                    <ThemeProvider theme={Themes.default}>
                        <CssBaseline/>
                        <Admin/>
                    </ThemeProvider>
                </UserProvider>
            </LayoutProvider>


            )

            : (<Home/>)
    }


  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
serviceWorker.register();
reportWebVitals();
