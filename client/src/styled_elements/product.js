import styled from "styled-components";

export const ProductContainer = styled("div")`
  margin: 1em auto;
  text-align: center;
  padding: 0;
  width: 250px;
  border-radius: 6px;
  position: relative;
  -webkit-box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3),
    0 0 40px rgba(0, 0, 0, 0.1) inset;
  -moz-box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3),
    0 0 40px rgba(0, 0, 0, 0.1) inset;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;
  &:hover {
    transform: scale(1.05);
    transition-duration: 300ms;
    cursor: pointer;
  }

  img {
    margin: 1em auto;
  }
`;

export const SingleProductContainer = styled("div")`
  background: hsl(200, 29%, 55%);
  margin: 0 auto;
  padding: 1.5em;
  font-size: 1.5em;
`;

export const ReviewSection = styled("div")`
  background: whitesmoke;
  color: black;
  margin: 1.5em auto;
  padding: 1em;

  small {
    color: red;
  }
`;
