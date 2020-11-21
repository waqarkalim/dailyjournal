import React from "react";
import styled from "styled-components";
import { Chart } from "react-charts";

const Style = styled.div`


`

export class Graph extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.formattedData(this.props.data)
        }
    }

    formattedData(data) {
        console.log(data);
        var result = [];
        for (var i = data.length; i >= 0; i--) {
            console.log(data[i]);
            result.push({x: i, y:i});
        }
        return [{label: "Series 1", data: result}];
    }
    render() {
        var data = [
            {
                label: 'Series 1',
                data: [{ x: 1, y: 10 }, { x: 2, y: 10 }, { x: 3, y: 10 }]
            },
            {
                label: 'Series 2',
                data: [{ x: 1, y: 10 }, { x: 2, y: 10 }, { x: 3, y: 10 }]
            },
            {
                label: 'Series 3',
                data: [{ x: 1, y: 10 }, { x: 2, y: 10 }, { x: 3, y: 10 }]
            }
        ]

        var axes = [{ primary: true, type: 'linear', position: 'bottom' },
        { type: 'linear', position: 'left' }
    ]
        return(
            <Style>
                <div style={{width: '400px',height: '300px'}}>
                    <Chart data={this.state.data} axes={axes} />
                </div>
            </Style>
        );
    }
}