const AddPageDialog = ({
  cancelAddPage,
  setPageNameContent,
  addPage,
  addPageErrorMessage,
}) => {
  return (
    <div>
      <input
        type="text"
        onChange={(e) => setPageNameContent(e.target.value)}
      ></input>
      <button onClick={addPage}>submit</button>
      <button onClick={cancelAddPage}>cancel</button>
      <div>{addPageErrorMessage}</div>
    </div>
  );
};

export default AddPageDialog;
