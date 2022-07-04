import React from "react";
import * as $ from "jquery";
import history from "../history";
import { BsBoxArrowUpRight } from "react-icons/bs";


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
            <div className="details-wrap">
                <table className="table table-bordered heightTeamsSideBar">
                    <thead>
                        <tr>
                            <th scope="col" colSpan={4}>Constructor Championship Standing - 2013</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.teams.map(team => {
                            return (
                                <tr key={team.Constructor.constructorId} onClick={() => this.handleTeamsDetails(team.Constructor.constructorId)}>
                                    <td>{team.position}</td>
                                    <td><img src={require(`./../img/flags/${team.Constructor.nationality}.png`).default} width={30}/>{team.Constructor.name}</td>
                                    <td>Details: <a className='button' href={team.Constructor.url} target="_blank"> <BsBoxArrowUpRight/></a></td>
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