# Sprint Log

The project is divided into five sprints spanning the period from November 25th to December 27th. Each sprint lasts for one week (Monday through Friday) and has a specific objective (e.g., Sprint 1 focuses on project planning and repository setup). A daily log will be maintained in this file to track progress.

--------------------------------------------------------------------------

## Sprint 1: Project Planning and Repository Setup

This week was dedicated to planning and designing the layout for the repository and documentation. As the focus was on preparation, no daily logs were kept for this sprint.

--------------------------------------------------------------------------

## Sprint 2: Hardhat Environment, Writing, and Testing Contracts

> Monday

First day of development. As noted in the project plan, I spent the day setting up a Hardhat environment. I also added an ERC721 template to begin work on tomorrow. Additionally, I reflected on the project plan, as I have a meeting scheduled with the examiner tomorrow to discuss the possibility of adding complexity to the project.

Tomorrow, I will begin developing the main ERC721 contract that will allow all users to mint tokens. As a suggestion for added functionality, I plan to propose the inclusion of a Contract Factory to allow users to create their own collections, as well as an Auction contract to enable users to create auctions for their NFTs.

> Tuesday

I had a productive meeting with the examiner and, based on their guidance, I decided to include a factory contract in the project plan. I feel confident that I can fit this into my current sprint, as I understand the logic behind it well enough to implement it without much difficulty. I will not, however, include auctions as I cant estimate if this will stress the development to much. The addition of the factory will also require some extra frontend work, but I don't anticipate that being an issue.

Today, I successfully added an ERC721 main contract for general minting and wrote comprehensive tests for it. Additionally, I updated the project plan to reflect these changes and sent the revised version to the examiners.

Tomorrow, my focus will be on writing the factory contract and creating the corresponding tests.

> Wednesday

I decided to update the ERC721, so that any wallet (besides the owner) that wants to mint will need to be white listed by the owner. This will need some verification handeling on the frontend, but I have a solution in mind for this. Also updated tests, and used the coverage package. The contract doesnt cover all branches, but i will explore this further when all contracts are deployed and tested at the end of this week.

I have now added a factory contract, along with tests. There are some functions I am considering adding, but I will reflect on these until the end of this week, when I will have time to fine-tune all the contracts. The functions I am considering are:

- Retrieving collections by owner.
- Removing a collection.
- Pausing deployment.

Tomorrow, I will begin writing a Marketplace contract.

> Thursday

Wrote the marketplace contract, with testing. Think I managed to put in all functions needed, but will review all contracts tomorrow.

> Friday (Saturday)

This day didn't progress as planned. Parental responsibilities got in the way, but I think the functions and tests in the contracts are adequate for the assignment anyway. I also believe there will be time for fine-tuning along the way. Another thing to keep in mind is that I have been lazy with comments, so I will make sure to add them along the way.

As of writing this on Saturday, I am planning for the next sprint as well as reflecting on the week that has passed. 

### Retrospect:

I think this sprint has served its purpose! The plan was to write and test the contracts I need, and this has been achieved, even though none of them have been deployed to the testnet or verified yet. I will fit this into the start of the next sprint, as it shouldn’t be a problem!

--------------------------------------------------------------------------

## Sprint 3: Frontend Setup and Integration with Blockchain

> Monday

I have now set up a frontend using yarn create vite with TypeScript. I also added a basic structure with React Router DOM, including simple navigation and two pages: "Home" and "About" (both currently empty). Additionally, I created scripts in the root directory to simplify starting the Hardhat node, deploying contracts, and running the client simultaneously. Also added a simple function using ethers, to check if the local chain is running.

```js
"scripts": {
    "node": "cd hardhat && npx hardhat node",
    "client": "cd client && yarn dev",
    "node-client": "npm-run-all --parallel node client",
    "deploy": "cd hardhat && npx hardhat run scripts/deploy.js --network localhost",
    "deploy-client": "npm-run-all deploy client",
    "start-all": "npm-run-all --parallel node deploy-and-client"
}
```

For some reason I thought I could make a function check for verification possibilities without accually deploying them on test net. Maybe you can but I got to the point where I just put it on hold. Ill fucus on the frontend more, and start testing the contracts on local chain before deploying to testnet. Added deployment script.

> Tuesday

Added wallet connection and listeners to the Ethereum window object.

> Wednesday

Today i broke up the the task of integrating contracts into 3 sepearate tasks.

Functions for:

- Main ERC721 Contract
- ERC721 Factory Contract
- Marketplace contract

Completed task to add functionoallity for the front end to call my main ERC721 conract. Next task will be to get IPFS up and running, so that i can do frontend testing with real metadata.

> Thursday

I have now added IPFS comunication through pinata, for pinning, unpinning and fetching data through ipfs. To test the the chain of events i have also added a 'MintNFT' component in witch you set name, description and image file that gets proccessed into CIDs. This component will come of use in the collection creation feature aswell, and might be renamed and/or refactored.

I also added in a .env file to secure keys as I communicate with the pinata API. Next up is getting the functions working for the factory contract.

> Friday (weekend)

I added functions for the factory contract and made some simple calls from the app component. I also connected the marketplace and realized that I need to modify the contract to automatically mint NFTs upon deployment. This will ensure the exam project has content to display. I've added a new task to address this.

I made some changes to the contracts and decided to remove the whitelist functions for simplicity, ensuring I have enough time to complete the frontend 100%. This means anyone can now mint on the contracts. I deployed the contracts to Sepolia and will transition from the test environment as I begin developing the frontend next week.

### Retrospect:

This week has been a challenge. I worked a lot over the weekend, and I managed to get everything done according to plan!

--------------------------------------------------------------------------

## Sprint 4: User experience and Design

> Monday

> Tuesday

> Wednesday

> Thursday

> Friday

### Retrospect:

--------------------------------------------------------------------------

## Sprint 5: Finalizing, Documentation and Deployment

> Monday

> Tuesday

> Wednesday

> Thursday

> Friday

### Retrospect:

