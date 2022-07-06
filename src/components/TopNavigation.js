import React from "react";

export default class TopNavigation extends React.Component {
  state = {
    filterValue: "",
  };

  render() {
    return (
      <input
        placeholder="Search"
        value={this.state.filterValue}
        onChange={(e) => this.props.handleFilter(e)}
      ></input>
    );
  }
}
