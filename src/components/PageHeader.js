/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const twoColDiv = css`
  margin: 1.5em 0;
  display: flex;
  flex-direction: row;
  div {
    width: 50%;
  }
`;

const siteControlsContainer = css`
  text-align: right;
`;

const PageHeader = ({ pageUnlocked, addBox, addPage, pageURL }) => {
  return (
    <div css={twoColDiv}>
      <div>
        <h1>{pageURL}</h1>
      </div>
      <div css={siteControlsContainer}>
        <button>{pageUnlocked ? "lock" : "unlock"}</button>
        <button onClick={addBox}>add box</button>
        <button onClick={addPage}>add page</button>
      </div>
    </div>
  );
};
export default PageHeader;
