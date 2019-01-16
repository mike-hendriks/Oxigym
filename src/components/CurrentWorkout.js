import React, { Component } from "react";
import firebase from "./Firestore";
const firestore = firebase.firestore();
const settings = { /* your settings... */ timestampsInSnapshots: true };
firestore.settings(settings);

class CurrentWorkout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            code: "",
            workout_id: "",
            users: [],
            start: "0",
            workout_name: '',
            workout_duration: ''
        };
    }

    componentWillMount() {
        const { code, workout_id } = this.props.state;
        this.setState({
            code,
            workout_id
        });

        setTimeout(() => {
            this.getPoints();
            this.getExercise();
            this.startCountdown();
        }, 1000);
    }

    getPoints = () => {
        const db = firebase.firestore();
        db.collection("point")
            .where("workout_id", "==", this.state.workout_id)
            .onSnapshot(querySnapshot => {
                let users = [];
                querySnapshot.forEach(doc => {
                    const user_id = doc.data().user_id;
                    const point = doc.data().point;                    
                    if (user_id) {

                        db.collection("user")
                            .doc(user_id)
                            .get()
                            .then(querySnapshot => {
                                const name = querySnapshot.data().fullname;
                                users.push({ user_id, name, point });
                                this.setState({ users });
                            });
                    }
                });
            });
    };

    getExercise = workout_id => {
        const db = firebase.firestore();
        db.collection("workout_exercise")
            .where("workout_id", "==", this.state.workout_id)
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    
                    if (doc.data().exercise_id) {
                        db.collection("exercise")
                            .doc(doc.data().exercise_id)
                            .get()
                            .then(querySnapshot => {
                                this.setState({
                                    workout_name: querySnapshot.data().name,
                                    workout_duration: querySnapshot.data().time -1,
                                });
                            });
                    }
                });
            })
    }

    startCountdown = () => {
        window.setInterval(() => { 
            let time = this.state.workout_duration;
            time--;
           
            if (time >= 1) {
                this.setState({
                    workout_duration: time
                })
            } else {
                this.props.history.push('/workoutResult');
            }


        }, 1000);

    }


    render() {
        const { users } = this.state;
        return (
            <div className="startWorkoutContainer">
                <h1>Current workout</h1>
                <h2>{this.state.workout_name}</h2>
                <h2>{this.state.code}</h2>
                <p>{this.state.workout_id}</p>
                <p>Time: {this.state.workout_duration}</p>
                <ul>
                    {users.map((user, i) => {
                        return (
                            <li key={i}>
                                <p>{user.name}</p>
                                <p>{user.point}</p>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}

export default CurrentWorkout;
