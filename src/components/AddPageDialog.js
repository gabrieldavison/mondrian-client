/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Button from "./Button";

const AddPageDialog = ({
  cancelAddPage,
  setPageNameContent,
  addPage,
  addPageErrorMessage,
}) => {
  const pageDialogContainer = css`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    margin: auto;
    z-index: 5;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    background: rgb(0, 0, 0, 0.4);
  `;

  const pageDialogStyles = css`
    text-align: center;
  `;

  const pageNameInput = css`
    font-family: inherit;
    font-size: 2em;
  `;

  return (
    <div css={pageDialogContainer}>
      <div css={pageDialogStyles}>
        <input
          css={pageNameInput}
          type="text"
          onChange={(e) => setPageNameContent(e.target.value)}
        ></input>
        <div>
          <Button onClick={addPage}>submit</Button>
          <Button onClick={cancelAddPage}>cancel</Button>
        </div>
        <div>{addPageErrorMessage}</div>
      </div>
    </div>
  );
};

export default AddPageDialog;
