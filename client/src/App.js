import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";

const App = () => {
  const [response, setResponse] = useState("");
  const [products, setProducts] = useState("");
  const [postRes, setPostRes] = useState("");

  useEffect(() => {
    callApi()
      .then(res => setResponse(res.express))
      .catch(err => console.error(err));
  }, []);

  const callApi = async () => {
    const res = await fetch("/test");
    const body = await res.json();

    if (res.status !== 200) throw Error(body.message);

    return body;
  };

  const handleClick = async e => {
    e.preventDefault();
    const initResponse = await fetch("/products").then(products =>
      products.json()
    );
    console.log(initResponse);
  };

  return (
    <>
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </div>
      <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis
        fugiat enim voluptatibus sint eius a magnam ut reiciendis similique
        autem.
      </div>
      <button onClick={handleClick}>no way this works</button>
    </>
  );
};

export default App;
