// Start.js

import React, { Component } from "react";
import { Link } from "react-router-dom";
// import { Link } from 'react-router-dom'
import firebase from "./Firestore";
// import { Router, Route, Link } from "react-router";

class Start extends Component {
    constructor(props) {
        super(props);
        this.state = {
            code: "",
            error: "",
            workout_id: ""
        };
    }

    componentDidMount = () => {
        this.setState(this.props.state);
    };

    generateCode = (min, max) => {
        let random_number = Math.random() * (max - min) + min;
        return Math.floor(random_number);
    };

    sendCode = e => {
        e.preventDefault();
        const db = firebase.firestore();
        const code = this.generateCode(1000, 9999);
        this.setState({
            code
        });
        this.props.setCode(code);

        db.settings({
            timestampsInSnapshots: true
        });

        const workoutRef = db.collection("workout").doc();
        workoutRef
            .set({
                code,
                start: 0
            })
            .then(() => {
                const workout_id = workoutRef.id;
                this.setState({
                    workout_id
                });
                this.props.setWorkoutId(workout_id);
                this.addExercisesToWorkout(workout_id);
                this.props.history.push("/startWorkout");
            });
    };

    addExercisesToWorkout = workout_id => {
        const db = firebase.firestore();
        const exerciseWorkoutRef = db.collection("workout_exercise").doc();
        const exerciseWorkoutRef2 = db.collection("workout_exercise").doc();
        exerciseWorkoutRef.set({
            exercise_id: "pushups",
            workout_id
        });

        exerciseWorkoutRef2.set({
            exercise_id: "situps",
            workout_id
        });
    };

    render() {
        return (
            <div className="startContainer">
                <h1>Start de bootcamp</h1>

                <button className="" onClick={this.sendCode}>
                    Genereer code
                </button>
            </div>
        );
    }
}
export default Start;
