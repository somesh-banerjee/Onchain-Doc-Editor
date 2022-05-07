import React, { useState,useEffect } from "react";
import { useHistory } from "react-router-dom";
import createDoc from "./web3/createDoc"
import { v4 as uuidV4 } from "uuid";
import { ethers } from 'ethers'
import Web3Modal from 'web3modal'

import {
  contractAddress
} from './web3/config'


import ABI from "./web3/Editor.json"

export default function Home() {
  const [check, setCheck] = useState(false);
  const [textID, setTextID] = useState("");
  const [docs, setDocs] = useState([]);

  const history = useHistory();

  useEffect(() => {
    const getData = async() => {
      const web3Modal = new Web3Modal()
      const connection = await web3Modal.connect()
      const provider = new ethers.providers.Web3Provider(connection)
      const signer = provider.getSigner()
      const Contract = new ethers.Contract(contractAddress, ABI, signer)
      const userAddress = await signer.getAddress()
      try {
          let transaction = await Contract.getMyDocs(userAddress)
          console.log(transaction);
          setDocs(transaction)
      } catch (err) {
          console.log(err);
      }
    }
    getData()
  },[]);

  const handleChk = () => {
    setCheck(!check);
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
        <div>
          <h2>Your Documents</h2>
          <ul>
          { docs &&
            docs.map(i=>(
              <li key={i._id}>
                <a href={`/documents/${i}`}>{i}</a>
              </li>
            ))
          }
          </ul>
        </div>
        <button
          onClick={handleChk}
          type="button"
          className="btn btn-primary btn-lg btn-block"
        >
          Other Saved Document
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
