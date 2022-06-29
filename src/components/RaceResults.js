import React from "react";
import * as $ from "jquery";

export default class RaceResults extends React.Component {

    state = {
        details: [],
        qualifyingResults: [],
        racesResults: []
    }

    componentDidMount() {
        this.getRaceDetails();
        this.getRaces();
        this.getQualifyingResults();
    }

    getRaces = () => {
        const id = this.props.match.params.circuitId;
        const url = `http://ergast.com/api/f1/2013/${id}/results.json`

        $.get(url, (data) => {
            this.setState({
                details: data.MRData.RaceTable.Races
            })
        })
    }

    getQualifyingResults = () => {
        const id = this.props.match.params.circuitId;
        const url = `http://ergast.com/api/f1/2013/${id}/qualifying.json`
        console.log("id", id)

        $.get(url, (data) => {
            this.setState({
                qualifyingResults: data.MRData.RaceTable.Races[0].QualifyingResults
            })
        })
    }

    getRaceDetails = () => {
        const id = this.props.match.params.circuitId;
        const url = `http://ergast.com/api/f1/2013/${id}/results.json`;

        $.get(url, (data) => {
            this.setState({
                racesResults: data.MRData.RaceTable.Races[0].Results
            });
        });
    };

    render() {
        return (
            <div>
                {this.state.details.map(race => {
                    return (
                        <div key={race.Circuit.circuitId}>
                            <h3>Race Results:{race.raceName}</h3>
                            <p>Country: {race.Circuit.Location.country}</p>
                            <p>Location:{race.Circuit.Location.locality}</p>
                            <p>Date:{race.date}</p>
                        </div>
                    )
                })}

                {/* tabela Qualifying Results */}

                <table className="custom-table">
                    <thead>
                        <tr>
                            <td colSpan={4} className="table-title">Qualifying Results</td>
                        </tr>
                        <tr>
                            <th>Pos</th>
                            <th>Driver</th>
                            <th>Team</th>
                            <th>Best Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.qualifyingResults.map((race) => {
                            // console.log("race", race)
                            let times = []
                            times.push(race.Q1);
                            times.push(race.Q2);
                            times.push(race.Q3);
                            times.sort();
                            console.log(times);
                            return (
                                <tr key={race.position}>
                                    <td>{race.position}</td>
                                    <td>{race.Driver.familyName}</td>
                                    <td>{race.Constructor.name}</td>
                                    <td>{times[0]}</td>

                                </tr>
                            )
                        })}

                    </tbody>
                </table>

                {/* tabela Race results */}

                <table className="custom-table">
                    <thead>
                        <tr>
                            <th>Race results</th>
                        </tr>
                        <tr>
                            <th>Pos</th>
                            <th>Driver</th>
                            <th>Team</th>
                            <th>Result</th>
                            <th>Points</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.racesResults.map((race) => {
                            // console.log("race", race);
                            return (
                                <tr key={race.position}>
                                    <td>{race.position}</td>
                                    <td>{race.Driver.familyName}</td>
                                    <td>{race.Constructor.name}</td>
                                    <td>{race?.Time?.time}</td>
                                    <td>{race.points}</td>
                                </tr>
                            )

                        })}
                    </tbody>
                </table>

            </div>
        )
    }
}