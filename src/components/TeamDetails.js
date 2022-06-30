import React from "react";
import * as $ from "jquery";

export default class TeamDetails extends React.Component {
    state = {
        details: [],
        teams: [],
        isLoading: true
    }

    componentDidMount() {
        // this.getConstructorDetails();
        // this.getConstructorResults();
        this.getTeamDetails();
    }

    getTeamDetails = async () => {
        const id = this.props.match.params.constructorId;
        const constructorStandingsUrl = `http://ergast.com/api/f1/2013/constructors/${id}/constructorStandings.json`;
        const resultsUrl = `http://ergast.com/api/f1/2013/constructors/${id}/results.json`;
        const responseConstructorStandings = await fetch(constructorStandingsUrl);
        const constructorStandings = await responseConstructorStandings.json();
        const responseResults = await fetch(resultsUrl);
        const results = await responseResults.json();
        this.setState({
            details: constructorStandings.MRData.StandingsTable.StandingsLists[0].ConstructorStandings,
            teams: results.MRData.RaceTable.Races,
            isLoading: false
        })
    }
    
    // getConstructorDetails = () => {
    //     const id = this.props.match.params.constructorId;
    //     //console.log("id", this.props.match.params.constructorId)
    //     const url = `http://ergast.com/api/f1/2013/constructors/${id}/constructorStandings.json`
    //     $.get(url, (data) => {
    //         this.setState({
    //             details: data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings,
    //             isLoading: false
    //         })
    //     })
    // }

    // getConstructorResults = () => {
    //     const id = this.props.match.params.constructorId;
    //     const url = `http://ergast.com/api/f1/2013/constructors/${id}/results.json`
    //     $.get(url, (data) => {
    //         console.log(data)
    //         this.setState({
    //             teams: data.MRData.RaceTable.Races,
    //             isLoading: false
    //         })
    //     })
    // }
    setColor = (position) => {
        let color = "";
        console.log("position", position)
        switch (position) {
            case "1":
                color = "yellow";
                break;
            case "2":
                color = "gray";
                break; 
            case "3":
                color = "orange";
                break; 
            case "4":
                color = "lightgreen";
                break; 
            case "5":
                color = "lightblue";
                break; 
            case "6":
                color = "aqua";
                break; 
            case "7":
                color = "red";
                break; 
            case "8":
                color = "brown";
                break; 
            case "9":
                color = "cyan";
                break; 
            case "10":
                color = "coral";
                break;
            default:
                color = "darkgrey";
                break;
        }
        return color;
    }

    render() {

        if(this.state.isLoading) {
            return <h2>Loading...</h2>
        }

        // console.log("teams", this.state.teams)
        return (
            <div className="drivers-wrap">
                {this.state.details.map(team => {
                    return (
                        <div key={team.Constructor.constructorId}>
                            <div><img src={require(`./../img/teams/${team.Constructor.name}.png`).default} width={150}/></div>
                            <div><img src={require(`./../img/flags/${team.Constructor.nationality}.png`).default}/></div>
                            <div>{team.Constructor.name}</div>
                            <p>Country:{team.Constructor.nationality}</p>
                            <p>Position:{team.position}</p>
                            <p>Points:{team.points}</p>
                            <p><a href={team.Constructor.url} target="_blank">History</a></p>
                        </div>
                    )
                })}

                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th scope="col" colSpan={5}>Formula 1 2013 Results</th>
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
                            <td><img src={require(`./../img/flags/${team.raceName}.png`).default}/>{team.raceName}</td>
                            <td style={{ "backgroundColor": this.setColor(team.Results[0].position) }}>{team.Results[0].position}</td>
                            <td style={{ "backgroundColor": this.setColor(team.Results[1].position) }}>{team.Results[1].position}</td>
                            <td>{parseInt(team.Results[0].points) + parseInt(team.Results[1].points)}</td>
                        </tr>
                        )}
                    </tbody>
                </table>
            </div>
        )
    }
}