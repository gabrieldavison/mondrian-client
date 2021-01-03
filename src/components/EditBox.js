const EditBox = ({
  id,
  editBoxContent,
  setEditBoxContent,
  saveBox,
  cancelEditBox,
  deleteBox,
  confirmDeleteBox,
}) => {
  return (
    <div>
      <textarea
        value={editBoxContent}
        onChange={(e) => setEditBoxContent(e.target.value)}
      ></textarea>
      <button onClick={() => saveBox(id)}>save</button>
      <button onClick={() => deleteBox(id)}>
        {confirmDeleteBox ? "are you sure?" : "delete"}
      </button>
      <button onClick={cancelEditBox}>cancel</button>
    </div>
  );
};
export default EditBox;
