const { ethers } = require("hardhat");

// npx hardhat run scripts/deploy.js --network <network-name>


async function main() {

    const [deployer] = await ethers.getSigners();

    console.log(
        "Deploying contracts with the account:",
        deployer.address
    );

    console.log("Account balance:", (await deployer.getBalance()).toString());

    // // poor readability, fix
    // const Token = await ethers.getContractFactory("Token");
    // const token = await Token.deploy();

    const PolyBread = await ethers.getContractFactory("PolyBread");
    const polybread = await PolyBread.deploy();

    // console.log("Token address:", token.address);
    console.log("PolyBread address:", polybread.address);
}


main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });