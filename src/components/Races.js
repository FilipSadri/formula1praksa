import React from "react";
import * as $ from "jquery";
import history from "../history";

export default class Races extends React.Component {
  state = {
    races: [],
  };

  componentDidMount() {
    this.getRaces();
  }

  getRaces = () => {
    //console.log("data");
    const url = "http://ergast.com/api/f1/2013/results/1.json";
    $.get(url, (data) => {
      // console.log("data", data.MRData.RaceTable.Races);
      this.setState({
        races: data.MRData.RaceTable.Races,
      });
    });
  };

  handleRaceResults = (id) => {
    const url = `/raceResults/${id}`;
    history.push(url);
  };

  render() {
    // console.log("state", this.state.races);
    return (
      <div>
        <table className="table table-bordered">
          <thead>
            <tr>
              <td scope="col" colSpan={5} >
                Race Calendar-2013
              </td>
            </tr>
            <tr>
              <th>Round</th>

              <th>Grand Prix</th>
              <th>Circuit</th>
              <th>Date</th>
              <th>Winner</th>
            </tr>
          </thead>
          <tbody>
            {this.state.races.map((race) => {
              //console.log(race.round);
              return (
                <tr
                  key={race.round}
                  onClick={() => this.handleRaceResults(race.round)}
                >
                  <td>{race.round}</td>
                  <td>
                    <img
                      src={
                        require(`./../img/flags/${race.raceName}.png`).default
                      }
                    />{" "}
                    {race.raceName}
                    {race.raceName}
                  </td>
                  <td>{race.Circuit.circuitName}</td>
                  <td>{race.date}</td>
                  <td>
                    <img
                      src={
                        require(`./../img/flags/${race.Results[0].Driver.nationality}.png`)
                          .default
                      }
                    />
                    {race.Results[0].Driver.familyName}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
