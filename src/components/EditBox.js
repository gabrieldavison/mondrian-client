const EditBox = ({
  id,
  editBoxContent,
  setEditBoxContent,
  saveBox,
  cancelEditBox,
}) => {
  return (
    <div>
      <textarea
        value={editBoxContent}
        onChange={(e) => setEditBoxContent(e.target.value)}
      ></textarea>
      <button onClick={() => saveBox(id)}>save</button>
      <button onClick={cancelEditBox}>cancel</button>
    </div>
  );
};
export default EditBox;
