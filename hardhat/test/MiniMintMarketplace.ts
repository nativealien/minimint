import { expect } from "chai";
import { ethers } from "hardhat";

describe("MiniMintMarketplace", function () {
    let owner: any, addr1: any, addr2: any;
    let factory: any, mainCollection: any, marketplace: any;

    beforeEach(async function () {
        [owner, addr1, addr2] = await ethers.getSigners();

        const MiniMintERC721 = await ethers.getContractFactory("MiniMintERC721");
        mainCollection = await MiniMintERC721.deploy("ipfs://metadata-uri");
        const mainCollectionAddress = mainCollection.getAddress();

        const MiniMintFactory = await ethers.getContractFactory("MiniMintFactory");
        factory = await MiniMintFactory.deploy();
        const factoryAddress = factory.getAddress();

        await factory.whitelistUser(await addr1.getAddress(), true);

        const MiniMintMarketplace = await ethers.getContractFactory("MiniMintMarketplace");
        marketplace = await MiniMintMarketplace.deploy(factoryAddress, mainCollectionAddress);
    });

    describe("Deployment", function () {
        it("Should set the correct factory and main collection addresses", async function () {
            expect(await marketplace.factory()).to.equal(await factory.getAddress());
            expect(await marketplace.mainCollection()).to.equal(await mainCollection.getAddress());
        });
    });

    describe("isFactoryDeployedCollection", function () {
        it("Should return true for collections deployed by the factory", async function () {
            const tx = await factory.connect(addr1).deployCollection(
                "TestCollection",
                "TSC",
                "ipfs://metadata"
            );
            const receipt = await tx.wait();
            const collectionAddress = receipt.logs[0].address;
    
            expect(await marketplace.isFactoryDeployedCollection(collectionAddress)).to.be.true;
        });
    
        it("Should return false for non-factory deployed collections", async function () {
            const randomAddress = ethers.Wallet.createRandom().address;
            expect(await marketplace.isFactoryDeployedCollection(randomAddress)).to.be.false;
        });
    
        it("Should return false when the factory has no collections", async function () {
            const EmptyFactory = await ethers.getContractFactory("MiniMintFactory");
            const emptyFactory = await EmptyFactory.deploy();
            const emptyFactoryAddress = await emptyFactory.getAddress();
        
            const MiniMintMarketplace = await ethers.getContractFactory("MiniMintMarketplace");
            const newMarketplace = await MiniMintMarketplace.deploy(emptyFactoryAddress, await mainCollection.getAddress());
        
            expect(
                await newMarketplace.isFactoryDeployedCollection(await mainCollection.getAddress())
            ).to.be.false;
        });
    });

    describe("Supported Collection Validation", function () {
        it("Should validate the main collection as supported", async function () {
            expect(await marketplace.isFactoryDeployedCollection(await mainCollection.getAddress())).to.be.false;
            expect(await marketplace.mainCollection()).to.equal(await mainCollection.getAddress());
        });

        it("Should validate collections deployed by the factory", async function () {
            const tx = await factory.connect(addr1).deployCollection(
                "MyCollection",
                "MYC",
                "ipfs://collection-metadata"
            );
            const receipt = await tx.wait();
            const collectionAddress = receipt.logs[0].address; 

            expect(await marketplace.isFactoryDeployedCollection(collectionAddress)).to.be.true;
        });
    });

    describe("Listing NFTs - Edge Cases", function () {
        beforeEach(async function () {
            await mainCollection.safeMint(await addr1.getAddress(), "ipfs://token-metadata-1");
            await mainCollection.connect(addr1).approve(await marketplace.getAddress(), 1);
        });
    
        it("Should revert if the NFT is already listed", async function () {
            await marketplace.connect(addr1).listNFT(await mainCollection.getAddress(), 1, ethers.parseEther("1"));
    
            await expect(
                marketplace.connect(addr1).listNFT(await mainCollection.getAddress(), 1, ethers.parseEther("2"))
            ).to.be.revertedWith("NFT is already listed");
        });
    
        it("Should revert if the collection is not supported", async function () {
            const RandomCollection = await ethers.getContractFactory("MiniMintERC721");
            const unsupportedCollection = await RandomCollection.deploy("ipfs://random-metadata");
            await unsupportedCollection.safeMint(await addr1.getAddress(), "ipfs://token-metadata-1");
            await unsupportedCollection.connect(addr1).approve(await marketplace.getAddress(), 1);
    
            await expect(
                marketplace.connect(addr1).listNFT(await unsupportedCollection.getAddress(), 1, ethers.parseEther("1"))
            ).to.be.revertedWith("Marketplace: Unsupported collection");
        });
    });
    

    describe("Listing NFTs", function () {
        beforeEach(async function () {
            await mainCollection.safeMint(await addr1.getAddress(), "ipfs://token-metadata-1");
            await mainCollection.connect(addr1).approve(await marketplace.getAddress(), 1);
        });

        it("Should allow NFT owners to list their NFTs", async function () {
            await expect(
                marketplace.connect(addr1).listNFT(await mainCollection.getAddress(), 1, ethers.parseEther("1"))
            )
                .to.emit(marketplace, "NFTListed")
                .withArgs(await addr1.getAddress(), await mainCollection.getAddress(), 1, ethers.parseEther("1"));

            const listing = await marketplace.getListing(await mainCollection.getAddress(), 1);
            expect(listing.seller).to.equal(await addr1.getAddress());
            expect(listing.price).to.equal(ethers.parseEther("1"));
        });

        it("Should revert if the price is zero", async function () {
            await expect(
                marketplace.connect(addr1).listNFT(await mainCollection.getAddress(), 1, 0)
            ).to.be.revertedWith("Price must be greater than zero");
        });

        it("Should revert if the caller is not the owner", async function () {
            await expect(
                marketplace.connect(addr2).listNFT(await mainCollection.getAddress(), 1, ethers.parseEther("1"))
            ).to.be.revertedWith("You are not the owner of this NFT");
        });

        it("Should revert if the marketplace is not approved", async function () {
            await mainCollection.connect(addr1).approve(ethers.ZeroAddress, 1);

            await expect(
                marketplace.connect(addr1).listNFT(await mainCollection.getAddress(), 1, ethers.parseEther("1"))
            ).to.be.revertedWith("Marketplace is not approved to transfer this NFT");
        });
    });

    describe("Buying NFTs", function () {
        beforeEach(async function () {
            await mainCollection.safeMint(await addr1.getAddress(), "ipfs://token-metadata-1");
            await mainCollection.connect(addr1).approve(await marketplace.getAddress(), 1);
            await marketplace
                .connect(addr1)
                .listNFT(await mainCollection.getAddress(), 1, ethers.parseEther("1"));
        });

        it("Should allow users to buy listed NFTs", async function () {
            await expect(
                marketplace.connect(addr2).buyNFT(await mainCollection.getAddress(), 1, {
                    value: ethers.parseEther("1"),
                })
            )
                .to.emit(marketplace, "NFTSold")
                .withArgs(await addr2.getAddress(), await mainCollection.getAddress(), 1, ethers.parseEther("1"));

            expect(await mainCollection.ownerOf(1)).to.equal(await addr2.getAddress());
        });

        it("Should revert if the NFT is not listed", async function () {
            await expect(
                marketplace.connect(addr2).buyNFT(await mainCollection.getAddress(), 2, {
                    value: ethers.parseEther("1"),
                })
            ).to.be.revertedWith("NFT is not listed for sale");
        });

        it("Should revert if incorrect payment is sent", async function () {
            await expect(
                marketplace.connect(addr2).buyNFT(await mainCollection.getAddress(), 1, {
                    value: ethers.parseEther("0.5"),
                })
            ).to.be.revertedWith("Incorrect value sent");
        });
    });

    describe("Delisting NFTs", function () {
        beforeEach(async function () {
            await mainCollection.safeMint(await addr1.getAddress(), "ipfs://token-metadata-1");
            await mainCollection.connect(addr1).approve(await marketplace.getAddress(), 1);
            await marketplace
                .connect(addr1)
                .listNFT(await mainCollection.getAddress(), 1, ethers.parseEther("1"));
        });

        it("Should allow the seller to delist their NFT", async function () {
            await expect(marketplace.connect(addr1).delistNFT(await mainCollection.getAddress(), 1))
                .to.emit(marketplace, "NFTDelisted")
                .withArgs(await addr1.getAddress(), await mainCollection.getAddress(), 1);

            const listing = await marketplace.getListing(await mainCollection.getAddress(), 1);
            expect(listing.seller).to.equal(ethers.ZeroAddress);
            expect(listing.price).to.equal(0);
        });

        it("Should revert if the caller is not the seller", async function () {
            await expect(
                marketplace.connect(addr2).delistNFT(await mainCollection.getAddress(), 1)
            ).to.be.revertedWith("You are not the seller");
        });
    });
});

