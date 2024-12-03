// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {ERC721URIStorage} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract MiniMintERC721 is ERC721, ERC721URIStorage, Ownable {
    string private _contractURI; 
    uint256 private _nextTokenId; 
    uint256[] private _allMintedTokens; 

    error NotOwner(address caller, uint256 tokenId);

    event NFTMinted(address indexed to, uint256 indexed tokenId, string uri);
    event MetadataUpdated(string oldURI, string newURI);
    event NFTBurned(address indexed owner, uint256 indexed tokenId);

    constructor(string memory contractMetadataURI) ERC721("MiniMint", "MTK") Ownable(msg.sender) {
        _contractURI = contractMetadataURI;
        _nextTokenId = 1; 
    }

    function setContractURI(string memory contractMetadataURI) public onlyOwner {
        emit MetadataUpdated(_contractURI, contractMetadataURI);
        _contractURI = contractMetadataURI;
    }

    function contractURI() public view returns (string memory) {
        return _contractURI;
    }

    function safeMint(address to, string memory uri) public {
        uint256 tokenId = _nextTokenId;
        _nextTokenId++;
        _allMintedTokens.push(tokenId); 
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);

        emit NFTMinted(to, tokenId, uri);
    }

    function burn(uint256 tokenId) public {
        if (ownerOf(tokenId) != msg.sender) {
            revert NotOwner(msg.sender, tokenId); 
        }
        _burn(tokenId);

        for (uint256 i = 0; i < _allMintedTokens.length; i++) {
            if (_allMintedTokens[i] == tokenId) {
                _allMintedTokens[i] = _allMintedTokens[_allMintedTokens.length - 1]; 
                _allMintedTokens.pop(); 
                break;
            }
        }
        emit NFTBurned(msg.sender, tokenId);
    }

    function getNextTokenId() public view returns (uint256) {
        return _nextTokenId;
    }

    function getAllMintedTokens() public view returns (uint256[] memory) {
        return _allMintedTokens;
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        ownerOf(tokenId);
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}

