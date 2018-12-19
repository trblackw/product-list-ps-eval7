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
export const Filters = styled("div")`
  text-align: center;
  margin: 0 auto;

  select {
     width: 60%;
     font-size: .8em;
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
  font-size: .8em;
  &:hover {
    cursor: pointer;
    transform: scale(1.1);
    transition-duration: 300ms;
  }
`;
