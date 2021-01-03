import Box from "./Box";
import EditBox from "./EditBox";
const PageContent = ({
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
    <div>
      <h1>This is a page with ID {pageData.id}</h1>
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
            <Box
              key={box.id}
              id={box.id}
              content={box.content}
              switchEditBox={switchEditBox}
            />
          );
        }
      })}
    </div>
  );
};
export default PageContent;
