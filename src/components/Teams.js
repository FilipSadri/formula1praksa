import React from "react";
import * as $ from "jquery";

export default class Teams extends React.Component{

    state = {
        teams: [],
    }

    componentDidMount() {
        this.getPosts();
    }

    getPosts = () => {
        const url = "http://ergast.com/api/f1/2013/constructorStandings.json";
        $.get(url, (data) => {
            console.log("data", data);
            this.setState({
                teams: data
            });
        });
    }
    render(){
        return(
            <div></div>
        )
    }
}