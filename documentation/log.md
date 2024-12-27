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

I didn't have much time to produce a sprint plan last week, so I started off by doing this. I will not be focusing too much on design initially and will keep things very basic in order to focus more on producing an application with zero bugs. If time allows, I might add tasks to improve the design later on in this sprint, as well as in the last one.

I have added tasks for the week and created a wireframe today. I will not add this to the project yet and will keep the task open as I progress.

The basic structure has been set up, with most pages added. For easier development, all page components have been included in the main navbar. This allows for better navigation through the app while developing the functional components. I have also integrated an Infura connection for users who don’t have MetaMask or simply don’t want to connect.

Made the front 'Home' page, will add content later (welcome text) and have decided to utilize React Markdown to store content in .md files. I also added my wireframe, this might be updated abit as I go but the basic idea and structure is there.

Added AppContext for universal state handling, along with some test calls towards the deployed contracts.

> Tuesday

I have now added the gallery page, that only displays the main ERC721 collection and the pre minted NFTs. For this I created a new file for bundeling fetches, and custom contract calls. The function I added in this file first, was to fetch URI's from the main collection, along with the NFTs minted on it. Put together the metadata in objects along with keys to identify the parent/child relationship, along with the owner/owners of each item. This makes it easier to handle, and next up I will utilize it creating the display page for collections. 

Created basic structure and style for the collection display page, also refined navigation to toggle between collection and nfts, aswell as making sure a faulty navigation path ends up on NotFound where I put in a "Go back" button.

Made a display page for NFTs aswell. Had errors on my frequency calls against infura, when user isnt connected with metamask. So I added a delay function, placed in the ERC721.ts. I will soon add a utils folder, as I see the need of more multi use functions.

> Wednesday

I have now added marketplace functionallity to the app, with minor details left. I will continue to add more refined types to make the processs easier as the app starts to grow! After that I will start working on contract deployment from the factory contract. To do this, i decided to create a modal, that can be used for any popup. Amongst other things, minting and collection deployment!

Made the modal, added some loading features.

> Thursday

I have now completed the collection creation feature, against my factory contract. It was abit of a challange, as my ERC721 takes in 4 NFT URIs on deployment to make the application look better. Im thinking of adding a templet deploy, and store all info in a folder so that the examinors can push a 'Fast deploy example collection' to see it working. Another quite enoying thing is that I realised that the factory is set as owner over the NFTs that mints on deployment... This will need to be fixed, and all it really takes is to pass an address on deployment of the ERC721. So I will need to redeploy my contracts, but I had a feeling that would be needed along the way. I will also need to reshape the tests, so that they run flawlessly in test env.

I refactored alot of code today, as I noticed ways to optimize now that I have two collections deployed. Its starting to look pretty good, and the only feature thats left is to be able to mint! And then its mostly details, such as changing metadata for owners, burn nfts and AHOLE lot of styling!

> Friday

Its now possible to mint on collections.

I have now refactored the CSS and organized the code into separate files for each component. Additionally, I created an element.css file for general element styling and a variables.css file to manage variables that control the app's overall styling.

There's still more work to be done, but the app is starting to take shape. The design style I chose is minimalistic, focusing on a black, white, and grayscale palette, with subtle hints of color in certain areas. I have now also added the React Markdown package, and moved my content to .md files that gets imported into the Section component.

> Weekend

Had some time over this weekend, so I refactored and deployed new contracts! The application is now running pretty much flawlessly, with no restrictions on who can mint or interact with it (wich will be added in security flaws in the final report). I have however not adjusted the tests, and hope I will find time before the next sprint that starts tomorrow!

### Retrospect:

Its been a packed week, and there is some detail work. But Im happy with how the app looks, also how true it stays to the vision I had of it when I begun! Next week will be spent testing for bugs, refining code, documenting and putting together a final report along with presentation. I will spend some time this weekend to put in the tasks in my project board for the last sprint.

--------------------------------------------------------------------------

## Sprint 5: Refactor, build and final rapport

> Monday

It's all in the details... This sprint is focused on harmonizing the project plan, application, and final report, along with the Pecha Kucha presentation. I’ve decided to limit this sprint’s tasks to coding and application development only, ensuring all work on the final report is quietly managed behind the scenes. Plus, it’s the day before Christmas 🎄—so the festive spirit is definitely in the air!

> Tuesday

Lottie installed, added animation for loading screen.

> Rest of the week...

The holydays has taken its tole on the process... I had upds and downs, and I have too admit I lost my trail on this log and decided too just keep track in one final 'rest of the week' heading. 

I have redeployed all the contracts. The reason for this was to remove some functionality. I actually tried to implement a burn function but ran into trouble. When time became a factor, I realized that this wasn’t part of the project plan to begin with, so I decided to remove it. Because of this, I also removed the functions from the ERC721 contract and refactored the others to match the changes. I also added some new tests, which are very basic since I already knew the contracts worked well with my frontend!

### Retrospect:

