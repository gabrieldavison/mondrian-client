/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const EditButton = ({ children, onClick, showEditButton }) => {
  const editButtonStyles = css`
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

    display: ${showEditButton ? "block" : "none"};
    position: absolute;
    top: 0;
    right: 0;

    background: transparent;
    color: white;
    padding: 0.2em;
    border: 1px white solid;
    font-family: inherit;
    font-size: 1em;
    font-weight: bold;
    margin: 0.1em;

    :hover {
      background-color: white;
      color: black;
    }
  `;

  return (
    <button onClick={onClick} css={editButtonStyles}>
      {children}
    </button>
  );
};

export default EditButton;
