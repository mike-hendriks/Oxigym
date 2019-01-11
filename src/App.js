// app.js

import React, { Component } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Start from "./components/Start";
import StartWorkout from "./components/StartWorkout";
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      code: 8603,
      workoutId: "HGZty96Bm6COhfh4XwZS",
    }
  }

  setCode = code => {
    this.setState({ code });
  }
  setWorkoutId = workoutId => {
    this.setState({ workoutId });
  }

  render() {
    return (
      
      <div className="App">
         <BrowserRouter>
          <Switch>
            <Route exact path="/" render={props => <Start {...props} state={this.state} setWorkoutId={this.setWorkoutId} setCode={this.setCode}/>} />
              {/* <Route path="/startWorkout" render={props => <StartWorkout {...props} state={this.state} />} /> */}
            <Route path="/startWorkout" render={props => <StartWorkout {...props} state={this.state} code={this.state.code} />} />
              <Route render={() => <Redirect to="/" />} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;