import React from "react";
import axios from "axios"

export class App extends React.Component {
    componentDidMount() {
        axios.get("/users").then(res => { // test server
            console.log(res.data);
        })
    }
    render() {
        return(
            <React.Fragment>
                <h1>Hello World!</h1>
            </React.Fragment>
        )
    }
}