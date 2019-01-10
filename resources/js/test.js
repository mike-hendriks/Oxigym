// app.js

require("./bootstrap");
import React from "react";
import { render } from "react-dom";
import { Router, Route, browserHistory } from "react-router";

// import Workout from "./components/Workout";
import Start from "./components/Start";

render(<Start />, document.getElementById("app"));
