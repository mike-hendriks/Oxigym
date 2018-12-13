import React, { Component } from "react";

import axios from "axios";

// import { getWorkouts } from "../actions/dashBoardActions";

class ParticipantsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            workoutList: [],
            workoutId: "",
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

    renderWorkoutList = () => {
        const { workoutList } = this.state;
        console.log(workoutList);
        return (
            <div className="workoutList">
                <ul className="list">
                    {workoutList.map((workout, i) => {
                        return (
                            <li
                                key={i}
                                id={workout.id}
                                // className="selectList"
                                onClick={() =>
                                    this.handleSelectClick(company.id)
                                }
                            >
                                {workout.name}
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    };

    render() {
        return (
            <div>
                <p>workouts</p>
                {this.renderWorkoutList()}
            </div>
        );
    }
}
export default ParticipantsList;
