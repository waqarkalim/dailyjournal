import React from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper,
  Grid,
  IconButton,
} from "@material-ui/core";
import styled from "styled-components";
import axios from "axios";

import { Entry } from "./components/Entry";

import AppBar from "./components/AppBar.jsx";
import EntryListContainer from "./components/EntryListContainer.jsx";

import Graph from "./components/Graph.jsx";

import Footer from "./components/Footer.jsx";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
const Style = styled.div`
  .main-container {
    text-align: center;
  }

  .main-header {
    margin-top: 50px;
  }

  .header-underline {
    height: 4px;
    background-color: #dedea0;
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
`;

export class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      formTitle: "",
      formBody: "",
      date: this.getTodaysDate(),
      userId: 2341,
      entries: null,
      visibleEntries: 10,
      searchParams: "",
    };

    this.handleFormTitleChange = this.handleFormTitleChange.bind(this);
    this.handleFormBodyChange = this.handleFormBodyChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleEntryDelete = this.handleEntryDelete.bind(this);
    this.handleVisibleEntriesChange = this.handleVisibleEntriesChange.bind(
      this
    );
  }

  getTodaysDate() {
    var todaysDate = new Date();
    todaysDate = todaysDate.toISOString();
    return todaysDate.substring(0, 10);
  }

  bufferToString(buffer) {
    // reading from mysql
    var buf = Buffer.from(buffer);
    return buf.toString();
  }

  handleFormTitleChange(event) {
    if (typeof event === "string") {
      this.setState({
        formTitle: event,
      });
    } else {
      this.setState({
        formTitle: event.target.value,
      });
    }
  }

  handleFormBodyChange(event) {
    if (typeof event === "string") {
      this.setState({
        formBody: event,
      });
    } else {
      this.setState({
        formBody: event.target.value,
      });
    }
  }

  handleVisibleEntriesChange(event) {
    this.setState({
      visibleEntries: event.target.value,
    });
  }

  handleFormSubmit(event) {
    if (event) {
      event.preventDefault();
    }

    axios.post("/addEntry", this.state).then((res) => {
      for (var i = 0; i < res.data.length; i++) {
        // parse results to strings
        res.data[i].title = this.bufferToString(res.data[i].title);
        res.data[i].body = this.bufferToString(res.data[i].body);
        res.data[i].date = res.data[i].date.substring(0, 10);
      }
      this.setState({
        entries: res.data,
      });
    });

    if (event) {
      event.currentTarget.reset();
    }
  }

  handleEntryEdit(event) {
    console.log("Here");
    console.log(event);

    axios.post("/editEntry", event).then((res) => {
      // first, delete entry in database
      var entries = this.state.entries;

      for (var i = 0; i < entries.length; i++) {
        // then, delete entry in this.state
        if (entries[i].entry_id === event.entry_id) {
          entries[i] = JSON.parse(JSON.stringify(event));
          //   entries[i] = Object.assign(event, entries[i]);
        }
      }
      this.setState({
        entries: entries,
      });
    });

    this.render();
  }

  handleEntryDelete(id, event) {
    console.log("Here");
    console.log(id);
    axios.post("/deleteEntry", { entry_id: id }).then((res) => {
      // first, delete entry in database
      var entries = this.state.entries;

      var indexToBeDeleted = -1;

      for (var i = 0; i < entries.length; i++) {
        // then, delete entry in this.state
        if (entries[i].entry_id === id) {
          indexToBeDeleted = i;
          break;
        }
      }

      if (indexToBeDeleted > -1) {
        entries.splice(indexToBeDeleted, 1);
      }

      this.setState({
        entries: entries,
      });
    });
  }

  componentDidMount() {
    axios.get("/fetchEntries").then((res) => {
      // fetches entries and parses them to string
      for (var i = 0; i < res.data.length; i++) {
        res.data[i].title = this.bufferToString(res.data[i].title);
        res.data[i].body = this.bufferToString(res.data[i].body);
        res.data[i].date = res.data[i].date.substring(0, 10);
      }
      this.setState(
        {
          entries: res.data,
        },
        () => console.log(this.state)
      );
    });
  }

  addThought = (event) => {
    this.setState({ formBody: event.body }, () => {
      this.setState({ formTitle: event.title }, () => {
        this.handleFormSubmit(null);
      });
    });
  };

  handleSearchParamsChange = (event) => {
    console.log(event);
    this.setState({ searchParams: event });
  };

  render() {
    // if (this.state.entries !== null) {
    //   // make sure entries have been fetched
    //   var entries = this.state.entries;
    //   var display;

    //   if (entries.length > this.state.visibleEntries) {
    //     entries = entries.slice(0, this.state.visibleEntries); // cut down number of entries rendered if needed
    //   }

    //   display = entries.map((entry, index) => {
    //     return (
    //       <Entry
    //         key={index}
    //         id={entry.entry_id}
    //         title={entry.title}
    //         date={entry.date}
    //         body={entry.body}
    //         delete={this.handleEntryDelete} // child component can pass data to parent!
    //       />
    //     );
    //   });
    // }
    return (
      <React.Fragment>
        <Style>
          <AppBar
            onSearchParamChange={(event) => {
              this.handleSearchParamsChange(event);
            }}
            onChange={(event) => {
              this.addThought(event);
            }}
            scrollToBottom={(event) => {
              event.scrollIntoView({ behavior: "smooth", block: "center" });
            }}
          />
          {/* <IconButton onClick={this.handleAccessResourcesClick}>
            <ExpandMoreIcon />
          </IconButton> */}
          <div style={{ flexGrow: 1 }}>
            <Grid container spacing={0}>
              <Grid item xs={6}>
                <Paper elevation={0}>
                  <EntryListContainer
                    entries={this.state.entries ? this.state.entries : []}
                    onDelete={(id) => this.handleEntryDelete(id, null)}
                    onEdit={(event) =>
                      this.handleEntryEdit(
                        Object.assign({ formBody: event.body }, event)
                      )
                    }
                    searchParams={this.state.searchParams}
                    // style={{ width: "50%", float: "left" }}
                  />
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper elevation={0}>
                  <Graph
                    data={this.state.entries ? this.state.entries : ""}
                    key={new Date()}
                    // style={{ width: "50%", float: "right" }}
                  />
                </Paper>
              </Grid>
            </Grid>
          </div>
          <Footer />
          <div id="mental_resources_anchor"></div>
        </Style>
      </React.Fragment>
    );
  }
}
