// app.js

import React, { Component } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
// import { Router, Route, browserHistory } from "react-router";
import Start from "./components/Start";
import StartWorkout from "./components/StartWorkout";
import { timingSafeEqual } from "crypto";
// // import Workout from "./components/Workout";

require("./bootstrap");

// render(<Start />, document.getElementById("app"));

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      variableCool: "abc",
      code: ""
    }
  }

  setCode = code => {
    this.setState({ code });
  }

  render() {
    return (
      <div className="App">
         <BrowserRouter>
          <Switch>
            <Route exact path="/" render={props => <Start {...props} state={this.state} setCode={this.setCode}/>} />
              <Route path="/startWorkout" render={props => <StartWorkout {...props} state={this.state} />} />
              <Route render={() => <Redirect to="/" />} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;