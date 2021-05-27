// testing deploy from hardhat-react implementation

import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';


const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {

    const { deployments, getNamedAccounts } = hre;
    const { deploy } = deployments;

    const { deployer } = await getNamedAccounts();

    await deploy("PbNFT", {
        from: deployer,
        contract: "PbNFT",
        args: [],
        log: true,
    });

};

export default func;