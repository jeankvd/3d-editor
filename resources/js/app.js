import React, { Component } from "react";
import ReactDOM from "react-dom";

import ImageContainer from "./components/ImageContainer";

export default class App extends Component {
    render() {
        return (
            <div className="container">
                <ImageContainer />
            </div>
        );
    }
}

if (document.getElementById("example")) {
    ReactDOM.render(<App />, document.getElementById("example"));
}
