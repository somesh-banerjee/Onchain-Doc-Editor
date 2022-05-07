// SPDX-License-Identifier: MIT
pragma solidity 0.8.7;

contract Editor{
    struct Document{
        address owner;
        uint256[] time;
        string[] versions; 
    }
    mapping(string => Document) public docs;
    mapping(address => string[]) myDocs;

    function newDoc(string memory _key) public {
        docs[_key].owner = msg.sender;
        myDocs[msg.sender].push(_key);
    }

    function newVersion(string memory _key, string memory _url) public {
        require(msg.sender == docs[_key].owner,"Only owner can update");
        docs[_key].versions.push(_url);
        docs[_key].time.push(block.timestamp);
    }

    function getAllVersions(string memory _key) public view returns(string[] memory){
        return docs[_key].versions;
    }

    function getMyDocs(address x) public view returns(string[] memory){
        return myDocs[x];
    }
}