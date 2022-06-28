import React from "react";
import Drivers from "./components/Drivers";
import Teams from "./components/Teams";
import Races from "./components/Races";
import DriverDetails from "./components/DriverDetails";
import { Router, Switch, Route, Link } from "react-router-dom";
import history from "./history";

export default class App extends React.Component {

    render() {
        return (
            <div className="container">
                <Router history={history}>
                    <div>
                        <nav>
                            <ul>
                                <li>
                                    <Link to="/">Drivers</Link>
                                </li>
                                <li>
                                    <Link to="/teams">Teams</Link>
                                </li>
                                <li>
                                    <Link to="/races">Races</Link>
                                </li>
                            </ul>
                        </nav>
                        <Switch>
                            <Route path="/" exact component={Drivers} />
                            <Route path="/driverDetails/:driverId" exact component={DriverDetails}/>
                            <Route path="/teams" exact component={Teams} />
                            <Route path="/races" exact component={Races} />                           
                        </Switch>
                    </div>
                </Router>
            </div>

        );
    };
}