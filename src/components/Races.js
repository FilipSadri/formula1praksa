import React from "react";
import * as $ from "jquery";
import history from "../history";

export default class Races extends React.Component {
  state = {
    races: []
  };

  componentDidMount() {
    this.getRaces();
  }

  getRaces = () => {
    const url = "http://ergast.com/api/f1/2013/results/1.json";
    $.get(url, (data) => {
      this.setState({
        races: data.MRData.RaceTable.Races
      });
    });
  };

  handleRaceResults = (id) => {
    const url = `/raceResults/${id}`;
    history.push(url);
  };

  render() {
    return (
      <div style={{width:"90%"}}>
        <h2 className="title">Race Calendar</h2>
        <table className="content-table">
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
              return (
                <tr
                  key={race.round}
                  onClick={() => this.handleRaceResults(race.round)}
                >
                  <td>{race.round}</td>
                  <td className="pointer">
                    <img
                      src={
                        require(`./../img/flags/${race.raceName}.png`).default
                      }
                    />
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