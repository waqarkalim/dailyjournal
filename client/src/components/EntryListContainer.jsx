import React from "react";
import EntryList from "./EntryList.jsx";

import styled from "styled-components";

const Style = styled.div`
  .container: {
    color: "black",
  },
`;

class EntryListContainer extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    // this.state = {
    //   entries: [
    //     { title: "Hello", text: "World", sentiment: "1", date: "2" },
    //     { title: "TestTitle", text: "TestText", sentiment: "3", date: "4" },
    //     { title: "Hello", text: "World", sentiment: "1", date: "2" },
    //     { title: "Hello", text: "World", sentiment: "1", date: "2" },
    //     { title: "TestTitle", text: "TestText", sentiment: "3", date: "4" },
    //     { title: "TestTitle", text: "TestText", sentiment: "3", date: "4" },
    //   ],
    // };
  }

  componentDidMount() {
    // fetchEntries((entries) => {
    //   this.setState({ entries: entries });
    // });
  }

  render() {
    console.log(this.props.entries);
    return (
      <div>
        <Style>
          <EntryList
            searchParams={this.props.searchParams}
            entries={this.props.entries}
            style={{ width: "200px" }}
            onDelete={(id) => {
              console.log("Here");
              console.log(id);
              this.props.onDelete(id);
            }}
            onEdit={(event) => {
              this.props.onEdit(event);
            }}
          />
        </Style>
      </div>
    );
  }
}

export default EntryListContainer;
