import Page from "./Page";
import { Router } from "@reach/router";

function App() {
  return (
    <div>
      <h1>Mondrian</h1>
      <Router>
        <Page path="/:pageId" />
      </Router>
    </div>
  );
}

export default App;
