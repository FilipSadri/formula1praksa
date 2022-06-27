import React from "react";
import Drivers from "./components/Drivers";
import Teams from "./components/Teams";
import Races from "./components/Teams";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

export default class App extends React.Component {

    render() {
        return (
            //    <div><Drivers/></div>

            <div className="container">
                <div><Races/></div>
                <Router>
                    <div>
                        <nav>
                            <ul>
                                <li>
                                    <Link to="/">Drivers</Link>
                                </li>
                                <li>
                                    <Link to="/">Races</Link>
                                </li>
                                <li>
                                    <Link to="/">Contact</Link>
                                </li>
                            </ul>
                        </nav>
                        <Routes>
                            {/* <Route path="/" element={<Drivers />} /> */}
                            {/* <Route path="/races" element={<Races />} /> */}
                            {/* <Route path="/teams" element={<Teams />} /> */}
                        </Routes>
                    </div>
                </Router>
            </div>

        );
    };
}