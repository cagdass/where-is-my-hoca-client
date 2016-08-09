import moment from "moment";
import Promise from "bluebird";
import moment_locale_tr from "moment/locale/tr.js";
import React from "react";
import ReactDOM, {render} from "react-dom";
import {Router, hashHistory}from "react-router";

import "whatwg-fetch";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/style.css";

import routes from "./routes.js";

moment.updateLocale("tr", moment_locale_tr);
Promise.config({longStackTraces: true, warnings: true});

render(<Router routes={routes} history={hashHistory}/>, document.getElementById("content"));
