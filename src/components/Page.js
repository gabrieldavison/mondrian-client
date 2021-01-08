/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useEffect, useState } from "react";
import AddPageDialog from "./AddPageDialog";
import PageContent from "./PageContent";
import PageHeader from "./PageHeader";
import { navigate } from "@reach/router";

const pageContainer = css`
  max-width: 1200px;
  margin: auto;
`;

const Page = ({ pageName, location }) => {
  const [updateData, setUpdateData] = useState(undefined);
  const [pageContentState, setPageContentState] = useState("loading");
  const [pageData, setPageData] = useState(undefined);
  const [boxes, setBoxes] = useState(undefined);
  const [editBoxId, setEditBoxId] = useState(false);
  const [editBoxContent, setEditBoxContent] = useState("");
  const [pageNameContent, setPageNameContent] = useState("");
  const [addPageErrorMessage, setAddPageErrorMessage] = useState("");

  const [confirmDeleteBox, setConfirmDeleteBox] = useState(false);
  const [addPageVisible, setAddPageVisible] = useState(false);

  //Coming back to this.
  const [pageUnlocked, setPageUnlocked] = useState(false); // Come back to this after you've added edit functionality

  //Gets data for page with ID that corresponds to URL
  useEffect(() => {
    setPageContentState("loading");
    const apiURL = `http://localhost:8000/pages/?name=${pageName}`;
    const requestData = fetch(apiURL)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setPageData(data);
        setBoxes(data.Boxes);

        setPageContentState("loaded");
      })
      .catch((error) => pageNotFound(error));
  }, [pageName, updateData]);

  const pageNotFound = (error) => {
    console.log("not found");
    setPageContentState("notFound");
  };

  const switchEditBox = (id, content) => {
    console.log(id);
    setEditBoxId(id);
    setEditBoxContent(content);
  };

  const saveBox = async (id) => {
    const apiURL = `http://localhost:8000/boxes/${id}`;

    const updatedBoxes = [...boxes];
    const boxIndex = updatedBoxes.findIndex((box) => box.id === id);
    const updatedBox = { ...updatedBoxes[boxIndex], content: editBoxContent };
    updatedBoxes[boxIndex] = updatedBox;

    const response = await fetch(apiURL, {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedBox), // body data type must match "Content-Type" header
    });

    cancelEditBox();
    setBoxes(updatedBoxes);
  };

  const cancelEditBox = () => {
    console.log("cancel box");
    setEditBoxId(false);
    setEditBoxContent("");
  };

  const addBox = async () => {
    const apiURL = "http://localhost:8000/boxes";

    const newBoxData = {
      content: "",
      position: 1,
      PageId: pageData.id,
    };

    let newBox = await fetch(apiURL, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBoxData), // body data type must match "Content-Type" header
    });
    newBox = await newBox.json();

    let newBoxesArray = [newBox, ...boxes];
    //Update box position to compensate for new box
    newBoxesArray = await updateBoxPositions(newBoxesArray);
    console.log(newBoxesArray);
    setBoxes(newBoxesArray);
    switchEditBox(newBox.id, newBox.content);
  };

  //reorders boxes when a box is added or deleted

  const updateBoxPositions = async (array) => {
    let updatedArray = array.map((item, i) => {
      const updatedItem = item;
      updatedItem.position = i + 1;
      return updatedItem;
    });
    console.log(updatedArray);
    const apiURL = "http://localhost:8000/boxes";

    await fetch(apiURL, {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedArray),
    });

    return updatedArray;
  };

  const deleteBox = async (id) => {
    if (confirmDeleteBox) {
      const updatedBoxes = boxes;
      const deleteIndex = boxes.findIndex((box) => box.id === id);
      updatedBoxes.splice(deleteIndex, 1);

      const apiURL = `http://localhost:8000/boxes/${id}`;

      const response = await fetch(apiURL, {
        method: "DELETE",
      });

      console.log(response);

      updateBoxPositions(updatedBoxes);
      setBoxes(updatedBoxes);
      setConfirmDeleteBox(false);
      cancelEditBox();
    } else {
      setConfirmDeleteBox(true);
    }
  };

  const showAddPageModal = () => {
    setAddPageVisible(true);
  };

  const cancelAddPage = () => {
    setAddPageErrorMessage("");
    setAddPageVisible(false);
    setPageNameContent("");
  };

  const addPage = async (name) => {
    const newPage = {
      name: pageNameContent,
    };
    const apiURL = "http://localhost:8000/pages";
    let response = await fetch(apiURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPage),
    }).then((response) => response.json());

    if (response.error) {
      setAddPageErrorMessage(response.error);
    } else {
      cancelAddPage();
      navigate(`/${newPage.name}`, { state: { update: true } });
      setUpdateData(newPage.name);
    }
  };

  return (
    <div css={pageContainer}>
      <PageHeader
        pageURL={pageName}
        pageUnlocked={pageUnlocked}
        addBox={addBox}
        showAddPageModal={showAddPageModal}
        cancelAddPage={cancelAddPage}
        setPageNameContent={setPageNameContent}
        addPage={addPage}
        addPageVisible={addPageVisible}
        pageContentState={pageContentState}
        addPageErrorMessage={addPageErrorMessage}
      />

      {pageContentState === "loading" ? <h1>loading</h1> : null}
      {pageContentState === "notFound" ? <h1>page does not exist</h1> : null}
      {pageContentState === "loaded" ? (
        <PageContent
          pageContentState={pageContentState}
          pageData={pageData}
          boxes={boxes}
          editBoxId={editBoxId}
          switchEditBox={switchEditBox}
          editBoxContent={editBoxContent}
          setEditBoxContent={setEditBoxContent}
          saveBox={saveBox}
          cancelEditBox={cancelEditBox}
          deleteBox={deleteBox}
          confirmDeleteBox={confirmDeleteBox}
        />
      ) : null}
    </div>
  );
};

export default Page;
