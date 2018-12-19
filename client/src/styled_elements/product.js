import styled from "styled-components";

export const ProductGrid = styled("div")`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 1em;
  justify-content: space-evenly;
  flex-wrap: wrap;
  padding: 2em;
  margin: 0 auto;
`;

export const ProductContainer = styled("div")`
  margin: 1em auto;
  padding: 1.3em;
  border: 1px solid black;
  background: #282c34;
  color: whitesmoke;
  width: 200px;
  border-radius: 6px;
  position: relative;
  -webkit-box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3),
    0 0 40px rgba(0, 0, 0, 0.1) inset;
  -moz-box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3),
    0 0 40px rgba(0, 0, 0, 0.1) inset;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;
  &:hover {
    transform: scale(1.1);
    transition-duration: 300ms;
    cursor: pointer;
  }

  ul {
    display: flex;
    flex-direction: row;
    list-style: none;
  }

  li {
    margin: auto 0.6em;
  }
`;
