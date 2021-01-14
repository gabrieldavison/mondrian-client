/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useEffect, useState } from "react";
import PageContent from "./PageContent";
import PageHeader from "./PageHeader";
import { navigate } from "@reach/router";
import InputDialog from "./InputDialog";
import LockPageDialog from "./LockPageDialog";

let apiRoot;
if (process.env.REACT_APP_USE_ENV === "DEV") {
  apiRoot = process.env.REACT_APP_LOCAL_API;
} else if (process.env.REACT_APP_USE_ENV === "PRODUCTION") {
  apiRoot = process.env.REACT_APP_PRODUCTION_API;
}
console.log(apiRoot);
const Page = ({ pageName, location }) => {
  //State of current page
  const [updateData, setUpdateData] = useState(undefined); //Used to force re-render when new page created has the same name as non-existent page
  const [pageContentState, setPageContentState] = useState("loading");
  const [pageData, setPageData] = useState(undefined);
  const [pageLocked, setPageLocked] = useState(false);
  const [pageToken, setPageToken] = useState(undefined);
  //State of boxes
  const [boxes, setBoxes] = useState(undefined);
  const [editBoxId, setEditBoxId] = useState(false);
  const [editBoxContent, setEditBoxContent] = useState("");
  const [confirmDeleteBox, setConfirmDeleteBox] = useState(false);
  //Page dialogs
  const [addPageDialogVisible, setAddPageDialogVisible] = useState(false); //This needs to be renamed to stay consistent
  const [addPageDialogInput, setAddPageDialogInput] = useState("");
  const [addPageDialogErrors, setAddPageDialogErrors] = useState("");

  const [unlockPageDialogVisible, setUnlockPageDialogVisible] = useState(false); //Break out dialog state into here
  const [unlockPageDialogInput, setUnlockPageDialogInput] = useState("");
  const [unlockPageDialogErrors, setUnlockPageDialogErrors] = useState("");
  const [lockPageDialogVisible, setLockPageDialogVisible] = useState(false); // Break out dialog state into this component

  //Gets data for page with ID that corresponds to URL
  useEffect(() => {
    setPageContentState("loading");
    retrieveToken();
    console.log(pageName);
    const apiURL = `${apiRoot}/pages/?name=${pageName}`;
    fetch(apiURL)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setPageData(data);
        setBoxes(data.Boxes);
        setPageLocked(data.locked);
        setPageContentState("loaded");
      })
      .catch((error) => pageNotFound(error));
  }, [pageName, updateData]);

  const retrieveToken = () => {
    const token = localStorage.getItem(`${pageName}Token`);
    if (token) {
      console.log("loaded token", token);
      setPageToken(token);
    }
  };

  const authHeader = () => {
    if (pageToken) {
      return { Authorization: `Bearer ${pageToken}` };
    } else {
      return {};
    }
  };

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
    const apiURL = `${apiRoot}/boxes/${id}`;

    const updatedBoxes = [...boxes];
    const boxIndex = updatedBoxes.findIndex((box) => box.id === id);
    const updatedBox = { ...updatedBoxes[boxIndex], content: editBoxContent };
    updatedBoxes[boxIndex] = updatedBox;

    await fetch(apiURL, {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        ...authHeader(),
      },
      body: JSON.stringify(updatedBox),
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
    const apiURL = `${apiRoot}/boxes`;

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
        ...authHeader(),
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
    const apiURL = `${apiRoot}/boxes`;

    await fetch(apiURL, {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        ...authHeader(),
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

      const apiURL = `${apiRoot}/boxes/${id}`;

      const response = await fetch(apiURL, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          ...authHeader(),
        },
        body: JSON.stringify({ PageId: pageData.id }),
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

  // const showAddPageModal = () => {
  //   setAddPageVisible(true);
  // };

  const cancelAddPageDialog = () => {
    setAddPageDialogErrors("");
    setAddPageDialogVisible(false);
    setAddPageDialogInput("");
  };

  const addPage = async (name) => {
    const newPage = {
      name: addPageDialogInput,
    };
    const apiURL = `${apiRoot}/pages`;
    let response = await fetch(apiURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPage),
    }).then((response) => response.json());

    if (response.error) {
      setAddPageDialogErrors(response.error);
    } else {
      cancelAddPageDialog();
      navigate(`/${newPage.name}`, { state: { update: true } });
      setUpdateData(newPage.name);
    }
  };

  const repositionBox = async (id, position) => {
    let updatedBoxes = [...boxes];
    const boxIndex = boxes.findIndex((box) => box.id === id);
    const updatedBox = updatedBoxes[boxIndex];
    updatedBox.position = position;
    // Remove old box
    updatedBoxes.splice(boxIndex, 1);
    // Splice box into new position
    updatedBoxes.splice(position - 1, 0, updatedBox);
    updatedBoxes = await updateBoxPositions(updatedBoxes);
    console.log(updatedBoxes);
    setBoxes(updatedBoxes);
  };

  const lockPage = async (email, password) => {
    const pageUpdate = { email, password };

    const apiURL = `${apiRoot}/pages/${pageData.id}`;

    const response = await fetch(apiURL, {
      method: "PATCH",

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pageUpdate),
    }).then((res) => res.json());

    console.log(response);

    setPageLocked(true);
  };

  const cancelUnlockPage = () => {
    setUnlockPageDialogVisible(false);
    setUnlockPageDialogInput("");
    setUnlockPageDialogErrors([]);
  };

  const unlockPage = async () => {
    const apiURL = `${apiRoot}/pages/${pageData.id}`;

    const response = await fetch(apiURL, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password: unlockPageDialogInput }),
    }).then((res) => res.json());
    console.log(response);
    if (response.token) {
      console.log("success");
      setPageToken(response.token);
      setPageLocked(false);
      localStorage.setItem(`${pageName}Token`, response.token);
    } else {
      console.log(response.message);
      setUnlockPageDialogErrors([response.message]);
    }
  };

  const pageContainer = css`
    max-width: 1200px;
    margin: auto;
  `;

  return (
    <div css={pageContainer}>
      {addPageDialogVisible ? (
        <InputDialog
          value={addPageDialogInput}
          onClickSubmit={addPage}
          onClickCancel={cancelAddPageDialog}
          onChange={(e) => setAddPageDialogInput(e.target.value)}
          inputType="text"
          placeholder="enter new page name"
          errors={addPageDialogErrors}
        />
      ) : null}

      {lockPageDialogVisible ? (
        <LockPageDialog
          setLockPageDialogVisible={setLockPageDialogVisible}
          lockPage={lockPage}
        />
      ) : null}

      {unlockPageDialogVisible ? (
        <InputDialog
          onClickSubmit={unlockPage}
          onClickCancel={cancelUnlockPage}
          onChange={(e) => setUnlockPageDialogInput(e.target.value)}
          inputValue={unlockPageDialogInput}
          inputType="password"
          placeholder="enter password"
          errors={unlockPageDialogErrors}
        />
      ) : null}

      {pageContentState === "loaded" || pageContentState === "notFound" ? (
        <PageHeader
          pageName={pageName}
          addBox={addBox}
          pageContentState={pageContentState}
          pathname={location.pathname}
          setAddPageDialogVisible={setAddPageDialogVisible}
          pageLocked={pageLocked}
          setLockPageDialogVisible={setLockPageDialogVisible}
          setUnlockPageDialogVisible={setUnlockPageDialogVisible}
        />
      ) : null}

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
          pathname={location.pathname}
          repositionBox={repositionBox}
          pageLocked={pageLocked}
        />
      ) : null}
    </div>
  );
};

export default Page;
