/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useEffect, useState, useCallback } from "react";
import PageContent from "./PageContent";
import PageHeader from "./PageHeader";
import { navigate } from "@reach/router";
import InputDialog from "./InputDialog";
import LockPageDialog from "./LockPageDialog";
import validateAddPageInput from "../utils/validateAddPageInput";
import OptionsDialog from "./OptionsDialog";

let apiRoot;
if (process.env.REACT_APP_USE_ENV === "DEV") {
  apiRoot = process.env.REACT_APP_LOCAL_API;
} else if (process.env.REACT_APP_USE_ENV === "PRODUCTION") {
  apiRoot = process.env.REACT_APP_PRODUCTION_API;
}
const Page = ({ pageName, location }) => {
  //State of page
  const [pageContentState, setPageContentState] = useState("loading");
  const [pageData, setPageData] = useState(undefined);
  const [pageLocked, setPageLocked] = useState(false);
  const [pageToken, setPageToken] = useState(undefined);
  //State of edit box
  const [editBoxId, setEditBoxId] = useState(false);
  const [editBoxContent, setEditBoxContent] = useState("");
  const [confirmDeleteBox, setConfirmDeleteBox] = useState(false);
  //State of page dialogs
  // These need to be refactored into one piece of state that decides which dialog is visible
  const [dialogVisible, setDialogVisible] = useState("none");
  const [addPageDialogInput, setAddPageDialogInput] = useState("");
  const [addPageDialogErrors, setAddPageDialogErrors] = useState("");
  const [unlockPageDialogInput, setUnlockPageDialogInput] = useState("");
  const [unlockPageDialogErrors, setUnlockPageDialogErrors] = useState("");

  const retrieveToken = useCallback(() => {
    const token = localStorage.getItem(`${pageName}Token`);
    if (token) {
      setPageToken(token);
      setPageLocked(false);
    }
  }, [pageName]);

  const getPageData = useCallback(() => {
    const apiURL = `${apiRoot}/pages/?name=${pageName}`;
    fetch(apiURL)
      .then((res) => res.json())
      .then((data) => {
        setPageData(data);
        setPageLocked(data.locked);
        retrieveToken();
        setPageContentState("loaded");
      })
      .catch((error) => pageNotFound(error));
  }, [pageName, retrieveToken]);

  //Gets data for page with ID that corresponds to URL
  useEffect(() => {
    setPageContentState("loading");
    getPageData();
    // retrieveToken();
  }, [pageName, getPageData, retrieveToken]);

  const getAuthHeader = () => {
    if (pageToken) {
      return { Authorization: `Bearer ${pageToken}` };
    } else {
      return {};
    }
  };

  const pageNotFound = (error) => {
    setPageContentState("notFound");
  };

  const switchEditBox = (id, content) => {
    setEditBoxId(id);
    setEditBoxContent(content);
  };

  const saveBox = async (id) => {
    const apiURL = `${apiRoot}/boxes/${id}`;
    const updatedBoxes = [...pageData.Boxes];
    const boxIndex = updatedBoxes.findIndex((box) => box.id === id);
    const updatedBox = { ...updatedBoxes[boxIndex], content: editBoxContent };
    updatedBoxes[boxIndex] = updatedBox;

    await fetch(apiURL, {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeader(),
      },
      body: JSON.stringify(updatedBox),
    });

    cancelEditBox();
    setPageData({ ...pageData, Boxes: updatedBoxes });
  };

  const cancelEditBox = () => {
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
        ...getAuthHeader(),
      },
      body: JSON.stringify(newBoxData), // body data type must match "Content-Type" header
    });
    newBox = await newBox.json();

    let newBoxesArray = [newBox, ...pageData.Boxes];
    //Update box position to compensate for new box
    newBoxesArray = await updateBoxPositions(newBoxesArray);
    setPageData({ ...pageData, Boxes: newBoxesArray });
    switchEditBox(newBox.id, newBox.content);
  };

  //reorders boxes when a box is added or deleted

  const updateBoxPositions = async (array) => {
    let updatedArray = array.map((item, i) => {
      const updatedItem = item;
      updatedItem.position = i + 1;
      return updatedItem;
    });
    const apiURL = `${apiRoot}/boxes`;

    await fetch(apiURL, {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeader(),
      },
      body: JSON.stringify(updatedArray),
    });

    return updatedArray;
  };

  const deleteBox = async (id) => {
    if (confirmDeleteBox) {
      const updatedBoxes = [...pageData.Boxes];
      const deleteIndex = updatedBoxes.findIndex((box) => box.id === id);
      updatedBoxes.splice(deleteIndex, 1);

      const apiURL = `${apiRoot}/boxes/${id}`;

      await fetch(apiURL, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeader(),
        },
        body: JSON.stringify({ PageId: pageData.id }),
      });

      updateBoxPositions(updatedBoxes);
      setPageData({ ...pageData, Boxes: updatedBoxes });
      setConfirmDeleteBox(false);
      cancelEditBox();
    } else {
      setConfirmDeleteBox(true);
    }
  };

  const cancelAddPageDialog = () => {
    setAddPageDialogErrors("");
    setDialogVisible("none");
    setAddPageDialogInput("");
  };

  const addPage = async (name) => {
    if (!validateAddPageInput(addPageDialogInput))
      return setAddPageDialogErrors(
        "page name may only contain lower case letters, numbers, '-' and '_'"
      );
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
      //New pages come back without boxes array.
      setPageData({ ...response, Boxes: [] });
      setPageContentState("loaded");
    }
  };

  const repositionBox = async (id, position) => {
    let updatedBoxes = [...pageData.Boxes];
    const boxIndex = updatedBoxes.findIndex((box) => box.id === id);
    const updatedBox = updatedBoxes[boxIndex];
    updatedBox.position = position;
    // Remove old box
    updatedBoxes.splice(boxIndex, 1);
    // Splice box into new position
    updatedBoxes.splice(position - 1, 0, updatedBox);
    updatedBoxes = await updateBoxPositions(updatedBoxes);
    setPageData({ ...pageData, Boxes: updatedBoxes });
  };

  const lockPage = async (email, password) => {
    const pageUpdate = { email, password };
    const apiURL = `${apiRoot}/pages/${pageData.id}`;
    await fetch(apiURL, {
      method: "PATCH",

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pageUpdate),
    }).then((res) => res.json());
    setPageData({ ...pageData, locked: true });
    setPageLocked(true);
  };
  const handleLockPageClick = () => {
    if (pageData.locked) {
      localStorage.removeItem(`${pageName}Token`);
      setPageLocked(true);
    } else {
      setDialogVisible("lockPage");
    }
  };

  const cancelUnlockPage = () => {
    setDialogVisible("none");
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
    if (response.token) {
      setPageToken(response.token);
      setPageLocked(false);
      localStorage.setItem(`${pageName}Token`, response.token);
      cancelUnlockPage();
    } else {
      setUnlockPageDialogErrors([response.message]);
    }
  };

  const exportPageData = () => {
    const dataToExport = pageData.Boxes.map((box) => {
      return { position: box.position, content: box.content };
    });

    const dataJson = JSON.stringify(dataToExport);
    const dataBlob = new Blob([dataJson], { type: "application/json" });
    const dataURL = URL.createObjectURL(dataBlob);
    const downloadLink = document.createElement("a");
    downloadLink.download = "exported-data.json";
    downloadLink.href = dataURL;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const importPageData = (e) => {
    const importedFile = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsText(importedFile);
    fileReader.onload = async (e) => {
      const apiURL = `${apiRoot}/box-collection`;
      let importedPageData = JSON.parse(e.target.result);

      importedPageData = importedPageData.map((item) => {
        return { ...item, PageId: pageData.id };
      });

      let newBoxes = await fetch(apiURL, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeader(),
        },
        body: JSON.stringify(importedPageData), // body data type must match "Content-Type" header
      });
      newBoxes = await newBoxes.json();

      const updatedBoxes = await updateBoxPositions([
        ...newBoxes,
        ...pageData.Boxes,
      ]);
      setPageData({ ...pageData, Boxes: updatedBoxes });
      setDialogVisible("none");
    };
  };

  const pageContainer = css`
    max-width: 1200px;
    margin: auto;
  `;

  return (
    <div css={pageContainer}>
      {dialogVisible === "options" ? (
        <OptionsDialog
          exportPageData={exportPageData}
          importPageData={importPageData}
          onClickCancel={() => setDialogVisible("none")}
        />
      ) : null}

      {dialogVisible === "addPage" ? (
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

      {dialogVisible === "lockPage" ? (
        <LockPageDialog
          setDialogVisible={setDialogVisible}
          lockPage={lockPage}
        />
      ) : null}

      {dialogVisible === "unlockPage" ? (
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
          setDialogVisible={setDialogVisible}
          pageLocked={pageLocked}
          handleLockPageClick={handleLockPageClick}
        />
      ) : null}

      {pageContentState === "loading" ? <h1>loading</h1> : null}
      {pageContentState === "notFound" ? <h1>page does not exist</h1> : null}
      {pageContentState === "loaded" ? (
        <PageContent
          pageContentState={pageContentState}
          pageData={pageData}
          boxes={pageData.Boxes}
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
