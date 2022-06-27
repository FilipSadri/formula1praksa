import React from "react";
import * as $ from "jquery";

export default class Teams extends React.Component {

    state = {
        teams: []
    }

    componentDidMount() {
        this.getPosts();
    }

    getPosts = () => {
        const url = "http://ergast.com/api/f1/2013/constructorStandings.json";
        $.get(url, (data) => {
            console.log("data", data);
            this.setState({
                teams: data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings
            });
        });
    }
    render() {
        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            <th colSpan={3}>Constructor Championship Standing 2013</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.teams.map(team => {
                            console.log(team)
                            return (
                                <tr>
                                    <td>{team.position}</td>
                                    <td>{team.Constructor.name}</td>
                                    <td>{team.Constructor.url}</td>
                                    <td>{team.points}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}