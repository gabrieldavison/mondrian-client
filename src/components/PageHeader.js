/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Button from "./Button";

const twoColDiv = css`
  margin: 1.5em 0;
  display: flex;
  flex-direction: column;
  div {
    width: 100%;
  }
  @media (min-width: 600px) {
    flex-direction: row;
    div {
      width: 50%;
    }
  }
`;

const siteControlsContainer = css`
  text-align: right;
`;

const pageTitleStyles = css`
  font-weight: bold;
`;

const PageHeader = ({
  addBox,
  pageName,
  pageContentState,
  pathname,
  pageLocked,
  handleLockPageClick,
  setDialogVisible,
}) => {
  return (
    <>
      <div css={twoColDiv}>
        <div>
          <h1 css={pageTitleStyles}>{pageName}</h1>
        </div>
        <div css={siteControlsContainer}>
          {pageContentState === "loaded" && pathname !== "/" ? (
            pageLocked ? (
              <Button onClick={() => setDialogVisible("unlockPage")}>
                unlock page
              </Button>
            ) : (
              <Button onClick={handleLockPageClick}>lock page</Button>
            )
          ) : null}

          {pageContentState === "loaded" && pathname !== "/" && !pageLocked ? (
            <Button onClick={addBox}>add box</Button>
          ) : null}
          <Button onClick={() => setDialogVisible("addPage")}>add page</Button>
          {pathname !== "/" && !pageLocked ? (
            <Button onClick={() => setDialogVisible("options")}>...</Button>
          ) : null}
        </div>
      </div>
    </>
  );
};
export default PageHeader;
