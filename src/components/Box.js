const Box = ({ id, content, switchEditBox }) => {
  return (
    <div>
      <button onClick={() => switchEditBox(id, content)}>edit</button>
      <div dangerouslySetInnerHTML={{ __html: content }}></div>
    </div>
  );
};
export default Box;
