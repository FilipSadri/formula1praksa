import React from "react";
import * as $ from "jquery";



export default class TeamDetails extends React.Component {
    state = {
        details: []
    }

    componentDidMount() {
        const id = this.props.match.params.constructorId;
        //console.log("id", this.props.match.params.constructorId)
        const url = `http://ergast.com/api/f1/2013/constructors/${id}/constructorStandings.json`
        $.get(url, (data) => {
            this.setState({
                details: data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings
            })
        })
    }

    render() {
        //console.log(this.state.details)
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
            </div>
        )
    }
}