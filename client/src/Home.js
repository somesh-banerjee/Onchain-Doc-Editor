import React, { useState } from "react";
import { useHistory } from "react-router-dom";

export default function Home() {
  const [check, setCheck] = useState(false);
  const [textID, setTextID] = useState("");

  const history = useHistory();

  const handleChk = () => {
    setCheck(true);
  };

  const handleText = (e) => {
    let newTextID = e.target.value;
    setTextID(newTextID);
  };

  const openNewDoc = () => {
    history.push("/newDoc");
    history.go();
  };

  const openSavedDoc = () => {
    history.push(`/documents/${textID}`);
    history.go();
  };

  return (
    <div>
      <nav class="navbar navbar-light bg-light">
        <span class="navbar-brand mb-0 h1">Document</span>
      </nav>

      <div class="container">
        <button
          type="button"
          onClick={openNewDoc}
          class="btn btn-primary btn-lg btn-block"
        >
          New Document
        </button>
        <button
          onClick={handleChk}
          type="button"
          class="btn btn-primary btn-lg btn-block"
        >
          Saved Document
        </button>

        {check && (
          <div className="btn-new-container">
            <textarea
              className="form-control"
              value={textID}
              onChange={handleText}
              placeholder="Enter Document ID"
              name="textid"
              rows="1"
            ></textarea>

            <button onClick={openSavedDoc} type="button" class="btn btn-light">
              Open
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
