/** @jsxImportSource @emotion/react */
import Page from "./Page";
import { Router } from "@reach/router";
import { Global, css } from "@emotion/react";
import reset from "../styles/reset";

const globalStyles = css`
  html {
    box-sizing: border-box;
  }
  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  html {
    font-family: "Source Code Pro", monospace;
  }
  body {
    width: 100%;
    margin: auto;
  }
  h1 {
    font-size: 2em;
  }
  a {
    color: #45a4e9;
  }
`;

function App() {
  return (
    <div>
      <Global styles={[reset, globalStyles]} />
      <Router>
        <Page path="/:pageName" />
        <Page path="/" pageName={"home"} />
      </Router>
    </div>
  );
}

export default App;
