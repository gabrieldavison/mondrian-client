/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const Button = ({ children, onClick, customStyles }) => {
  const buttonStyles = css`
    //Button reset
    background: transparent;
    box-shadow: 0px 0px 0px transparent;
    border: 0px solid transparent;
    text-shadow: 0px 0px 0px transparent;

    :hover {
      background: transparent;
      box-shadow: 0px 0px 0px transparent;

      text-shadow: 0px 0px 0px transparent;
    }

    :active {
    }

    :focus {
      outline: 0;
    }

    //Button styles
    background-color: white;
    padding: 0.2em;
    border: 2px solid black;
    font-family: inherit;
    font-size: 1em;
    font-weight: bold;
    margin: 0.5em;

    :hover {
      background-color: black;
      color: white;
    }
    ${customStyles}
  `;

  return (
    <button onClick={onClick} css={buttonStyles}>
      {children}
    </button>
  );
};

export default Button;
