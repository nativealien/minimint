# **MiniMint**

## **Overview**
This project is a blockchain-based decentralized application (dApp) that showcases the use of Solidity for smart contracts, a Hardhat environment for development and testing, and a TypeScript + React frontend for user interaction. The dApp aims to offer a marketplace for digital assets, including non-fungible tokens (NFTs), minted on and managed by smart contracts on the Ethereum network (Sepolia testnet).

---

## **Features**
- **Smart Contract**: Written in Solidity, designed and deployed using Hardhat.
- **Frontend**: TypeScript-based React app for interacting with the blockchain.
- **Blockchain Integration**: Interaction with Ethereum or compatible networks using ethers.js.
- **Key Functionalities**:
  - User deployed ERC721 contracts, collections.
  - Mint NFTs.
  - Buy and sell NFTs.

---

## **Technologies Used**
- **Backend/Contracts**:
  - Solidity: `^0.8.27`
  - OpenZeppelin Contract templates
  - Hardhat: `^2.22.16`
- **Frontend**:
  - React: `^18.3.1`
  - TypeScript: `^5.6.2`
  - ethers.js: `^6.13.4`
- **Tools**:
  - Hardhat Plugins (ethers, gas reporter, etc.)
  - MetaMask for wallet integration
  - Local blockchain testing with Hardhat Node

---

## **Setup Instructions**

### Prerequisites
Ensure you have the following installed on your machine:
- **Node.js**: `^20.17.0` or higher
- **Yarn**: `^1.22.22` or higher
- **MetaMask**: Browser extension for Ethereum wallet

### Cloning the Repository
```bash
git clone https://github.com/nativealien/minimint
cd minimint
```

