import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Home, NotFound, Chat } from "./Containers";

const App = () => {
  return (
    <section className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/chat" component={Chat} />
          <Route path="*" component={NotFound} />
        </Switch>
      </Router>
    </section>
  );
};

export default App;