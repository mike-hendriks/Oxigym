// Master.js

import React, { Component } from "react";
import { Router, Route, Link } from "react-router";

import ParticipantsList from "./ParticipantsList";

class Master extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: ""
        };
    }

    render() {
        return (
            <div className="container">
                <ParticipantsList />
            </div>
        );
    }
}
export default Master;
