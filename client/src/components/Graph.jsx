import React from "react";
import styled from "styled-components";
import { Chart } from "react-charts";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Typography from "@material-ui/core/Typography";

const Style = styled.div`
  .graph {
    width: 500px;
    height: 400px;
    margin-bottom: 100px;
    margin-right: 30px;
  }

  .graph-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
    overflow: hidden;
  }
`;

class Graph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scoreData: null,
      comparativeData: null,
      cumsum: null,
    };
    this.state = {
      scoreData: this.formattedData(this.props.data)[0],
      comparativeData: this.formattedData(this.props.data)[1],
      cumsum: this.formattedData(this.props.data)[2],
    };
  }

  formattedData(data) {
    console.log(data);
    var scoreResult = [];
    var comparativeResult = [];

    for (var i = data.length - 1; i >= 0; i--) {
      scoreResult.push({ x: i, y: data[i].score });
      comparativeResult.push({ x: i, y: data[i].comparative });
    }
    console.log(scoreResult);

    var j;
    var z;
    var cumsum = [];
    for (j = scoreResult.length - 1; j >= 0; j--) {
      var sum = 0;
      for (z = j; z < scoreResult.length; z++) {
        sum += scoreResult[z].y;
      }
      cumsum.push(sum);
    }
    cumsum = cumsum.map((sum, i) => {
      return { x: i, y: sum };
    });
    console.log(cumsum);

    return [
      [{ label: "Scores", data: scoreResult }],
      [{ label: "Comparatives", data: comparativeResult }],
      [{ label: "Cumulative Sum", data: cumsum }],
    ];
  }
  render() {
    var axes = [
      { primary: true, type: "linear", position: "bottom" },
      { type: "linear", position: "left" },
    ];

    return (
      <Style>
        <div className="graph-container">
          <div className="graph">
            <h4>Negative and Positive Word Usage</h4>
            <Chart
              tooltip
              primaryCursor
              secondaryCursor
              data={this.state.scoreData}
              axes={axes}
            />
          </div>
          <div className="graph">
            <h4>Cumulative Usage of Negative and Positive Words</h4>
            <Chart
              tooltip
              primaryCursor
              secondaryCursor
              data={this.state.cumsum}
              axes={axes}
            />
          </div>
        </div>
        <div>
          <Card style={{ margin: "20px" }}>
            <CardContent>
              <Typography variant="body2" component="h5">
                Negative numbers indicate negative tone while positive numbers
                indicate positive tone.
              </Typography>
            </CardContent>
          </Card>
          <p></p>
        </div>
      </Style>
    );
  }
}

export default Graph;
