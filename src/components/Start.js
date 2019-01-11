// Start.js

import React, { Component } from "react";
import { Link } from "react-router-dom";
// import { Router, Route, Link } from "react-router";

import firebase from "./Firestore";

class Start extends Component {
    constructor(props) {
        super(props);
        this.state = {
            code: "",
            start: "0",
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
                this.props.setworkoutid(workout_id);
                this.addExercisesToWorkout(workout_id);
                this.props.history.push("/startWorkout");
            });
    };

    // handleStart = e => {
    //     const db = firebase.firestore();

    //     if (this.state.workout_id) {
    //         const workoutRef = db
    //             .collection("workout")
    //             .doc(this.state.workout_id);
    //         workoutRef.update({ start: 1 });

    //         this.setState({
    //             start: 1
    //         });
    //     } else {
    //         this.setState({
    //             error: "Please generate a code before starting a workout!"
    //         });
    //     }
    // };

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
                {/* <div onClick={this.addExercisesToWorkout}>Genereer code</div> */}

                {/* <Link to="/startWorkout">Genereer code</Link> */}

                <button className="" onClick={this.sendCode}>
                    Genereer code
                </button>
                {/* <p>{this.state.code}</p> */}
                {/* <p className="errorMessage">{this.state.error}</p>
                <button className="btn btn-primary" onClick={this.handleStart}>
                    start
                </button> */}
            </div>
        );
    }
}
export default Start;
