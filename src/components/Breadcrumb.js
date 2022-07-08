import React from "react";
import { Link } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";

export default class Breadcrumb extends React.Component {
  render() {
    return (
      <nav className="top-nav">
        <ul className="breadcrumb">
          <button
            className="btn"
            style={{
              backgroundColor: "gray",
              border: "none",
              marginLeft: "5px",
              marginTop: "5px",
            }}
          >
            <Link to="/">
              <AiFillHome /> F-1 Feeder
            </Link>
          </button>
          {this.props.breadcrumb.map((crumb, i) => {
            if (crumb.url.length == 0) {
              return (
                <div key={i}>
                  <li>
                    <button
                      disabled
                      className="btn"
                      style={{
                        backgroundColor: "#3489c2",
                        border: "none",
                        marginLeft: "5px",
                        marginTop: "5px",
                        color: "#ffffff",
                      }}
                    >
                      <Link to={crumb.url}>{crumb.title}</Link>
                    </button>
                  </li>
                </div>
              );
            } else {
              return (
                <div key={i}>
                  <li>
                    <button
                      className="btn"
                      style={{
                        backgroundColor: "grey",
                        border: "none",
                        marginLeft: "5px",
                        marginTop: "5px",
                      }}
                    >
                      <Link to={crumb.url}>{crumb.title}</Link>
                    </button>
                  </li>
                </div>
              );
            }
          })}
        </ul>
      </nav>
    );
  }
}
