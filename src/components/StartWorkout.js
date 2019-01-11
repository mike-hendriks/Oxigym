import React, { Component } from "react";

import firebase from "./Firestore";

class StartWorkout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            code: "",
            start: "0",
            error: "",
            workout_id: ""
        };
    }

    componentDidMount() {
        this.setState({
            code: this.props.state.code,
            workout_id: this.props.state.workout_id
        });
    }

    handleClick = e => {
        const db = firebase.firestore();

        if (this.state.workout_id) {
            const workoutRef = db
                .collection("workout")
                .doc(this.state.workout_id);
            workoutRef.update({ start: 1 });

            this.setState({
                start: 1
            });
        }
    };

    render() {
        return (
            <div className="startWorkoutContainer">
                <h1>Vul de code in</h1>
                <h2>{this.state.code}</h2>
                <p>{this.state.workout_id}</p>
                <button onClick={this.handleClick}>START</button>
            </div>
        );
    }
}
export default StartWorkout;
