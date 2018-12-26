import React from "react";
import { NavContainer } from "../styled_elements/index";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <NavContainer>
      <Link to="/">
        <h3
          style={{
            color: "whitesmoke"
          }}
        >
          Products.io
        </h3>
      </Link>
    </NavContainer>
  );
};

export default Nav;
