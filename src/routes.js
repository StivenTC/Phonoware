import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Home from "./scenes/Home/Home"
import Game from "./scenes/Game/Game";
import Room from "./scenes/Room/Room";

export default function BasicExample() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/game" component={Game} />
        <Route path="/room=:room" component={Room} />
      </Switch>
    </Router>
  );
}
//<Route path="/about" component={About} />