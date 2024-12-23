// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {ERC721URIStorage} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract MiniMintERC721 is ERC721, ERC721URIStorage, Ownable {
    string private _contractURI;
    uint256 private _nextTokenId;
    uint256[] private _allMintedTokens;
    address public marketplaceAddress;

    event NFTMinted(address indexed to, uint256 indexed tokenId, string uri);
    event MetadataUpdated(string oldURI, string newURI);
    event NFTBurned(address indexed owner, uint256 indexed tokenId);

    constructor(
        string memory name,
        string memory symbol,
        string memory contractMetadataURI,
        address _marketplaceAddress
    ) ERC721(name, symbol) Ownable(msg.sender) {
        require(_marketplaceAddress != address(0), "Invalid marketplace address");
        _contractURI = contractMetadataURI;
        _nextTokenId = 1;
        marketplaceAddress = _marketplaceAddress;
        _setApprovalForAll(msg.sender, marketplaceAddress, true);
    }

    function setContractURI(
        string memory contractMetadataURI
    ) public onlyOwner {
        emit MetadataUpdated(_contractURI, contractMetadataURI);
        _contractURI = contractMetadataURI;
    }

    function contractURI() public view returns (string memory) {
        return _contractURI;
    }

    function isApprovedForAll(address owner, address operator) public view override(ERC721, IERC721) returns (bool) {
        if (operator == marketplaceAddress) {
            return true; // Automatically approve the marketplace
        }
        return super.isApprovedForAll(owner, operator);
    }

    // Make minting public
    function safeMint(address to, string memory uri) public {
        _mintNFT(to, uri);
    }

    function _mintNFT(address to, string memory uri) internal {
        uint256 tokenId = _nextTokenId;
        _nextTokenId++;
        _allMintedTokens.push(tokenId);
        _mint(to, tokenId); // Use _mint instead of _safeMint
        _setTokenURI(tokenId, uri);

        emit NFTMinted(to, tokenId, uri);
    }

    function burn(uint256 tokenId) public {
        require(ownerOf(tokenId) == msg.sender, "You are not the owner");
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

    function tokenURI(
        uint256 tokenId
    ) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        ownerOf(tokenId); // Ensures the token exists
        return super.tokenURI(tokenId);
    }

    function setMarketplaceAddress(address newMarketplaceAddress) external onlyOwner {
        require(newMarketplaceAddress != address(0), "Invalid marketplace address");
        marketplaceAddress = newMarketplaceAddress;
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view override(ERC721, ERC721URIStorage) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}

