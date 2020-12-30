import { useEffect, useState } from "react";
import { data } from "../data";
import PageContent from "./PageContent";
import PageControls from "./PageControls";

const Page = (props) => {
  const [pageData, setPageData] = useState(undefined);
  const [boxes, setBoxes] = useState(undefined);
  const [pageUnlocked, setPageUnlocked] = useState(false); // Come back to this after you've added edit functionality
  const [editBoxId, setEditBoxId] = useState(false);
  const [editBoxContent, setEditBoxContent] = useState("");

  //Gets data for page with ID that corresponds to URL
  useEffect(() => {
    //Find the page by ID
    //Set this to pageData
    //Break out setBox into a useEffect

    setPageData(data[props.pageId]);
    setBoxes(data[props.pageId].boxes);
  }, [props.pageId]);

  const switchEditBox = (id, content) => {
    console.log(id);
    setEditBoxId(id);
    setEditBoxContent(content);
  };

  const saveBox = (id) => {
    // At the moment this is a bit of a dirty hack, going to have to completely change this logic when using API
    console.log(id);
    const updateIndex = boxes.findIndex((box) => box.id === id);
    const updatedBoxes = boxes;
    updatedBoxes[updateIndex].content = editBoxContent;
    cancelEditBox();
    setBoxes(updatedBoxes);
  };

  const cancelEditBox = () => {
    console.log("cancel box");
    setEditBoxId(false);
    setEditBoxContent("");
  };

  const addBox = () => {
    //Going to need to solve the problem of keeping the boxes in the right order. Maybe use an array on client side and then once the boxes are saved re-order them according to their index in the array.
    //Create a new box
    const newId = Math.floor(Math.random() * 1000);
    console.log(newId);
    const newBox = {
      id: newId,
      content: "",
      order: 0,
    };
    const newBoxesArray = [newBox, ...boxes];
    reorderBoxes(newBoxesArray);
    setBoxes(newBoxesArray);
    switchEditBox(newBox.id, newBox.content);
  };

  const reorderBoxes = (array) => {
    console.log(array);
    return array.forEach((item, i) => (item.order = i));
  };

  const addPage = () => {
    console.log("add page");
  };

  if (pageData === undefined) {
    return <h1>No page found</h1>;
  } else {
    return (
      <>
        <PageControls
          pageUnlocked={pageUnlocked}
          addBox={addBox}
          addPage={addPage}
        />
        <PageContent
          pageData={pageData}
          boxes={boxes}
          editBoxId={editBoxId}
          switchEditBox={switchEditBox}
          editBoxContent={editBoxContent}
          setEditBoxContent={setEditBoxContent}
          saveBox={saveBox}
          cancelEditBox={cancelEditBox}
        />
      </>
    );
  }
};

export default Page;
