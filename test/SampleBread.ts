// // tests for samplebread contract

// import { ethers } from "hardhat";
// import chai from "chai";

// // typechain contract artifacts are located in front end 
// import { SampleBreadFactory, SampleBread } from '../frontend/src/hardhat/SymfoniContext';

// const { expect } = chai;




// describe("SampleBread Contract", function() {

//     // Define types (oh yeah baby it's like swift)
//     let samplebread: SampleBread;


//     // Before each test we deploy our contract 
//     beforeEach(async function() {

//         const signers = await ethers.getSigners();

//         const samplebreadFactory = (await ethers.getContractFactory(
//             "SampleBread",
//             signers[0]
//         )) as SampleBreadFactory;

//         //deploy contract
//         samplebread = await samplebreadFactory.deploy();

//         // wait until block is mined
//         await samplebread.deployed();


//         expect(samplebread.address).to.properAddress;
//     });


//     //TODO: thoroughly test each function of the contract


    
// });