// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import "./MiniMintERC721.sol";

contract MiniMintFactory {
    event CollectionDeployed(
        address indexed owner,
        address collectionAddress,
        string name,
        string symbol,
        string contractMetadataURI
    );
    event UserWhitelisted(address indexed user, bool isWhitelisted);

    address[] public collections;
    mapping(address => bool) public whitelisted;
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    modifier onlyWhitelisted() {
        require(whitelisted[msg.sender], "Not whitelisted");
        _;
    }

    function deployCollection(
        string memory name,
        string memory symbol,
        string memory contractMetadataURI
    ) external onlyWhitelisted {
        MiniMintERC721 collection = new MiniMintERC721(contractMetadataURI);

        collection.transferOwnership(msg.sender);

        collections.push(address(collection));

        emit CollectionDeployed(
            msg.sender,
            address(collection),
            name,
            symbol,
            contractMetadataURI
        );
    }

    function getCollections() external view returns (address[] memory) {
        return collections;
    }

    function whitelistUser(
        address user,
        bool isWhitelisted
    ) external onlyOwner {
        whitelisted[user] = isWhitelisted;
        emit UserWhitelisted(user, isWhitelisted);
    }

    function transferOwnership(address newOwner) external onlyOwner {
        require(newOwner != address(0), "New owner is the zero address");
        owner = newOwner;
    }
}
