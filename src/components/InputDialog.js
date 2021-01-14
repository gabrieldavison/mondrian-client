/** @jsxImportSource @emotion/react */
import Button from "./Button";

import {
  pageDialogContainer,
  pageDialogInput,
  pageDialogStyles,
} from "../styles/pageDialog";

const InputDialog = ({
  addPageErrorMessage,
  onClickSubmit,
  onClickCancel,
  placeholder,
  onChange,
  inputValue,
  inputType,
  errors,
}) => {
  return (
    <div css={pageDialogContainer}>
      <div css={pageDialogStyles}>
        <input
          css={pageDialogInput}
          type={inputType}
          onChange={onChange}
          placeholder={placeholder}
          value={inputValue}
        ></input>
        <div>
          <Button onClick={onClickSubmit}>submit</Button>
          <Button onClick={onClickCancel}>cancel</Button>
        </div>
        <div>{errors}</div>
      </div>
    </div>
  );
};

export default InputDialog;
