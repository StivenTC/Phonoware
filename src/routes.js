import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Home from "./scenes/Home/Home"
import Flow from "./scenes/Flow/Flow"
import Header from "./components/layout/header/header"

export default function BasicExample() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/flow" component={Flow} />
      </Switch>
    </Router>
  );
}
//<Route path="/about" component={About} />