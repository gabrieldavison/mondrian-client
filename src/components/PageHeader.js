/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import AddPageDialog from "./AddPageDialog";
import Button from "./Button";

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
  pageUnlocked,
  addBox,
  pageURL,
  showAddPageModal,
  addPageVisible,
  cancelAddPage,
  setPageNameContent,
  addPage,
  pageContentState,
  addPageErrorMessage,
}) => {
  return (
    <>
      {addPageVisible ? (
        <AddPageDialog
          cancelAddPage={cancelAddPage}
          setPageNameContent={setPageNameContent}
          addPage={addPage}
          addPageErrorMessage={addPageErrorMessage}
        />
      ) : null}
      <div css={twoColDiv}>
        <div>
          <h1 css={pageTitleStyles}>{pageURL}</h1>
        </div>
        <div css={siteControlsContainer}>
          {pageContentState === "loaded" ? (
            <Button>{pageUnlocked ? "lock" : "unlock"}</Button>
          ) : null}
          {pageContentState === "loaded" ? (
            <Button onClick={addBox}>add box</Button>
          ) : null}
          <Button onClick={showAddPageModal}>add page</Button>
        </div>
      </div>
    </>
  );
};
export default PageHeader;
