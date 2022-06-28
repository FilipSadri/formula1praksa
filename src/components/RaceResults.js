import React from "react";
import * as $ from "jquery";

export default class RaceResults extends React.Component {

    state = {
        details: []
    }

    componentDidMount() {
        const id = this.props.match.params.circuitId;
        // console.log("id",this.props.match.params.raceName);

        const url = `http://ergast.com/api/f1/2013/${id}/results.json`

        $.get(url, (data) => {
            this.setState({
                details: data.MRData.RaceTable.Races
            })
        })
    }

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

                <table border={1}>
                    <thead>
                        <tr>
                            <th>Pos</th>
                            <th>Driver</th>
                            <th>Team</th>
                            <th>Best Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td></td>
                        </tr>
                    </tbody>
                </table>

                {/* tabela Race results */}

                <table>
                <thead>
                        <tr>
                            <th>Pos</th>
                            <th>Driver</th>
                            <th>Team</th>
                            <th>Result</th>
                            <th>Points</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td></td>
                        </tr>
                    </tbody>
                </table>

            </div>
        )
    }
}