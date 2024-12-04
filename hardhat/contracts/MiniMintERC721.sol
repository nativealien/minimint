// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {ERC721URIStorage} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract MiniMintERC721 is ERC721, ERC721URIStorage, Ownable {
    string private _contractURI; 
    uint256 private _nextTokenId; 
    uint256[] private _allMintedTokens;
    mapping(address => bool) private _whitelisted;

    error NotOwner(address caller, uint256 tokenId);
    error NotAuthorized(address caller);

    event NFTMinted(address indexed to, uint256 indexed tokenId, string uri);
    event MetadataUpdated(string oldURI, string newURI);
    event NFTBurned(address indexed owner, uint256 indexed tokenId);
    event AddressWhitelisted(address indexed account, bool isWhitelisted);

    constructor(string memory contractMetadataURI) ERC721("MiniMint", "MTK") Ownable(msg.sender) {
        _contractURI = contractMetadataURI;
        _nextTokenId = 1; 
    }

    modifier onlyAuthorized() {
        if (msg.sender != owner() && !_whitelisted[msg.sender]) {
            revert NotAuthorized(msg.sender);
        }
        _;
    }

    function setContractURI(string memory contractMetadataURI) public onlyOwner {
        emit MetadataUpdated(_contractURI, contractMetadataURI);
        _contractURI = contractMetadataURI;
    }

    function contractURI() public view returns (string memory) {
        return _contractURI;
    }

    function whitelistAddress(address account, bool islisted) public onlyOwner {
        _whitelisted[account] = islisted;
        emit AddressWhitelisted(account, islisted);
    }

    function isWhitelisted(address account) public view returns (bool) {
        return _whitelisted[account];
    }

    function safeMint(address to, string memory uri) public onlyAuthorized { 
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

        uint256 index;
        bool found = false;
        for (uint256 i = 0; i < _allMintedTokens.length; i++) {
            if (_allMintedTokens[i] == tokenId) {
                index = i;
                found = true;
                break;
            }
        }
        require(found, "Token ID not found in _allMintedTokens");

        for (uint256 i = index; i < _allMintedTokens.length - 1; i++) {
            _allMintedTokens[i] = _allMintedTokens[i + 1];
        }

        _allMintedTokens.pop();

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