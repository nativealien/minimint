// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import "./MiniMintERC721.sol";
import "./MiniMintFactory.sol";

contract MiniMintMarketplace {
    event NFTListed(
        address indexed seller,
        address indexed collection,
        uint256 indexed tokenId,
        uint256 price
    );
    event NFTSold(
        address indexed buyer,
        address indexed collection,
        uint256 indexed tokenId,
        uint256 price
    );
    event NFTDelisted(
        address indexed seller,
        address indexed collection,
        uint256 indexed tokenId
    );

    struct Listing {
        address seller;
        uint256 price;
    }

    mapping(address => mapping(uint256 => Listing)) public listings;
    address public immutable factory;
    address public immutable mainCollection;

    constructor(address _factory, address _mainCollection) {
        factory = _factory;
        mainCollection = _mainCollection;
    }

    modifier onlySupportedCollection(address collection) {
        require(
            collection == mainCollection || isFactoryDeployedCollection(collection),
            "Marketplace: Unsupported collection"
        );
        _;
    }

    function isFactoryDeployedCollection(
        address collection
    ) public view returns (bool) {
        MiniMintFactory factoryContract = MiniMintFactory(factory);
        address[] memory collections = factoryContract.getCollections();
        for (uint256 i = 0; i < collections.length; i++) {
            if (collections[i] == collection) {
                return true;
            }
        }
        return false;
    }

    function listNFT(
        address collection,
        uint256 tokenId,
        uint256 price
    ) external onlySupportedCollection(collection) {
        require(price > 0, "Price must be greater than zero");
        MiniMintERC721 nft = MiniMintERC721(collection);
        require(
            nft.ownerOf(tokenId) == msg.sender,
            "You are not the owner of this NFT"
        );
        require(
            nft.isApprovedForAll(msg.sender, address(this)) ||
                nft.getApproved(tokenId) == address(this),
            "Marketplace is not approved to transfer this NFT"
        );
        require(
            listings[collection][tokenId].price == 0,
            "NFT is already listed"
        ); 
        listings[collection][tokenId] = Listing(msg.sender, price);

        emit NFTListed(msg.sender, collection, tokenId, price);
    }

    function buyNFT(
        address collection,
        uint256 tokenId
    ) external payable onlySupportedCollection(collection) {
        Listing memory listing = listings[collection][tokenId];
        require(listing.price > 0, "NFT is not listed for sale");
        require(msg.value == listing.price, "Incorrect value sent");

        delete listings[collection][tokenId];

        payable(listing.seller).transfer(msg.value);

        MiniMintERC721(collection).safeTransferFrom(
            listing.seller,
            msg.sender,
            tokenId
        );

        emit NFTSold(msg.sender, collection, tokenId, listing.price);
    }

    function delistNFT(
        address collection,
        uint256 tokenId
    ) external onlySupportedCollection(collection) {
        Listing memory listing = listings[collection][tokenId];
        require(listing.seller == msg.sender, "You are not the seller");

        delete listings[collection][tokenId];

        emit NFTDelisted(msg.sender, collection, tokenId);
    }

    function getListing(
        address collection,
        uint256 tokenId
    ) external view returns (Listing memory) {
        return listings[collection][tokenId];
    }
}
