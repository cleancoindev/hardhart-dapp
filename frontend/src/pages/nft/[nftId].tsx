import { BigNumber, ethers } from 'ethers';
import { NextPage, NextPageContext } from 'next';
import { useRouter } from 'next/router';
import { ViewNft } from '../../components/ViewNft';
import { SymfoniPbNFT } from '../../hardhat/SymfoniContext';

import PbNFTDeployment from '../../hardhat/deployments/chainstack/PbNFT.json';

import { PbNFT__factory } from '../../hardhat/typechain';

import { PbNFTModel } from '../../components/NFTs/NFT';




function NftPage({ nft, ownedBy, id }: { nft: PbNFTModel; ownedBy: string; id: string }) {
    return <ViewNft ownedBy={ownedBy} nft={nft} id={id}></ViewNft>;
}


async function getInitialProps(context: NextPageContext) {

    const provider = new ethers.providers.
}