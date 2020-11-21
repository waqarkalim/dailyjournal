import React from "react";
import styled from "styled-components";
import { Chart } from "react-charts";

const Style = styled.div`
    .graph {
        width: 500px;
        height: 300px
    }

    .graph-container {
        margin-top: 50px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        flex-wrap: wrap;
        overflow: hidden;
    }

`

export class Graph extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            scoreData: this.formattedData(this.props.data)[0],
            comparativeData: this.formattedData(this.props.data)[1]
        }
    }

    formattedData(data) {
        console.log(data);
        var scoreResult = [];
        var comparativeResult = [];

        for (var i = data.length-1; i >= 0; i--) {
            scoreResult.push({x: i, y:data[i].score});
            comparativeResult.push({x: i,y: data[i].comparative});
        }
        console.log(scoreResult);

        return [[{label: "Scores", data: scoreResult}], [{label: "Comparatives", data: comparativeResult}]];
    }
    render() {
        var axes = [{ primary: true, type: 'linear', position: 'bottom' },
        { type: 'linear', position: 'left' }]

        return(
            <Style>
                <div className="graph-container">
                    <div className="graph">
                        <Chart data={this.state.scoreData} axes={axes} />
                    </div>
                    <div className="graph">
                        <Chart data={this.state.comparativeData} axes={axes} />
                    </div>
                </div>
                
            </Style>
        );
    }
}