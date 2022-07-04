import React from "react";
import Drivers from "./components/Drivers";
import Teams from "./components/Teams";
import Races from "./components/Races";
import DriverDetails from "./components/DriverDetails";
import TeamDetails from "./components/TeamDetails";
import RaceResults from "./components/RaceResults";
import { Router, Switch, Route, Link } from "react-router-dom";
import history from "./history";

export default class App extends React.Component {

    render() {
        return (
            <Router history={history}>
                <div className="tata" style={{height:"100vh"}}>
                    <div style={{backgroundColor:"#35333e"}}>     
                        <ul className="navigation nav nav-tabs deteNav">
                        <li className="nav-item">
                        <Link className="nav-link" to="/"> <img className="mainLogo" src={require(`./img/Logo/logoF1.jpg`).default} /></Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/"> <img className="driveLogo" src={require(`./img/Logo/safety.png`).default} />Drivers</Link>           
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/teams"><img className="teamLogo" src={require(`./img/Logo/car.png`).default} />Teams</Link>           
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/races"><img className="raceLogo" src={require(`./img/Logo/flag.png`).default} />Races</Link>         
                        </li>
                        </ul>
                        </div> 
                        <Switch>
                            <Route path="/" exact component={Drivers} />
                            <Route path="/driverDetails/:driverId" exact component={DriverDetails}/>
                            <Route path="/teams" exact component={Teams} />
                            <Route path="/teamDetails/:constructorId" exact component={TeamDetails}/>
                            <Route path="/races" exact component={Races} /> 
                            <Route path="/raceResults/:circuitId" exact component={RaceResults} />
                        </Switch>
                </div>
            </Router>
        );
    };
}



            // <div className="container">
            //     <Router history={history}>
            //         <div>
            //             <nav>
            //                 <ul>
            //                     <li>
            //                         <Link to="/">Drivers</Link>
            //                     </li>
            //                     <li>
            //                         <Link to="/teams">Teams</Link>
            //                     </li>
            //                     <li>
            //                         <Link to="/races">Races</Link>
            //                     </li>
            //                 </ul>
            //             </nav>
            //             <Switch>
            //                 <Route path="/" exact component={Drivers} />
            //                 <Route path="/driverDetails/:driverId" exact component={DriverDetails}/>
            //                 <Route path="/teams" exact component={Teams} />
            //                 <Route path="/teamDetails/:constructorId" exact component={TeamDetails}/>
            //                 <Route path="/races" exact component={Races} /> 
            //                 <Route path="/raceResults/:circuitId" exact component={RaceResults} />

            //             </Switch>
            //         </div>
            //     </Router>
            // </div>