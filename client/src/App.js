import React from "react";

import { Navigation } from "./components/Navigation";
import { Home } from "./Home";
import { Footer } from "./components/Footer";

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
