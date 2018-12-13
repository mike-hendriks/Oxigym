import React, { Component } from "react";

import axios from "axios";

// import { getWorkouts } from "../actions/dashBoardActions";

class ParticipantsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            workoutList,
            name: ""
        };
    }

    componentDidMount() {
        axios.get("api/get_latest_workout").then(res => {
            const data = res.data;
            this.setState({ workoutList });
            // console.log(JSON.parse(data));
        });
    }

    renderWorkoutList = () => {};

    render() {
        return (
            <div>
                <p>workouts:</p>
                {this.renderWorkoutList()}
            </div>
        );
    }
}
export default ParticipantsList;
