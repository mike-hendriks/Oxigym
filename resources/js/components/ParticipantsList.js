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
            <ul>
                {Object.keys(this.state.workoutList).map((workout, i) => {
                    let value;
                    if (workout == "push_ups") {
                        value = workoutList.push_ups;
                    } else {
                        value = workoutList.sit_ups;
                    }
                    return (
                        <li key={i}>
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

    // renderExcerciseList(workout) {
    //     // const { exc } = this.state;

    //     let elements;
    //     elements = this.state.workoutList[1].exercise.map((exercise, i) => {
    //         return <div key={i}>{exercise}</div>;
    //     });

    //     return <div>{elements}</div>;
    // }

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
