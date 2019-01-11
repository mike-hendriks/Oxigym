import React, { Component } from "react";
import firebase from "./Firestore";
const firestore = firebase.firestore();
const settings = {/* your settings... */ timestampsInSnapshots: true};
firestore.settings(settings);

class StartWorkout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            code: 8603,
            workoutId: "HGZty96Bm6COhfh4XwZS",
            users: []
        }
    }
    
    componentWillMount() {
        const { code, workoutId } = this.props.state;
        this.setState({
            code,
            workoutId
        });
        this.getPoints();
    }

    getPoints = () => {
        const db = firebase.firestore();
        db.collection("point").where("workout_id", "==", this.state.workoutId)
            .onSnapshot(querySnapshot => {
                let users = [];
                querySnapshot.forEach(doc => {
                    const user_id = doc.data().user_id;
                    const point = doc.data().point;
    
                    db.collection("user").doc(user_id)
                        .get()
                        .then(querySnapshot => {
                            const name = querySnapshot.data().fullname;
                            users.push({ user_id, name, point });
                            this.setState({ users });
                        });
                });
            });
    };

    render() {
        const {users} = this.state;
        return (
            <div className="StartWorkout">
                <p>{this.state.code}</p>
                <p>{this.state.workoutId}</p>
                    <ul>
                        {users.map((user, i) => {
                            console.log(users);
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
export default StartWorkout;
