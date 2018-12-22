import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from "./components/Landing";
import SelectedProduct from "./components/SelectedProduct";

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Landing} />
      <Route path="/products/:product" component={SelectedProduct} />
    </Switch>
  </Router>
);

export default App;
