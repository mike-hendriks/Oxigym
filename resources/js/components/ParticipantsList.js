import React, { Component } from "react";

import axios from "axios";

// import { getWorkouts } from "../actions/dashBoardActions";

class ParticipantsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            workoutList: []
            // workoutId: "",
            // name: ""
        };
    }

    componentDidMount() {
        axios.get("api/get_latest_workout").then(res => {
            const workoutList = res.data;
            this.setState({ workoutList: workoutList[1].exercise });
            // console.log(workoutList);
        });
    }

    renderWorkoutList() {
        const { workoutList } = this.state;
        return (
            <ul className="list-group pl-3 pb-3 pr-3">
                {Object.keys(this.state.workoutList).map((workout, i) => {
                    let value;
                    if (workout == "push_ups") {
                        value = workoutList.push_ups;
                    } else {
                        value = workoutList.sit_ups;
                    }
                    return (
                        <li
                            key={i}
                            className="shadow-sm col-sm-12 list-group-item p-3 mb-2 bg-white rounded"
                        >
                            {console.log(workoutList.workout)}
                            {workout}
                            {": "}
                            {value}
                            <br />
                        </li>
                    );
                })}
            </ul>
        );
    }

    render() {
        return (
            <div>
                <h1 className="mt-5 mb-4">Workouts</h1>
                <div className="card col-sm-4">
                    <div className="card-body p-3">
                        <h5 className="card-title">John Doe</h5>
                    </div>
                    {this.renderWorkoutList()}
                </div>
            </div>
        );
    }
}
export default ParticipantsList;
