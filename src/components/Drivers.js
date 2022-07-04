import React from "react";
import history from "./../history";

export default class Drivers extends React.Component {

    state = {
        drivers: []
    }

    componentDidMount() {
        this.getDriversInfo()
    }

    getDriversInfo = async () => {
        const driverStandingsUrl = "http://ergast.com/api/f1/2013/driverStandings.json"
        const responseDriverStandings = await fetch(driverStandingsUrl)
        const driverStandings = await responseDriverStandings.json();
        this.setState({
            drivers: driverStandings.MRData.StandingsTable.StandingsLists[0].DriverStandings
        })
    }

    handleClickDetails = (id) => {
        const url = `/driverDetails/${id}`
        history.push(url);
    }

    render() {
        return (
            <div className="tabeladDiv">
                <h2>Drivers Championship</h2>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th colSpan={4}> Drivers Championship Standings - 2013</th>
                        </tr>
                    </thead>

                    <tbody>
                        {this.state.drivers.map(driver =>
                            <tr key={driver.Driver.driverId} onClick={() => this.handleClickDetails(driver.Driver.driverId)}>
                                <td>{driver.position}</td>
                                <td> <img src={require(`./../img/flags/${driver.Driver.nationality}.png`).default} /> {driver.Driver.givenName} {driver.Driver.familyName}</td>
                                <td>{driver.Constructors[0].name}</td>
                                <td>{driver.points}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        )
    }
}