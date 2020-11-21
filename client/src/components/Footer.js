import React from "react";
import styled from "styled-components";
import { Grid } from "@material-ui/core";

const Style = styled.div`
    .main-wrapper {
        background-color: #4B967F;
        height: 700px;
        text-align: center;
        padding-top: 30px;
        margin-left: -15px;
        overflow: hidden;
    }

    .main-header {
        font-size: 40px;
        color: white
    }

    .underline {
        max-width: 70%;
        background-color: #DEDEA0;
        border: 0;
        height: 5px;
    }
`

export class Footer extends React.Component {
    render() {
        return(
            <Style>
                <div className="main-wrapper">
                    <h1 className="main-header">Mental Health Resources</h1>
                    <hr className="underline"/>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <Resource title="Youthspace.ca" description="Suicide prevention, education, and support." link="http://www.youthspace.ca"/>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Resource title="Better Help" description="Professional counsellors." link="http://www.betterhelp.com"/>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Resource title="Big White Wall Canada" description="Accessible peer support." link="http://www.bigwhitewall.ca"/>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Resource title="Teenmentalhealth.org" description="Mental health literacy." link="http://www.teenmentalhealth.org"/>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Resource title="Canadian Mental Health Association" description="Vast Mental Health Resources." link="https://cmha.ca/"/>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Resource title="Canadian Mental Health Association" description="Vast Mental Health Resources." link="https://cmha.ca/"/>
                        </Grid>
                    </Grid>
                </div>
            </Style>
        );
    }
}

const ResourceStyle = styled.div`
    {
        display: flex;
        justify-content: flex-start;
        flex-direction: column;
    }

    .resource-title, .resource-description, .resource-link {
        color: white;
    }

    .resource-title {
        margin-bottom: 5px;
    }

`

class Resource extends React.Component {
    render() {
        return(
            <ResourceStyle>
                <strong><h2 className="resource-title">{this.props.title}</h2></strong>
                <p className="resource-description">{this.props.description}</p>
                <a className="resource-link" rel="noreferrer" target="_blank" href={this.props.link} >Visit Website</a>
            </ResourceStyle>
        );
    }
}