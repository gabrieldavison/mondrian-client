/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export const pageDialogContainer = css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  margin: auto;
  z-index: 5;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  background: rgb(0, 0, 0, 0.4);
`;

export const pageDialogStyles = css`
  text-align: center;
`;

export const pageDialogInput = css`
  font-family: inherit;
  font-size: 2em;
  display: block;
  margin: auto;
`;
