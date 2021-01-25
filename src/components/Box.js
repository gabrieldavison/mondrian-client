/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";
import EditButton from "./EditButton";
import ReactMarkdown from "react-markdown";
import markdownStyles from "../styles/markdownStyles";

const Box = ({ id, content, switchEditBox, pathname, pageLocked }) => {
  const [showEditButton, setShowEditButton] = useState(false);

  const boxStyles = css`
    box-sizing: border-box;
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
      margin: 1.5em;
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
      <ReactMarkdown css={markdownStyles}>{content}</ReactMarkdown>
      {pathname !== "/" && !pageLocked ? (
        <EditButton
          showEditButton={showEditButton}
          css={editButtonStyles}
          onClick={() => switchEditBox(id, content)}
        >
          edit
        </EditButton>
      ) : null}
    </div>
  );
};
export default Box;
