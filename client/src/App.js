import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from "./components/Landing";
import SelectedProduct from "./components/SelectedProduct";
import Nav from "./components/Nav";
import Reviews from "./components/Reviews";
import AddProduct from "./components/AddProduct";

const App = () => (
  <Router>
    <>
      <Nav />
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/products/:product" component={SelectedProduct} />
        <Route path="/reviews" component={Reviews} />
        <Route path="/addProduct" component={AddProduct} />
      </Switch>
    </>
  </Router>
);

export default App;
