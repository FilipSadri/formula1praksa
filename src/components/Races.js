import React from "react";
import * as $ from "jquery";
import history from "../history";
import TopNavigation from "./TopNavigation";
import Breadcrumb from "./Breadcrumb";

export default class Races extends React.Component {
  state = {
    races: [],
    searchApiData: [],
    filterValue: "",
  };

  componentDidMount() {
    this.getRaces();
  }

  getRaces = async () => {
    const raceStandingsUrl = "http://ergast.com/api/f1/2013/results/1.json";
    const responseRaceStandings = await fetch(raceStandingsUrl);
    const raceStandings = await responseRaceStandings.json();
    this.setState({
      races: raceStandings.MRData.RaceTable.Races,
      searchApiData: raceStandings.MRData.RaceTable.Races,
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
    if (this.state.isLoading) {
      return (
        <div className="loader-container">
          <CircleLoader color="yellow" size={60} />
        </div>
      );
    }

    const breadcrumb = [
      {
        title: "Races",
        url: "",
      },
    ];

    return (
      <div className="driverBody">
        <div className="bg-nav">
          <div className="navigacija">
            <Breadcrumb breadcrumb={breadcrumb} />
            <TopNavigation
              filterValue={this.state.filterValue}
              handleFilter={this.handleFilter}
            />
          </div>
        </div>
        <h2 className="title">Race Calendar</h2>
        <table className="content-table small-screen">
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
                <tr className="small-screen" key={race.round}>
                  <td className="num-b num-box">{race.round}</td>
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
                  <td className="num-b num-box">{race.date}</td>
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
