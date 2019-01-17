import React, { Component } from "react";
import firebase from "./Firestore";
const firestore = firebase.firestore();
const settings = {
    /* your settings... */
    timestampsInSnapshots: true
};

firestore.settings(settings);
class StartWorkout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            code: "",
            workout_id: "",
            users: [],
            start: "0"
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
    handleClick = e => {
        const db = firebase.firestore();
        if (this.state.workout_id) {
            const workoutRef = db
                .collection("workout")
                .doc(this.state.workout_id);
            workoutRef.update({
                start: 1
            });
            this.setState({
                start: 1
            });
            this.props.history.push("/currentWorkout");
        }
    };
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
                                users.push({
                                    user_id,
                                    name,
                                    point
                                });
                                this.setState({
                                    users
                                });
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
            <div className="startWorkoutContainer">
                <h1>Vul de code in</h1> <h2> {this.state.code}</h2>
                <ul>
                    {users.map((user, i) => {
                        return (
                            <li key={i}>
                                <p> {this.getUserLetters(user.name)}</p>
                            </li>
                        );
                    })}
                </ul>
                <button onClick={this.handleClick}>START</button>
            </div>
        );
    }
}

export default StartWorkout;
