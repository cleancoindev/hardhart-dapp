// Only need to import waffle, it epends on hardhart-ethers.
import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-ethers";
import "hardhat-deploy-ethers";
import "hardhat-deploy";
import "@symfoni/hardhat-react";
import '@typechain/hardhat'
import "@typechain/ethers-v5";
import "typechain-target-ethers-v5";
import 'tsconfig-paths/register'; // adds support for typescript paths mappings
import 'hardhat-abi-exporter';
import 'hardhat-spdx-license-identifier';
import 'hardhat-log-remover';

import { HardhatUserConfig, task } from "hardhat/config";
import * as chainstack from './chainstack.json';


const fs = require('fs');
const privateKey = fs.readFileSync(".secret").toString().trim();

const CS_USERNAME = chainstack.CS_USERNAME;
const CS_PASSWORD = chainstack.CS_PASSWORD;

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

  "react": {
    providerPriority: ["web3modal", "hardhat"],
    fallbackProvider: "web3modal",
    providerOptions: {
      walletconnect: {
        options: {
          infuraId: "c229331f1d044c8f95e03f54b0ea2f26",

        },
      },
    },

  },

  networks: {
    hardhat: {
      inject: false, // optional. if true it will expose your mnemonic in front end. it would be available as an in page browser wallet/signer which can sign without confirmation.
      accounts: {
        mnemonic: "test test test test test test test test test test test junk", // test test test test test test test test test test test junk
      },
    },
    ropsten: {
      url: "https://ropsten.infura.io/v3/490519a8c6374fbeb1fbe2fd2ca39e1c",
      accounts: [`0x${privateKey}`]
    },
    matic_testnet: {
      url: "https://rpc-mumbai.maticvigil.com",
      accounts: [privateKey]
    },
    matic: {
      url: "https://rpc-mainnet.maticvigil.com",
      accounts: [privateKey]
    },
    chainstack: {
      url: `https://${CS_USERNAME}:${CS_PASSWORD}@nd-075-619-162.p2pify.com`,
      chainId: 80001,
      gasPrice: 20000000000,
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
        version: "0.7.0",
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
    artifacts: "./artifacts",
    deployments: './frontend/src/hardhat/deployments'
  },

  mocha: {
    timeout: 20000
  },

  abiExporter: {
    path: './data/abi',
    clear: true,
    spacing: 2
  },
  spdxLicenseIdentifier: {
    overwrite: false,
    runOnCompile: true,
  },


};


export default config;