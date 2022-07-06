import React from "react";
import * as $ from "jquery";
import history from "../history";
import TopNavigation from "./TopNavigation";

export default class Races extends React.Component {
  state = {
    races: [],
    searchApiData: [],
    filterValue: "",
  };

  componentDidMount() {
    this.getRaces();
  }

  getRaces = () => {
    const url = "http://ergast.com/api/f1/2013/results/1.json";
    $.get(url, (data) => {
      this.setState({
        races: data.MRData.RaceTable.Races,
        searchApiData: data.MRData.RaceTable.Races,
      });
    });
  };

  handleFilter = (searchText) => {
    if (searchText.target.value == "") {
      return this.setState({
        races: this.state.searchApiData,
      });
    } else {
      const filterResult = this.state.searchApiData.filter(
        (race) =>
          race.raceName
            .toLowerCase()
            .includes(searchText.target.value.toLowerCase()) ||
          race.Circuit.circuitName
            .toLowerCase()
            .includes(searchText.target.value.toLowerCase())
      );
      this.setState({
        races: filterResult,
      });
    }
  };

  handleRaceResults = (id) => {
    const url = `/raceResults/${id}`;
    history.push(url);
  };

  render() {
    return (
      <div className="driverBody">
        <TopNavigation
          filterValue={this.state.filterValue}
          handleFilter={this.handleFilter}
        />
        <h2 className="title">Race Calendar</h2>
        <table className="content-table">
          <thead>
            <tr>
              <td scope="col" colSpan={5}>
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
                <tr key={race.round}>
                  <td>{race.round}</td>
                  <td
                    onClick={() => this.handleRaceResults(race.round)}
                    className="pointer"
                  >
                    <img
                      src={
                        require(`./../img/flags/${race.raceName}.png`).default
                      }
                    />{" "}
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
                    />{" "}
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
