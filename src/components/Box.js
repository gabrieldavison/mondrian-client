const Box = ({ id, content, switchEditBox }) => {
  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: content }}></div>
    </div>
  );
};
export default Box;
