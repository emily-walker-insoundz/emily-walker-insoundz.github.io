//*App.js*//

import React from "React";
import Dropzone from "./reactWebsockets";
import "./index.css"

function App() {
  return (
    <div>
      <div className="container">
        <h1 className="text-center">Drag and Drop Test</h1>
        <Dropzone />
      </div>
    </div>
  );
}

export default App;