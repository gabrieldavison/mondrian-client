/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const editBoxContainer = css`
  margin: 2em 0;
`;

const editableTextBox = css`
  width: 100%;
  height: 20em;
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
      <button onClick={() => saveBox(id)}>save</button>
      <button onClick={() => deleteBox(id)}>
        {confirmDeleteBox ? "are you sure?" : "delete"}
      </button>
      <button onClick={cancelEditBox}>cancel</button>
    </div>
  );
};
export default EditBox;
