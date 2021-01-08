/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Box from "./Box";
import EditBox from "./EditBox";

const allBoxesContainer = css`
  margin: auto;
  max-width: 900px;
  width: 100%;
`;

const boxContainer = css`
  display: flex;
  margin: 2em 0;
`;

const PageContent = ({
  pageContentState,
  pageData,
  boxes,
  switchEditBox,
  editBoxId,
  editBoxContent,
  setEditBoxContent,
  saveBox,
  cancelEditBox,
  deleteBox,
  confirmDeleteBox,
}) => {
  return (
    <div css={allBoxesContainer}>
      {boxes.map((box) => {
        if (box.id === editBoxId) {
          return (
            <EditBox
              key={box.id}
              id={box.id}
              editBoxContent={editBoxContent}
              setEditBoxContent={setEditBoxContent}
              saveBox={saveBox}
              cancelEditBox={cancelEditBox}
              deleteBox={deleteBox}
              confirmDeleteBox={confirmDeleteBox}
            />
          );
        } else {
          return (
            <div css={boxContainer} key={box.id}>
              <Box
                id={box.id}
                content={box.content}
                switchEditBox={switchEditBox}
              />
            </div>
          );
        }
      })}
    </div>
  );
};
export default PageContent;
