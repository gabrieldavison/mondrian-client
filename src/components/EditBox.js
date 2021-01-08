/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Button from "./Button";

const EditBox = ({
  id,
  editBoxContent,
  setEditBoxContent,
  saveBox,
  cancelEditBox,
  deleteBox,
  confirmDeleteBox,
  allPositions,
  currentPosition,
  repositionBox,
}) => {
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

  const positionInput = css`
    font-family: inherit;
    font-size: 1em;
    padding: 0.1em;
    font-weight: bold;
    border: 2px solid black;
    background-color: white;
    border-radius: 0;
    :focus {
      border-radius: 0;
    }
  `;
  const positionLabelStyles = css`
    font-weight: bold;
  `;

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
      <label htmlFor="position" css={positionLabelStyles}>
        Position:{" "}
      </label>
      <select
        id="position"
        defaultValue={currentPosition}
        onChange={(e) => repositionBox(id, e.target.value)}
        css={positionInput}
      >
        {allPositions.map((position) => (
          <option key={position}>{position}</option>
        ))}
      </select>
    </div>
  );
};
export default EditBox;
