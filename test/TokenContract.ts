// // Import Chai to use asserting functions
// import { ethers } from "hardhat";
// import { expect } from "chai";



// // used to organized tests in mocha
// // describe receives the name of a section of your test suite, and a callback. 
// // the callback must define the tests of that section, callback can't be an async function.
// describe("Token contract", function() {


//     // Mocha has 4 functions for the testrunners lifecycle

//     let Token;
//     let hardhatToken;
//     let owner;
//     let addr1;
//     let addr2;
//     let addrs;


//     // beforeEach will run before each tests, re-deploying the contract every time. it receives a callback, which can be async
//     beforeEach(async function() {

//         // Get contractfactory and signers here
//         Token = await ethers.getContractFactory("Token");
//         [owner, addr1, addr2, ...addrs] = await ethers.getSigners();


//         // deploy our contract, wait for the transaction to be mined
//         hardhatToken = await Token.deploy();
//     });

//     // nesting describe calls creates subsections
//     describe("Deployment", function () {

//         // "it" is a mocha function to define tests
//         // if the callback function is async, mocha will await
//         it("Should set the right owner", async function() {
//             // expect receives value, wraps in assertion object
//             expect(await hardhatToken.owner()).to.equal(owner.address);
//         });

//         it("Should assign the total supply of tokens to the owner", async function() {

//             const ownerBalance = await hardhatToken.balanceOf(owner.address);
//             expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
//         });

//     });

    
//     describe("Transactions", function() {

//         it("Should transfer tokens between accounts", async function () {
//             // Transfer 50 tokens from owner to addr1
//             await hardhatToken.transfer(addr1.address, 50);
//             const addr1Balance = await hardhatToken.balanceOf(addr1.address);
//             expect(addr1Balance).to.equal(50);


//             // Transfer 50 tokens from addr1 to addr2
//             // use connect(sginer) to send a transaction from another account
//             await hardhatToken.connect(addr1).transfer(addr2.address, 50);
//             const addr2Balance = await hardhatToken.balanceOf(addr2.address);
//             expect(addr2Balance).to.equal(50);

//         });

//         it("Should fail if sender doesn't have enough tokens", async function () {
//             const initialOwnerBalance = await hardhatToken.balanceOf(owner.address);

//             // Try sending 1 token from addr1 (0 tokens) to owner (1000 tokens).
//             // require will evaluate false and revert the transaction
//             await expect(
//                 hardhatToken.connect(addr1).transfer(owner.address, 1)
//             ).to.be.revertedWith("Not enough tokens");

//             // Owner balalnce shouldn't have changed.
//             expect(await hardhatToken.balanceOf(owner.address)).to.equal(initialOwnerBalance);

//         });

//         it("Should update balances after transfers", async function () {

//             const initialOwnerBalance = await hardhatToken.balanceOf(owner.address);

//             // Transfer 100 tokens from owner to addr1
//             await hardhatToken.transfer(addr1.address, 100);

//             // Transfer another 50 from owner to addr2
//             await hardhatToken.transfer(addr2.address, 50);


//             // Check balances
//             const finalOwnerBalance = await hardhatToken.balanceOf(owner.address);
//             expect(finalOwnerBalance).to.equal(initialOwnerBalance - 150);

//             const addr1Balance = await hardhatToken.balanceOf(addr1.address);
//             expect(addr1Balance).to.equal(100);

//             const addr2Balance = await hardhatToken.balanceOf(addr2.address);
//             expect(addr2Balance).to.equal(50);

//         });



//     });



// });