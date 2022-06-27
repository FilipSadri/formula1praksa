import React from "react";
import * as $ from "jquery";

export default class Races extends React.Component {
  state = {
    races: [],
  };
  componentDidMount() {
    this.getRaces();
  }
  getRaces = () => {
    console.log("data");
    const url = "http://ergast.com/api/f1/2013/results/1.json";
    $.get(url, (data) => {
      console.log("data", data.MRData.RaceTable.Races);
      this.setState({
        races: data.MRData.RaceTable.Races,
      });
    });
  };

  render() {
    console.log("state", this.state.races);
    return (
      <div>
        <table>
          <thead>
            <tr>
              <td>Qualifying results</td>
            </tr>
            <tr>
              <th>Pos</th>
            </tr>
          </thead>
          <tbody>
            {this.state.races.map((race) => {
              console.log(race.Results[0].Driver.familyName);
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
