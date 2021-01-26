/** @jsxImportSource @emotion/react */
import Button from "./Button";
import { css } from "@emotion/react";

import { pageDialogContainer, pageDialogStyles } from "../styles/pageDialog";

const OptionsDialog = ({ onClickCancel, exportPageData, importPageData }) => {
  const importButtonStyles = css`
    input {
      display: none;
    }
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
      border: 2px solid white;
    }
  `;

  const buttonContainerStyles = css`
    button,
    label {
      display: block;
    }

    max-width: 300px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: auto;
  `;

  return (
    <div css={pageDialogContainer}>
      <div css={pageDialogStyles}>
        <div css={buttonContainerStyles}>
          <Button onClick={exportPageData}>export page data</Button>
          <label css={importButtonStyles} htmlFor="file-input">
            <input id="file-input" type="file" onChange={importPageData} />
            import page data
          </label>

          <Button onClick={onClickCancel}>cancel</Button>
        </div>
      </div>
    </div>
  );
};

export default OptionsDialog;
