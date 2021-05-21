// Only need to import waffle, it epends on hardhart-ethers.
import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-ethers";
import "hardhat-deploy-ethers";
import "hardhat-deploy";
import "@symfoni/hardhat-react";
import '@typechain/hardhat'
import "@typechain/ethers-v5";
import 'tsconfig-paths/register'; // adds support for typescript paths mappings

import { HardhatUserConfig, task } from "hardhat/config";


const fs = require('fs');
const privateKey = fs.readFileSync(".secret").toString().trim();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (args, hre) => {
  const accounts = await hre.ethers.getSigners();
  for (const account of accounts) {
    console.log(account.address);
  }
});


/**
 * @type import('hardhat/config').HardhatUserConfig
 */

const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  react: {
    providerPriority: ["web3modal", "hardhat"],
  },

  networks: {
    hardhat: {
      inject: false, // optional. if true it will expose your mnemonic in front end. it would be available as an in page browser wallet/signer which can sign without confirmation.
      accounts: {
        mnemonic: "test test test test test test test test test test test junk", // test test test test test test test test test test test junk
      },
    },
    matic_testnet: {
      url: "https://rpc-mumbai.maticvigil.com",
      accounts: [privateKey]
    },
    bsc_testnet: {
      url: "https://data-seed-prebsc-1-s1.binance.org:8545",
      chainId: 97,
      gasPrice: 20000000000,
      accounts: [privateKey]
    }
  },

  solidity: {
    compilers: [ 
      {
        version: "0.7.3",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },

  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },

  mocha: {
    timeout: 20000
  },

};


export default config;