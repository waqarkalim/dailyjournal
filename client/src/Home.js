import React from "react";
import { Container, Typography, TextField, Button, Select, MenuItem, FormControl, IconButton } from "@material-ui/core";
import styled from "styled-components";
import axios from "axios";

import { Entry } from "./components/Entry";
import { Graph } from "./components/Graph";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const Style = styled.div`
    .main-container {
        text-align: center;
        
    }

    .main-header {
        margin-top: 100px;
        font-size: 60px;
    }

    .header-underline {
        height: 4px;
        background-color: #DEDEA0;
        border: 0px;
    }

    .form-wrapper {
        margin-top: 30px;
    }

    .form-title-input {
        margin-top: 30px;
    }

    .form-body-input {
        margin-top: 30px;
    }

    .submit {
        margin-top: 20px;
    }

    .visible-entries-button {
        margin-top: 30px;
    }
`

export class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            formTitle: "",
            formBody: "",
            date: this.getTodaysDate(),
            userId: 2341,
            entries: null,
            visibleEntries: 10
        }

        this.handleFormTitleChange = this.handleFormTitleChange.bind(this);
        this.handleFormBodyChange = this.handleFormBodyChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleEntryDelete = this.handleEntryDelete.bind(this);
        this.handleVisibleEntriesChange = this.handleVisibleEntriesChange.bind(this);
        this.handleAccessResourcesClick = this.handleAccessResourcesClick.bind(this);
    }

    getTodaysDate() {
        var todaysDate = new Date();
        todaysDate = todaysDate.toISOString();
        return todaysDate.substring(0, 10);
    }

    bufferToString(buffer) { // reading from mysql
        var buf = Buffer.from(buffer);
        return buf.toString();
    }

    handleFormTitleChange(event) {
        this.setState({
            formTitle: event.target.value
        });
    }

    handleFormBodyChange(event) {
        this.setState({
            formBody: event.target.value
        })
    }

    handleVisibleEntriesChange(event) {
        this.setState({
            visibleEntries: event.target.value
        })
    }

    handleFormSubmit(event) {
        event.preventDefault();

        axios.post("/addEntry", this.state).then(res => {
            var sortedByDate = res.data.slice().sort((a, b) => new Date(b.date) - new Date(a.date));

            for (var i = 0; i < sortedByDate.length; i++) {
                sortedByDate[i].title = this.bufferToString(sortedByDate[i].title);
                sortedByDate[i].body = this.bufferToString(sortedByDate[i].body);
                sortedByDate[i].date = sortedByDate[i].date.substring(0, 10);
            }

            this.setState({
                entries: sortedByDate
            });
        })

        event.currentTarget.reset();
    }

    handleEntryDelete(id, event) {
        axios.post("/deleteEntry", {entry_id: id}).then(res => { // first, delete entry in database
            var entries = this.state.entries;

            var indexToBeDeleted = -1;

            for (var i = 0; i < entries.length; i++) { // then, delete entry in this.state
                if (entries[i].entry_id === id) {
                    indexToBeDeleted = i;
                    break;
                }
            }

            if (indexToBeDeleted > -1) {
                entries.splice(indexToBeDeleted, 1);
            }

            this.setState({
                entries: entries
            })
        })
    }

    handleAccessResourcesClick(event) {
        const anchor = (event.target.ownerDocument || document).querySelector("#mental-resources-anchor");
        if (anchor) {
            anchor.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    }

    componentDidMount() {
        axios.get("/fetchEntries").then(res => { // fetches entries and parses them to string
            var sortedByDate = res.data.slice().sort((a, b) => new Date(b.date) - new Date(a.date));

            for (var i = 0; i < sortedByDate.length; i++) {
                sortedByDate[i].title = this.bufferToString(sortedByDate[i].title);
                sortedByDate[i].body = this.bufferToString(sortedByDate[i].body);
                sortedByDate[i].date = sortedByDate[i].date.substring(0, 10);
            }
            this.setState({
                entries: sortedByDate
            }, () => console.log(this.state));
        });
    }

    render() {
        if (this.state.entries !== null) { // make sure entries have been fetched
            var entries = this.state.entries;
            var display;

            if (entries.length > this.state.visibleEntries) {
                entries = entries.slice(0, this.state.visibleEntries); // cut down number of entries rendered if needed
            }

            var graph;
            var graphKey = new Date();
            graph = <Graph data={entries} key={graphKey}/>;

            display = entries.map((entry, index) => {
                return <Entry 
                    key={index}
                    id={entry.entry_id}
                    title={entry.title}
                    date={entry.date}
                    body={entry.body}
                    delete={this.handleEntryDelete} // child component can pass data to parent!
                />
            })
        }
        return (
            <React.Fragment>
                <Style>
                    <Container className="main-container">
                        <Typography className="main-header" variant="h3">How are you feeling today?</Typography>
                        <p>Access Mental Health Resources <IconButton onClick={this.handleAccessResourcesClick}><ExpandMoreIcon /></IconButton></p>
                        <hr className="header-underline"/>

                        <div className="form-wrapper">
                            <form onSubmit={this.handleFormSubmit}>
                            <TextField 
                                label="Subject"
                                variant="outlined"
                                className="form-title-input"
                                onChange={this.handleFormTitleChange}
                                fullWidth
                            />
                            <TextField 
                                label="What's up?"
                                variant="outlined"
                                className="form-body-input"
                                onChange={this.handleFormBodyChange}
                                fullWidth
                                multiline
                            />
                            <Button
                                variant="outlined"
                                className="submit"
                                type="submit"
                            >
                                Add Entry
                            </Button>
                            </form>
                        </div>
                        <FormControl variant="outlined" className="visible-entries-button">
                            <Select
                                onChange={this.handleVisibleEntriesChange}
                                value={this.state.visibleEntries}
                            >
                                <MenuItem value={10}>10</MenuItem>
                                <MenuItem value={20}>20</MenuItem>
                                <MenuItem value={50}>50</MenuItem>
                            </Select>
                        </FormControl>
                        {display}
                        {graph}
                    </Container>
                    <div id="mental-resources-anchor"></div>
                </Style>
            </React.Fragment>
        )
    }
}