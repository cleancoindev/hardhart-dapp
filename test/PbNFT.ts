// tests for samplebread contract

import { ethers } from "hardhat";
import chai from "chai";

// typechain contract artifacts are located in front end 
import { PbNFTFactory, PbNFT } from '../frontend/src/hardhat/SymfoniContext';

const { expect } = chai;




describe("PbNFT Contract", function() {

    // Define types (oh yeah baby it's like swift)
    let PbNFT: PbNFT;


    // Before each test we deploy our contract 
    beforeEach(async function() {

        const signers = await ethers.getSigners();

        const pbnftFactory = (await ethers.getContractFactory(
            "PbNFT",
            signers[0]
        )) as PbNFTFactory;

        //deploy contract
        PbNFT = await pbnftFactory.deploy();

        // wait until block is mined
        await PbNFT.deployed();


        expect(PbNFT.address).to.properAddress;
    });


    //TODO: thoroughly test each function of the contract


    
});