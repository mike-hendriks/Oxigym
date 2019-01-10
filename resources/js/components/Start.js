// Start.js

import React, { Component } from "react";
import { Router, Route, Link } from "react-router";

import firebase from "./Firestore";

class Start extends Component {
    constructor(props) {
        super(props);
        this.state = {
            code: ""
        };
    }

    generateCode = (min, max) => {
        let random_number = Math.random() * (max - min) + min;
        return Math.floor(random_number);
    };

    startWorkout = e => {
        e.preventDefault();
        const db = firebase.firestore();
        const code = this.generateCode(1000, 9999);
        this.setState({
            code
        });
        db.settings({
            timestampsInSnapshots: true
        });

        const workoutRef = db.collection("workout").doc();
        workoutRef
            .set({
                code
            })
            .then(() => {
                const workout_id = workoutRef.id;
                this.addExercisesToWorkout(workout_id);
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
            <div className="container">
                <h1>Start de bootcamp</h1>
                {/* <div onClick={this.addExercisesToWorkout}>Genereer code</div> */}
                <div onClick={this.startWorkout}>Genereer code</div>
                <p>{this.state.code}</p>
            </div>
        );
    }
}
export default Start;
