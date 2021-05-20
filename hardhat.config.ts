// Only need to import waffle, it epends on hardhart-ethers.
import "@nomiclabs/hardhat-waffle";

const fs = require('fs');
const privateKey = fs.readFileSync(".secret").toString().trim();


/**
 * @type import('hardhat/config').HardhatUserConfig
 */
export default {
  defaultNetwork: "matic",
  networks: {
    hardhat: {},
    matic: {
      url: "https://rpc-mumbai.maticvigil.com",
      accounts: [privateKey]
    }
  },
  solidity: {
    version: "0.8.0",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  mocha: {
    timeout: 20000
  }
};

