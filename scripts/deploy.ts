//deployment script
// usage
// npx hardhat run scripts/deploy.ts --network <network-name>



import { ethers } from "hardhat";



async function main() {

    // get out deployment address
    const [deployer] = await ethers.getSigners();

    console.log(
        "Deploying contracts with the account:",
        deployer.address
    );

    console.log("Account balance:", (await deployer.getBalance()).toString());

    // Deploy
    const factory = await ethers.getContractFactory("PbNFT");
    const contract = await factory.deploy();

    // The address of the contract once mined
    console.log("Contract address:", contract.address);

    // Transaction that was sent to the network
    console.log(contract.deployTransaction.hash);


    // Contract not deployed yet, we must wait until block has been mined
    await contract.deployed();

}


main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });