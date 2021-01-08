/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";
import EditButton from "./EditButton";

const Box = ({ id, content, switchEditBox }) => {
  const [showEditButton, setShowEditButton] = useState(false);

  const boxStyles = css`
    position: relative;
    background-color: black;
    color: white;
    width: 100%;
    padding: 1rem;
  `;

  const editButtonStyles = css`
    display: ${showEditButton ? "block" : "none"};
    position: absolute;
    top: 0;
    right: 0;
  `;

  const boxContentStyles = css`
    p {
      font-size: 1.2em;
    }
    h1 {
      margin: 0.2em 0;
    }
  `;

  return (
    <div
      onMouseEnter={() => setShowEditButton(true)}
      onMouseLeave={() => setShowEditButton(false)}
      css={boxStyles}
    >
      <div
        css={boxContentStyles}
        dangerouslySetInnerHTML={{ __html: content }}
      ></div>

      <EditButton
        showEditButton={showEditButton}
        css={editButtonStyles}
        onClick={() => switchEditBox(id, content)}
      >
        edit
      </EditButton>
    </div>
  );
};
export default Box;
