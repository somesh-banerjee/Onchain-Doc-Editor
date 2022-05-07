import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import createDoc from "./web3/createDoc"
import { v4 as uuidV4 } from "uuid";

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

  const openNewDoc = async () => {
    const key = uuidV4()
    try {
      await createDoc(key)  
      history.push(`/documents/${key}`);
      history.go();    
    } catch (er) {
      console.log(er)
    }
    
  };

  const openSavedDoc = () => {
    history.push(`/documents/${textID}`);
    history.go();
  };

  return (
    <div>
      <nav className="navbar navbar-light bg-light">
        <span className="navbar-brand mb-0 h1">Document</span>
      </nav>

      <div className="container">
        <button
          type="button"
          onClick={openNewDoc}
          className="btn btn-primary btn-lg btn-block"
        >
          New Document
        </button>
        <button
          onClick={handleChk}
          type="button"
          className="btn btn-primary btn-lg btn-block"
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

            <button onClick={openSavedDoc} type="button" className="btn btn-light">
              Open
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
