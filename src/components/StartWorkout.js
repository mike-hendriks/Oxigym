import React, { Component } from "react";

class StartWorkout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            code: ""
        }
    }
    
    componentDidMount() {
        this.setState({
            code: this.props.code
        });
    }

    

    render() {
        return (
            
        <div>
        <p>{this.state.code}</p>
        
        </div>
        
        );
    }
}
export default StartWorkout;
