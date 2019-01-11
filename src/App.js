// app.js

import React, { Component } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Start from "./components/Start";
import StartWorkout from "./components/StartWorkout";
import "./App.css";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            code: "",
            workout_id: ""
        };
    }

    setCode = code => {
        this.setState({ code });
    };
    setworkoutid = workout_id => {
        this.setState({ workout_id });
    };

    render() {
        return (
            <div className="App">
                <BrowserRouter>
                    <Switch>
                        <Route
                            exact
                            path="/"
                            render={props => (
                                <Start
                                    {...props}
                                    state={this.state}
                                    setCode={this.setCode}
                                    setworkoutid={this.setworkoutid}
                                />
                            )}
                        />
                        {/* <Route path="/startWorkout" render={props => <StartWorkout {...props} state={this.state} />} /> */}
                        <Route
                            path="/startWorkout"
                            render={props => (
                                <StartWorkout {...props} state={this.state} />
                            )}
                        />
                        <Route render={() => <Redirect to="/" />} />
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
