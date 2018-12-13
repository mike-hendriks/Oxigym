import React, { Component } from "react";

import axios from "axios";

// import { getWorkouts } from "../actions/dashBoardActions";

class ParticipantsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            workoutList: [],
            exerciseList: []
            // workoutId: "",
            // name: ""
        };
    }

    componentDidMount() {
        axios.get("api/get_latest_workout").then(res => {
            const workoutList = res.data;
            const exerciseList = workoutList[1].exercise;
            this.setState({
                workoutList: workoutList,
                exerciseList: exerciseList
            });
            // console.log(exerciseList);
        });
    }

    // renderWorkoutList() {
    //     const { workoutList } = this.state;
    //     console.log(workoutList);
    //     return (
    //         <ul>
    //             {this.state.workoutList.map((workout, i) => {
    //                 return (
    //                     <li key={i}>
    //                         Pushup reps: {workoutList[1].exercise.push_ups}{" "}
    //                         <br />
    //                         Situp reps: {workoutList[1].exercise.sit_ups}
    //                     </li>
    //                 );
    //             })}
    //         </ul>
    //     );
    // }

    renderWorkoutList() {
        const { exerciseList } = this.state;
        console.log(exerciseList);
        return (
            <ul>
                <li>Amount of push up reps: {exerciseList.push_ups}</li>
                <li>Amount of sit ups reps: {exerciseList.sit_ups}</li>
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
