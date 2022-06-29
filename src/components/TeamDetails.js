import React from "react";
import * as $ from "jquery";

export default class TeamDetails extends React.Component {
    state = {
        details: [],
        teams: []
    }

    componentDidMount() {
        this.getConstructorDetails();
        this.getConstructorResults();
    }

    getConstructorDetails = () => {
        const id = this.props.match.params.constructorId;
        //console.log("id", this.props.match.params.constructorId)
        const url = `http://ergast.com/api/f1/2013/constructors/${id}/constructorStandings.json`
        $.get(url, (data) => {
            this.setState({
                details: data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings
            })
        })
    }

    getConstructorResults = () => {
        const id = this.props.match.params.constructorId;
        const url = `http://ergast.com/api/f1/2013/constructors/${id}/results.json`
        $.get(url, (data) => {
            console.log(data)
            this.setState({
                teams: data.MRData.RaceTable.Races
            })
        })
    }

    render() {
        console.log("teams", this.state.teams)
        return (
            <div>
                {this.state.details.map(team => {
                    return (
                        <div key={team.Constructor.constructorId}>
                            <h3>Team details:</h3>
                            <p>Team:{team.Constructor.name}</p>
                            <p>Country:{team.Constructor.nationality}</p>
                            <p>Position:{team.position}</p>
                            <p>Points:{team.points}</p>
                            <p>History:{team.Constructor.url}</p>
                        </div>
                    )
                })}

                <table border={1}>
                    <thead>
                        <tr>
                            <th colSpan={5}>Formula 1 2013 Results</th>
                        </tr>
                        <tr>
                            <th>Round</th>
                            <th>Grand Prix</th>
                            <th>{this.state.teams[0].Results[0].Driver.familyName}</th>
                            <th>{this.state.teams[0].Results[1].Driver.familyName}</th>
                            <th>Points</th>
                        </tr>
                    </thead>

                    <tbody>
                        {this.state.teams.map(team =>
                        <tr key={team.round}>
                            <td>{team.round}</td>
                            <td>{team.raceName}</td>
                            <td>{team.Results[0].position}</td>
                            <td>{team.Results[1].position}</td>
                            <td>{parseInt(team.Results[0].points) + parseInt(team.Results[1].points)}</td>
                        </tr>
                        )}
                    </tbody>
                </table>
            </div>
        )
    }
}