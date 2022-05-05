// SPDX-License-Identifier: MIT
pragma solidity 0.8.7;

contract Editor{
    struct Document{
        address owner;
        uint256[] time;
        string[] versions; 
    }
    mapping(string => Document) public docs;

    function newDoc(string memory _key) public {
        docs[_key].owner = msg.sender;
    }

    function newVersion(string memory _key, string memory _url) public {
        require(msg.sender == docs[_key].owner,"Only owner can update");
        docs[_key].versions.push(_url);
        docs[_key].time.push(block.timestamp);
    }

    function getAllVersions(string memory _key) public view returns(string[] memory){
        return docs[_key].versions;
    }
}