import React from "react";
import "../css/CssTest.css";

export default class CssTest extends React.Component {
    // Constructor
    constructor(props) {
        super(props);

        this.state = {
            items: [],
            DataisLoaded: false,
        };
    }

    // ComponentDidMount is used to
    // execute the code
    componentDidMount() {
        document.title = "01 - Css Test";
        fetch("https://picsum.photos/v2/list")
            .then((res) => res.json())
            .then((jsonData) => {
                this.setState({
                    items: jsonData,
                    DataisLoaded: true,
                });
            });
    }

    render() {
        const { DataisLoaded, items } = this.state;
        if (!DataisLoaded)
            return (
                <div className="App">
                    <h1> Loading.... </h1>
                </div>
            );

        return (
            <div className="imgContent">
                {items.map((item) => (
                    <img id="image" src={item.download_url} alt={item.author} height="150px" />
                ))}
            </div>
        );
    }
}
