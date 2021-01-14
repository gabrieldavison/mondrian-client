/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import InputDialog from "./InputDialog";
import Button from "./Button";
import LockPageDialog from "./LockPageDialog";

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

const pageTitleStyles = css`
  font-weight: bold;
`;

const PageHeader = ({
  addBox,
  pageName,
  pageContentState,
  pathname,
  setAddPageDialogVisible,
  pageLocked,
  setLockPageDialogVisible,
  setUnlockPageDialogVisible,
}) => {
  return (
    <>
      <div css={twoColDiv}>
        <div>
          <h1 css={pageTitleStyles}>{pageName}</h1>
        </div>
        <div css={siteControlsContainer}>
          {pageLocked ? (
            <Button onClick={setUnlockPageDialogVisible}>unlock page</Button>
          ) : (
            <Button onClick={() => setLockPageDialogVisible(true)}>
              lock page
            </Button>
          )}

          {pageContentState === "loaded" && pathname !== "/" && !pageLocked ? (
            <Button onClick={addBox}>add box</Button>
          ) : null}
          <Button onClick={() => setAddPageDialogVisible(true)}>
            add page
          </Button>
        </div>
      </div>
    </>
  );
};
export default PageHeader;
