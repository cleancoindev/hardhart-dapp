//SPDX-License-Identifier: MIT

pragma solidity ^0.7.3;


import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";


contract PbNFT is ERC721 {

    using Counters for Counters.Counter;

    Counters.Counter private _tokenIds;


    constructor () ERC721("PbNFT", "PBNFT") {
        _setBaseURI("ipfs://");
    }


    function mint(address owner, string memory metadataURI) public returns (uint256) {

        _tokenIds.increment();

        uint256 id = _tokenIds.current();
        _safeMint(owner, id);
        _setTokenURI(id, metadataURI);

        return id;

    }



}