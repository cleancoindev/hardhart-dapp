# PolyBread

PolyBread is a dApp on the Polygon network.

[project site](https://polybread.glitch.me)

## Installation

`npm install` or `yarn install`


## Usage

to run the local EVM (Hardhat):
`npx hardhat node`

to compile contracts (& generate typechain bindings):
`npx hardhat compile`

to deploy contracts to EVM:
`npx hardhat --network [NETWORK] deploy`

to run unit tests (mocha, defined in ./test directory):
`npx hardhat test`

## Project Structure

For conceptual project information, see [whitepaper](./whitepaper.md)

This repo contains both the "backend" (hardhat solidity dev environment) and frontend (next.js)

* Contracts
  * solidity contracts are located in [`./contracts`](./contracts)
  * contract artifacts are stored in [`./artifacts`](./artifacts)
  * generated contract typechain bindings are stored in [`./frontend/src/hardhat`](./frontend/src/hardhat)
  
  
* Tests
  * unit tests are located in [`./test`](./test) and use mocha + chai for verbose testing.
  * contract interaction is imported from typechain. see [`./test/SampleBread.ts`](./test/SampleBread.ts) for an example.

## Deploying Contracts

`npx hardhat --network [NETWORK_ID] deploy`


## Frontend

Frontend of the dApp is located in [`./frontend`](./frontend). It's a React/Next.js app that was initially generated by create-react-app. Frontend is written in typescript and utilizes [Chakra UI](https://chakra-ui.com/docs/getting-started) for UI components. Frontend implementation is loosely based on the Yearn team's [yGift repo](https://github.com/yearn/ygift-ui), due to it being a great example of implementing a similiar stack. 


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

[MIT](./LICENSE)