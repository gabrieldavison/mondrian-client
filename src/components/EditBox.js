/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Button from "./Button";

const editBoxContainer = css`
  margin: 2em 0;
`;

const editableTextBox = css`
  outline: none;
  box-sizing: border-box;
  width: 100%;
  height: 15em;
  font-family: inherit;
  padding: 1em;
  font-size: 1em;
  border: 3px dashed black;
`;

const leftButton = css`
  margin-left: 0;
`;

const EditBox = ({
  id,
  editBoxContent,
  setEditBoxContent,
  saveBox,
  cancelEditBox,
  deleteBox,
  confirmDeleteBox,
}) => {
  return (
    <div css={editBoxContainer}>
      <textarea
        css={editableTextBox}
        value={editBoxContent}
        onChange={(e) => setEditBoxContent(e.target.value)}
      ></textarea>
      <Button customStyles={leftButton} onClick={() => saveBox(id)}>
        save
      </Button>
      <Button onClick={cancelEditBox}>cancel</Button>
      <Button onClick={() => deleteBox(id)}>
        {confirmDeleteBox ? "are you sure?" : "delete"}
      </Button>
    </div>
  );
};
export default EditBox;
