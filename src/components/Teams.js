import React from "react";
import * as $ from "jquery";
import history from "../history";

export default class Teams extends React.Component {

    state = {
        teams: []
    }

    componentDidMount() {
        this.getPosts()
    }

    getPosts = () => {
        const url = "http://ergast.com/api/f1/2013/constructorStandings.json";
        $.get(url, (data) => {
            //console.log("data", data);
            this.setState({
                teams: data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings
            });
        });
    }

    handleTeamsDetails = (id) => {
        const url = `/teamDetails/${id}`;
        history.push(url);
    }

    render() {
        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            <th colSpan={3}>Constructor Championship Standing - 2013</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.teams.map(team => {
                            // console.log(team)
                            return (
                                <tr key={team.Constructor.constructorId} onClick={() => this.handleTeamsDetails(team.Constructor.constructorId)}>
                                    <td>{team.position}</td>
                                    <td><img src={require(`./../img/flags/${team.Constructor.nationality}.png`).default} width={30}/>{team.Constructor.name}</td>
                                    <td><a href={team.Constructor.url} target="_blank">Details</a></td>
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