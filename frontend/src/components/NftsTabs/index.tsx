import React, { useContext } from 'react';
import { Tabs, TabList, Tab, TabPanels, TabPanel, Heading, useColorModeValue, Box, keyframes} from '@chakra-ui/react';
import { SpinnerIcon } from '@chakra-ui/icons'; 
import { NFTs } from "../NFTs";
import { useNfts } from "./useNFTs";
import { CurrentAddressContext, ProviderContext, SignerContext, PbNFTContext } from '../../hardhat/SymfoniContext';
import PbNFTDeployment from '../../hardhat/deployments/chainstack/PbNFT.json';
import { ethers } from 'ethers';



interface IProps {}



const NftsTabs: React.FunctionComponent<IProps> = (props) => {

    const   nftsOwned   = useNfts();
    const [signer] = useContext(SignerContext);
    const [provider] = useContext(ProviderContext);
    const [currentAddress] = useContext(CurrentAddressContext);
    const PbNFT = useContext(PbNFTContext);

    const bgColor = useColorModeValue("black.500", "black.200");
    const textColor = useColorModeValue("white.500", "black.500");



    // Fetcher
    // const theFetcher = ["ethereum", {PbNFT?.instance, provider }];

    return (

      // <NftProvider fetcher={theFetcher} >

        <NFTs nfts={nftsOwned as any}></NFTs>

 
  );
};

export { NftsTabs };