// import React, { Component } from "react";
// import { Badge } from "react-bootstrap";
import firebase from "firebase";

// const firebase = require("firebase");
// require("firebase/firestore");
const config = {
    apiKey: "AIzaSyDXmCKqgThV6VH6paLpFdt5ZXRM8mbtuDU",
    authDomain: "reboot-abaa4.firebaseapp.com",
    databaseURL: "https://reboot-abaa4.firebaseio.com/",
    projectId: "reboot-abaa4"
    // storageBucket: "dnavid-c48b6.appspot.com"
};

firebase.initializeApp(config);
// firebaseApp = firebase.initializeApp(config);
// var UCRef = firebaseApp.database().ref("numberofusers");

// class Firebase extends Component {}

export default firebase;
