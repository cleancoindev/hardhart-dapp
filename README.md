# PolyBread

PolyBread is a dApp on the Polygon network.

## Installation

`npm install` or `yarn install`


## Usage

to run the local EVM (Hardhat):
`npx hardhat node`

to compile contracts (& generate typechain bindings):
`npx hardhat compile`

to deploy contracts to EVM:
`npx hardhat run scripts/deploy.ts --network [hardhat || matic_testnet]`

to run unit tests (mocha, defined in ./test directory):
`npx hardhat test`

## Project Structure

This repo contains both the "backend" (hardhat solidity dev environment) and frontend (next.js)

* Contracts
  * solidity contracts are located in `./contracts`
  * contract artifacts are stored in `./artifacts`
  * contract typechain bindings are stored in `./frontend/src/hardhat`
  
* Tests
  * unit tests are located in `./tests` and use mocha + chai for verbose testing.
  * contract interaction is imported from typechain. see `./tests/SampleBread.ts` for an example.


## Stack

- [Hardhat](https://hardhat.org)
- [ethers.js]
- [Hardhat-react]
- [next.js]


## Contributing

- Ethereum developer resources: [here](https://github.com/ConsenSys/ethereum-developer-tools-list)
- Smart contract best practices: [here](https://github.com/ConsenSys/smart-contract-best-practices)


Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.



## License

[MIT](https://choosealicense.com/licenses/mit/)