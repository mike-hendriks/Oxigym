import React, { Component } from "react";
import firebase from "./Firestore";
const firestore = firebase.firestore();
const settings = { /* your settings... */ timestampsInSnapshots: true };
firestore.settings(settings);

class WorkoutResult extends Component {
    constructor(props) {
        super(props);
        this.state = {
            code: "",
            workout_id: "",
            users: []
            // start: "0",
            // workout_name: '',
            // workout_duration: ''
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
        }, 1000);
    }

    getPoints = () => {
        const db = firebase.firestore();
        db.collection("point")
            .orderBy("point", "desc")
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

    getUserLetters = user => {
        let U = user;
        let letters = U.substring(0, 2);

        return letters;
    };

    render() {
        const { users } = this.state;
        return (
            <div className="resultsWorkoutContainer">
                <h1>Results</h1>
                <ul>
                    {users.map((user, i) => {
                        return (
                            <li key={i}>
                                <p className="userNameBubble">
                                    {this.getUserLetters(user.name)}
                                </p>
                                <p className="userPointBubble">{user.point}</p>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}

export default WorkoutResult;
