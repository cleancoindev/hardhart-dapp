// SPDX-License-Identifier: MIT


pragma solidity ^0.7.0;


import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


contract PbNFT is ERC721, Ownable {

    using Counters for Counters.Counter;

    Counters.Counter private _tokenIds;

    // Mapping for tokenURI's
    mapping (uint256 => string) private _tokenURIs;


    // Event 
    event NFTMinted(
        address indexed from,
        address indexed owner,
        uint256 indexed tokenId
    );

    constructor () ERC721("PbNFT", "PBNFT") {
        _setBaseURI("ipfs://");
    }


    function mint(address owner, string memory metadataURI) public returns (uint256) {

        _tokenIds.increment();

        uint256 id = _tokenIds.current();
        _safeMint(owner, id);
        _setTokenURI(id, metadataURI);

        // emit event
        emit NFTMinted(msg.sender, owner, id);

        return id;

        
    }


    // /**
    //  * Override isApprovedForAll to whitelist proxy accounts
    //  * whitelisting 0x ERC721 or ERC1155 proxy contract
    //  * see https://docs.opensea.io/docs/other-blockchains for details
    //  * this allows for the user to not pay gas the first time they list an item on OpenSea
    // */
    // function isApprovedForAll(
    //     address _owner,
    //     address _operator
    // ) public override view returns (bool isOperator) {
    //     // Use 0x58807baD0B376efc12F5AD86aAc70E78ed67deaE as the whitelisted address for ERC721's.
    //     if (_operator == address(0x207Fa8Df3a17D96Ca7EA4f2893fcdCb78a304101)) {
    //         return true;
    //     }
        
    //     return ERC1155.isApprovedForAll(_owner, _operator);
    // }



  



}