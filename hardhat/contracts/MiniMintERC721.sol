// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {ERC721URIStorage} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract MiniMintERC721 is ERC721 {
    constructor() ERC721("MiniMint", "MTK") {}
    /**
     * @dev Allows anyone to mint an NFT.
     * @param to The address of the recipient.
     * @param tokenId The unique ID for the NFT.
     */
    function mint(address to, uint256 tokenId) public {
        _mint(to, tokenId);
    }
}