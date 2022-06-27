import React from "react";
import Drivers from "./components/Drivers";
import Teams from "./components/Teams";
import Races from "./components/Teams";

export default class App extends React.Component {

    render() {
        return (
            <div>
                <div>Formula 1</div>
                <Teams />
            </div>
        );
    };
}