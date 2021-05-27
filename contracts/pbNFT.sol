// SPDX-License-Identifier: ISC

pragma solidity ^0.7.3;


import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";



contract PbNFT is ERC721, Ownable {

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    // Contstructor def
    constructor() ERC721("PbNFT", "PBNFT") {
        // needed for pinning
        _setBaseURI("ipfs://");
    }
    // @dev Bread is the data structure defined for storing variables inside all PbNFT's
    struct Bread {
        address createdBy;
        string name;
        string description;
        string url;
    }

    // @dev an array contaning the Bread struct for all instances of this ERC721 token
    Bread[] public breads;

    event NFTMinted(
        address indexed from,
        uint256 indexed tokenId
    );

    function mint(address owner, 
        string calldata _name, 
        string calldata _desc,
        string calldata _url ) external {

            uint256 _id = breads.length;

            breads.push(
                Bread({
                    createdBy: owner,
                    name: _name,
                    description: _desc,
                    url: _url
                })
            );

            // I'm not really sure if this is the best way to handle tokenId's yet
            _safeMint(owner, _id);
            emit NFTMinted(msg.sender,  _id );
        }

        // // increment tokenID on each minting
        // // _tokenIds.increment();

        // // uint256 id = _tokenIds.current();
        // // _safeMint(owner, id);
        // // _setTokenURI(id, tokenURI);


        // return id;
    


}