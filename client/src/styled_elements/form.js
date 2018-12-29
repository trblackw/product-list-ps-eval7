import styled from "styled-components";

export const FormContainer = styled("div")`
  margin: 0 auto;
  padding: 1em;
  text-align: center;
`;

export const Form = styled("form")`
  margin: 1em auto;
  padding: 0.8em;
  display: flex;
  flex-direction: column;
  justify-content: center;

  label {
    display: block;
    margin-left: 0.5em;
  }

  input {
    padding: 0.3em;
    width: 80%;
  }
`;
