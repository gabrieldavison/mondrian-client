const PageControls = ({ pageUnlocked, addBox, addPage }) => {
  return (
    <div>
      <button>{pageUnlocked ? "lock" : "unlock"}</button>
      <button onClick={addBox}>add box</button>
      <button onClick={addPage}>add page</button>
    </div>
  );
};
export default PageControls;
