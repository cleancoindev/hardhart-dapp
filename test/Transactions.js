

// const { expect } = require("chai");
// const { ethers } = require("hardhat");

// describe("Transactions", function() {

//     it("Should transfer tokens between accounts", async function() {

//         // Get addresses
//         const [owner, addr1, addr2] = await ethers.getSigners()

//         // Returns promise containing token object
//         const Token = await ethers.getContractFactory("Token");

//         const hardhatToken = await Token.deploy();

//         // Transfers 50 tokens from owner to addr1
//         await hardhatToken.transfer(addr1.address,50);
//         expect(await hardhatToken.balanceOf(addr1.address)).to.equal(50);

//         // Transfers 50 tokens from addr1 to addr2
//         await hardhatToken.connect(addr1).transfer(addr2.address, 50);
//         expect(await hardhatToken.balanceOf(addr2.address)).to.equal(50);
//     });
// });