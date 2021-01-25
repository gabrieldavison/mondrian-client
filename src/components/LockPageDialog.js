/** @jsxImportSource @emotion/react */
import { useState } from "react";
import { css } from "@emotion/react";
import Button from "./Button";
import {
  pageDialogContainer,
  pageDialogInput,
  pageDialogStyles,
} from "../styles/pageDialog";

const LockPageDialog = ({ lockPage, setDialogVisible }) => {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [confirmPasswordInput, setConfirmPasswordInput] = useState("");
  const [validationErrors, setValidationErrors] = useState([]);

  const validate = (e) => {
    e.preventDefault();
    const errors = [];
    const emailTest = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailTest.test(emailInput)) {
      errors.push("Please provide a valid email");
    }
    if (passwordInput.length < 5) {
      errors.push("Password must be at least five characters");
    }
    if (passwordInput !== confirmPasswordInput) {
      errors.push("Passwords must match");
    }
    if (errors.length === 0) {
      lockPage(emailInput, passwordInput);
      setEmailInput("");
      setPasswordInput("");
      setConfirmPasswordInput("");
      setDialogVisible("none");
    } else setValidationErrors(errors);
  };

  return (
    <div css={pageDialogContainer}>
      <form css={pageDialogStyles}>
        <input
          css={pageDialogInput}
          type="text"
          placeholder="email"
          value={emailInput}
          onChange={(e) => setEmailInput(e.target.value)}
        ></input>
        <input
          css={pageDialogInput}
          type="password"
          placeholder="password"
          value={passwordInput}
          onChange={(e) => setPasswordInput(e.target.value)}
        ></input>
        <input
          css={pageDialogInput}
          type="password"
          placeholder="confirm password"
          value={confirmPasswordInput}
          onChange={(e) => setConfirmPasswordInput(e.target.value)}
        ></input>
        <div>
          <Button onClick={validate}>submit</Button>
          <Button onClick={() => setDialogVisible("none")}>cancel</Button>
        </div>
        <ul>
          {validationErrors.map((error) => (
            <li>{error}</li>
          ))}
        </ul>
      </form>
    </div>
  );
};

export default LockPageDialog;
