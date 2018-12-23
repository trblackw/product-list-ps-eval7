import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from "./components/Landing";
import SelectedProduct from "./components/SelectedProduct";
import Nav from "./components/Nav";

const App = () => (
  <Router>
    <>
      <Nav />
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/products/:product" component={SelectedProduct} />
      </Switch>
    </>
  </Router>
);

export default App;
