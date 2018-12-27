import styled from "styled-components";

export const NavContainer = styled("nav")`
  background-color: #282c34;
  min-height: 50%;
  display: flex;
  flex-direction: column;
  padding-bottom: 10px;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: whitesmoke;
`;
export const FilterContainer = styled("div")`
  display: flex;
  flex-direction: row;
  margin: 0 auto;
  background: lightgrey;
  color: navy;
  border: 1px solid red;
  max-height: 200px;
  overflow-y: scroll;

  .dropdown {
    width: 20%;
    font-size: 0.8em;
    text-align: center;
  }
`;

export const Button = styled.button`
  background: hsl(0, 71%, 51%);
  padding: 0.5em;
  color: whitesmoke;
  width: auto;
  height: auto;
  border: none;
  margin: 0.5em auto;
  border-radius: 3px;
  font-size: 0.8em;
  &:hover {
    cursor: pointer;
    transform: scale(1.1);
    transition-duration: 300ms;
  }
`;

export const FlexContainer = styled("div")`
  display: flex;
  flex-direction: row;
  padding: 0.5em;
  margin: 0 auto;
  justify-content: center;
  button {
    margin: 0 0.5em 1em 0.5em;
  }
`;

export const LandingContainer = styled("div")`
  margin: 0 auto;
  justify-content: center;
  padding: 1em;
  text-align: center;
  background: hsl(200, 29%, 55%);
`;

export const Pages = styled("ul")`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: auto;
  list-style: none;
  padding: 1em;
  margin: 0;
  button {
    margin: 0 0.4em;
  }
  button.active {
    border: 1px solid hsl(0, 69%, 48%);
    color: whitesmoke;
    background: hsl(0, 69%, 48%);
    border-radius: 3px;
    padding: 0.4em;
  }
  button.page {
    border-radius: 3px;
    border: 1px solid hsl(0, 69%, 48%);
    color: hsl(0, 69%, 48%);
    background: transparent;
    padding: 0.4em;
    &:hover {
      border: none;
      color: whitesmoke;
      background: hsl(0, 53%, 58%);
      cursor: pointer;
    }
  }
`;
