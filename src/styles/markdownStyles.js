/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const markdownStyles = css`
  h1,
  h2,
  h3,
  h4 {
    margin: 0.8em 0;
    font-weight: bold;
  }
  h1 {
    font-size: 2.5em;
  }
  h2 {
    font-size: 2em;
  }
  h3 {
    font-size: 1.5em;
  }
  h4 {
    font-size: 1.2em;
  }
  p {
    font-size: 1.2em;
    margin: 0.8em 0;
    overflow-wrap: break-word;
    word-wrap: break-word;
  }
  li {
    margin: 0.4em 0 0.2em 1rem;
  }
  ul {
    list-style-type: square;
    list-style-position: inside;
  }
  ol {
    list-style-type: decimal;
    list-style-position: inside;
  }
  em {
    font-style: italic;
  }
  strong {
    font-weight: bold;
  }
  blockquote {
    margin: 1em 1em 1em 2em;
    margin-left: 2em;
    border-top: 1px dashed #dedede;
    border-bottom: 1px dashed #dedede;
  }
  code {
    margin: 1em 1em 1em 2em;
    /* margin-left: 2em; */
    background-color: #dedede;
    color: black;

    overflow: scroll;
  }
  img {
    max-width: 100%;
  }
  pre {
    max-width: 100%;
    overflow: scroll;
    /* white-space: pre-wrap; */
  }
`;

export default markdownStyles;
