import { BigNumber, ethers } from 'ethers';
import { NextPage, NextPageContext } from 'next';
import { useRouter } from 'next/router';
import { ViewNft } from '../../components/ViewNft';
import { SymfoniPbNFT } from '../../hardhat/SymfoniContext';

import PbNFTDeployment from '../../hardhat/deployments/chainstack/PbNFT.json';

import { PbNFT__factory } from '../../hardhat/typechain';

import { PbNFTModel } from '../../components/NFTs/NFT';

import { Network } from '@ethersproject/networks';


const INFURA_ID = process.env.INFURA_ID;
const INFURA_SECRET = process.env.INFURA_SECRET;


const maticTestnet: Network = {
    name: 'maticmum',
    chainId: 80001,
    _defaultProvider: (providers) => new providers.JsonRpcProvider(`https://polygon-mumbai.infura.io/v3/${INFURA_ID}`)
}

function NftPage({ nft, createdBy, ownedBy, id }: { nft: PbNFTModel; createdBy: string, ownedBy: string; id: string }) {
    return <ViewNft ownedBy={ownedBy} nft={nft} id={id}></ViewNft>;
}


async function getInitialProps(context: NextPageContext) {
    // MARK:  edit provider for mainnet

    

    // const provider = new ethers.providers.InfuraProvider("maticmum",   {projectId: INFURA_ID, projectSecret: INFURA_SECRET});
    const provider =  ethers.getDefaultProvider(maticTestnet);
    console.log('infura provider', provider);

    const contractAddress = PbNFTDeployment.address;
    const instance = PbNFT__factory.connect(contractAddress, provider);

    const PbNFT: SymfoniPbNFT = {
        instance: instance,
        factory: undefined,
    };

    let nftId = String(context.query.nftId);

    // should grab the instance from quering the tokenByIndex based on our passed Id.
    let nft = await PbNFT.instance?.tokenByIndex(nftId);

    console.log('mft:',nft);

    if (nft) {
        console.log(nft);
        // maybe
        nft = { ...nft, id: nftId } as any;

        // Setup event filters to check if who owns this shit
        const nftMintedEventFilter = PbNFT.instance?.filters?.NFTMinted(
            null,
            null,
            BigNumber.from(nftId).toHexString(),
            
        );

        const transferEventFilter = PbNFT?.instance?.filters?.Transfer(null, null, BigNumber.from(nftId).toHexString());

        try {
            const [nftMintedLog] = await provider?.getLogs({...nftMintedEventFilter, address: contractAddress, fromBlock: 'latest' });
            const parsedNftMintedLog = PbNFT?.instance?.interface?.parseLog(nftMintedLog)?.args;
    
    
            const transferLogs = await provider?.getLogs({...transferEventFilter, address: contractAddress,  fromBlock: 'latest'});
            const parsedTransferLogs = PbNFT?.instance?.interface?.parseLog(transferLogs[transferLogs.length - 1])?.args;


            if (parsedNftMintedLog && parsedTransferLogs) {
                const [createdBy] = parsedNftMintedLog;
                const [, ownedBy] = parsedTransferLogs;
    
                return {
                    id: nftId,
                    nft,
                    createdBy: (await provider?.resolveName(createdBy)) || createdBy,
                    ownedBy: (await provider?.resolveName(ownedBy)) || ownedBy,
                };
            } else if (parsedNftMintedLog && !parsedTransferLogs) {
                console.log('no parse transfer found, elif condition hit');
    
                const [createdBy] = parsedNftMintedLog;
    
                return {
                    id: nftId,
                    nft,
                    createdBy: (await provider?.resolveName(createdBy)) || createdBy,
                };
            }

        } catch (e) {
            console.error(e);
        }




    }


    return {};
}


NftPage.getInitialProps = getInitialProps;


export default NftPage;