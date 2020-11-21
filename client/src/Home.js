import React from "react";
import { Container, Typography, TextField, Button } from "@material-ui/core";
import styled from "styled-components";
import axios from "axios";

import { Entry } from "./components/Entry";

const Style = styled.div`
    .main-container {
        text-align: center;
    }

    .main-header {
        margin-top: 50px;
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
`

export class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            formTitle: "",
            formBody: "",
            date: this.getTodaysDate(),
            userId: 2341,
            entries: null
        }

        this.handleFormTitleChange = this.handleFormTitleChange.bind(this);
        this.handleFormBodyChange = this.handleFormBodyChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleEntryDelete = this.handleEntryDelete.bind(this);
    }

    getTodaysDate() {
        var todaysDate = new Date();
        todaysDate = todaysDate.toISOString();
        return todaysDate.substring(0, 10);
    }

    bufferToString(buffer) {
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

    handleFormSubmit(event) {
        event.preventDefault();

        axios.post("/addEntry", this.state).then(res => {
            for (var i = 0; i < res.data.length; i++) {
                res.data[i].title = this.bufferToString(res.data[i].title);
                res.data[i].sentiment = this.bufferToString(res.data[i].sentiment);
                res.data[i].body = this.bufferToString(res.data[i].body);
                res.data[i].date = res.data[i].date.substring(0, 10);
            }
            this.setState({
                entries: res.data
            });
        })

        event.currentTarget.reset();
    }

    handleEntryDelete(id, event) {
        console.log("delete" + id);
        axios.post("/deleteEntry", {entry_id: id}).then(res => {
            var entries = this.state.entries;
            console.log(entries);

            var indexToBeDeleted = -1;

            for (var i = 0; i < entries.length; i++) {
                if (entries[i].entry_id === id) {
                    indexToBeDeleted = i;
                    break;
                }
            }

            console.log(indexToBeDeleted);

            if (indexToBeDeleted > -1) {
                entries.splice(indexToBeDeleted, 1);
            }
            console.log(entries);
            this.setState({
                entries: entries
            })
        })
    }

    componentDidMount() {
        axios.get("/fetchEntries").then(res => {
            for (var i = 0; i < res.data.length; i++) {
                res.data[i].title = this.bufferToString(res.data[i].title);
                res.data[i].sentiment = this.bufferToString(res.data[i].sentiment);
                res.data[i].body = this.bufferToString(res.data[i].body);
                res.data[i].date = res.data[i].date.substring(0, 10);
            }
            this.setState({
                entries: res.data
            }, () => console.log(this.state))
        });
    }

    render() {
        var entries = this.state.entries;
        let display;
        if (entries !== null) {
            display = this.state.entries.map((entry, index) => {
                return <Entry 
                    key={index}
                    id={entry.entry_id}
                    title={entry.title}
                    date={entry.date}
                    body={entry.body}
                    delete={this.handleEntryDelete}
                />
            })
        }
        return (
            <React.Fragment>
                <Style>
                    <Container className="main-container">
                        <Typography className="main-header" variant="h3">How are you feeling today?</Typography>
                        <hr className="header-underline"/>

                        <div className="form-wrapper">
                            <form onSubmit={this.handleFormSubmit}>
                            <TextField 
                                label="title"
                                variant="outlined"
                                className="form-title-input"
                                onChange={this.handleFormTitleChange}
                                fullWidth
                            />
                            <TextField 
                                label="body"
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
                        {display}
                    </Container>
                </Style>
            </React.Fragment>
        )
    }
}