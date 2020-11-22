import React from "react";

import { Navigation } from "./components/Navigation";
import { Home } from "./Home";

export class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        {/* <Navigation /> */}
        <Home />
      </React.Fragment>
    );
  }
}
