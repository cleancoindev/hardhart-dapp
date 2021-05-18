

// const { expect } = require("chai");
// const { ethers } = require("hardhat");

// describe("Token contract", function() {
    
//     it("Deployment should assign the total supply of tokens to the owner", async function() {

//         // Signer object represents an Eth account. Getting list of accounts in the node we're connected to, and only keeping the first one.
//         const [owner] = await ethers.getSigners();

//         // ContractFactory is an asbstraction used to deploy new smart contracts. Token is a factory for instances of our token contract
//         const Token = await ethers.getContractFactory("Token");

//         // .deploy() starts deployment and returns a promise that resolves to a contract
//         const hardhatToken = await Token.deploy();

//         // Get account balance
//         const ownerBalance = await hardhatToken.balanceOf(owner.address);

//         // Checking that the total supply is equal to what was minted to the deployment address
//         expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
//     });
// });


