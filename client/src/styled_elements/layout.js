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
  background: lightslategray;
  padding: 0 0.5em;
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

export const LandingContainer = styled("div")`
  margin: 0 auto;
  justify-content: center;
  padding: 0.5em;
  text-align: center;
  background: url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNdaDVALomUJWuHiTYXwIeGZHnjY8MqrmX1iIPsItb0jOlbiKL-g")
    no-repeat;
  background-size: cover;
  background-position: absolute;
`;
