// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import "./MiniMintERC721.sol";

contract MiniMintFactory {
    event CollectionDeployed(
        address indexed owner,
        address collectionAddress,
        string name,
        string symbol,
        string contractMetadataURI,
        address marketplaceAddress
    );

    address[] public collections;
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    function deployCollection(
        string memory name,
        string memory symbol,
        string memory contractMetadataURI,
        address marketplaceAddress
    ) external {
        MiniMintERC721 collection = new MiniMintERC721(
            name,
            symbol,
            contractMetadataURI,
            marketplaceAddress
        );
        require(address(collection) != address(0), "Failed to deploy MiniMintERC721");

        collection.transferOwnership(msg.sender);

        collections.push(address(collection));

        emit CollectionDeployed(
            msg.sender,
            address(collection),
            name,
            symbol,
            contractMetadataURI,
            marketplaceAddress
        );
    }

    function getCollections() external view returns (address[] memory) {
        return collections;
    }

    function transferOwnership(address newOwner) external onlyOwner {
        require(newOwner != address(0), "New owner is the zero address");
        owner = newOwner;
    }
}