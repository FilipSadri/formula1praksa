import React from 'react';
import * as $ from 'jquery';




export default class DriverDetails extends React.Component {


    state = {
        details: [],
        races: [],
    }

    componentDidMount() {
        this.getDriverDetails();
    }

    getDriverDetails = async () => {
        const id = this.props.match.params.driverId;
        const driverStandingsUrl = `http://ergast.com/api/f1/2013/drivers/${id}/driverStandings.json`;
        const resultsUrl = `http://ergast.com/api/f1/2013/drivers/${id}/results.json`;
        const responseDriverStandings = await fetch(driverStandingsUrl);
        const driverStandings = await responseDriverStandings.json();
        const responseResults = await fetch(resultsUrl);
        const results = await responseResults.json();
        this.setState({
            details: driverStandings.MRData.StandingsTable.StandingsLists[0].DriverStandings,
            races: results.MRData.RaceTable.Races
        })
    }

    // getDriverDetails = () => {
    //     const id = this.props.match.params.driverId;
    //     console.log("id", this.props.match.params.driverId)
    //     const url = `http://ergast.com/api/f1/2013/drivers/${id}/driverStandings.json`;
    //     $.get(url, (data) => {
    //         // console.log("data",data)
    //         this.setState({
    //             details: data.MRData.StandingsTable.StandingsLists[0].DriverStandings
    //         })
    //     })
    // }

    // getRaceDetails = () => {
    //     const id = this.props.match.params.driverId;
    //     const url = `http://ergast.com/api/f1/2013/drivers/${id}/results.json`
    //     $.get(url, (data) => {
    //         // console.log("data", data)
    //         this.setState({
    //             races: data.MRData.RaceTable.Races
    //         })
    //     })
    // }
    render() {
        // console.log("details", this.state.races)
        return (
            <div>
                {this.state.details.map(detail => {
                    return (
                        <div key={detail.Driver.driverId}>
                            <img src={require(`./../img/drivers/${detail.Driver.driverId}.jpg`).default} />
                            <h3>Driver details</h3>
                            <img src={require(`./../img/flags/${detail.Driver.nationality}.png`).default} />
                            <p>{detail.Driver.givenName} {detail.Driver.familyName}</p>
                            <p>{detail.Driver.dateOfBirth}</p>
                            <p>{detail.Driver.nationality}</p>
                            <p><a href={detail.Driver.url} target="_blank">Biography</a></p>
                        </div>
                    )
                })}

                <table border={1}>
                    <thead>
                        <tr>
                            <th colSpan={5}> Formula 1 2013 Results</th>
                        </tr>
                        <tr>
                            <th>Round</th>
                            <th>Grand Prix</th>
                            <th>Team</th>
                            <th>Grid</th>
                            <th>Race</th>
                        </tr>
                    </thead>

                    <tbody>
                        {this.state.races.map(race =>
                            <tr key={race.round}>
                                <td>{race.round}</td>
                                <td> <img src={require(`./../img/flags/${race.raceName}.png`).default} /> {race.raceName}</td>
                                <td>{race.Results[0].Constructor.name}</td>
                                <td>{race.Results[0].grid}</td>
                                <td>{race.Results[0].position}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        );
    }
}
