/** @jsxImportSource @emotion/react */
import Page from "./Page";
import { Router } from "@reach/router";
import { Global, css } from "@emotion/react";
import reset from "../styles/reset";

const globalStyles = css`
  html {
    font-family: "Source Code Pro", monospace;

    /* font-size: 16px; */
  }
  body {
    width: 95%;
    margin: auto;
  }
  h1 {
    font-size: 2em;
  }
`;

function App() {
  return (
    <div>
      <Global styles={[reset, globalStyles]} />
      <Router>
        <Page path="/:pageName" />
      </Router>
    </div>
  );
}

export default App;
