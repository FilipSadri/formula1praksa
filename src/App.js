import React from "react";
import Drivers from "./components/Drivers";
import Teams from "./components/Teams";
import Races from "./components/Races";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

export default class App extends React.Component {

    render() {
        return (
            <div className="container">
                <Router>
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
                        <Routes>
                            <Route path="/" element={<Drivers />} />
                            <Route path="/teams" element={<Teams />} />
                            <Route path="/races" element={<Races />} />
                        </Routes>
                    </div>
                </Router>
            </div>

        );
    };
}