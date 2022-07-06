import React from "react";
import * as $ from "jquery";
import history from "./../history";

export default class Drivers extends React.Component {
  state = {
    drivers: [],
    // searchBar: [],
    // filterValue: "",
  };

  componentDidMount() {
    this.getDriversInfo();
  }

  getDriversInfo = async () => {
    const fetchDataUrl = "http://ergast.com/api/f1/2013/driverStandings.json";
    //const responseFetchData = await fetch(fetchDataUrl);
    //const fetchData = await responseFetchData.json();

    const driverStandingsUrl =
      "http://ergast.com/api/f1/2013/driverStandings.json";
    const responseDriverStandings = await fetch(driverStandingsUrl);
    const driverStandings = await responseDriverStandings.json();
    this.setState({
      drivers:
        driverStandings.MRData.StandingsTable.StandingsLists[0].DriverStandings,
      //   searchBar:
      //     fetchData.MRData.StandingsTable.StandingsLists[0].DriverStandings[0]
      //       .Driver.givenName,
    });
  };

  //filter metoda
  handleFilter = (serachText) => {
    console.log(serachText);

    this.setState({
      drivers: [],
    });
  };

  handleClickDetails = (id) => {
    const url = `/driverDetails/${id}`;
    history.push(url);
  };

  render() {
    // console.log("search", this.state.searchBar);
    return (
      <div className="driverBody">
        <TopNavigation handleFilter={this.handleFilter} />
        <h2 className="title">Drivers Championship</h2>
        {/* <input
          placeholder="Search"
          value={this.state.filterValue}
          onInput={(e) => handleFilter(e)}
        ></input> */}
        <table className="content-table">
          <thead>
            <tr>
              <th scope="col" colSpan={4}>
                {" "}
                Drivers Championship Standings - 2013
              </th>
            </tr>
          </thead>

          <tbody>
            {this.state.drivers.map((driver) => (
              <tr key={driver.Driver.driverId}>
                <td>{driver.position}</td>
                <td
                  onClick={() =>
                    this.handleClickDetails(driver.Driver.driverId)
                  }
                  className="pointer"
                >
                  {" "}
                  <img
                    src={
                      require(`./../img/flags/${driver.Driver.nationality}.png`)
                        .default
                    }
                  />{" "}
                  {driver.Driver.givenName} {driver.Driver.familyName}
                </td>
                <td>{driver.Constructors[0].name}</td>
                <td>{driver.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
