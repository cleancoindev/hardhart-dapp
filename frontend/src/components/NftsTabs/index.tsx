import React, { useContext } from 'react';
import { Tabs, TabList, Tab, TabPanels, TabPanel, Heading, useColorModeValue, Box, keyframes} from '@chakra-ui/react';
import { SpinnerIcon } from '@chakra-ui/icons'; 
import { NFTs } from "../NFTs";
import { useNfts } from "./useNFTs";
import { CurrentAddressContext, ProviderContext, SignerContext, PbNFTContext } from '../../hardhat/SymfoniContext';
import PbNFTDeployment from '../../hardhat/deployments/chainstack/PbNFT.json';
import { ethers } from 'ethers';
import { NftProvider, useNft } from 'use-nft';


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

      // </NftProvider>

    
    //     <Tabs align="center" variant="enclosed" alignSelf="flex-start">

    //         <TabList borderBottom="none">
    //             <Tab
    //                 _selected={{
    //                 // @ts-ignore
    //                     "> *": { color: "#013A6D" },
    //                 }}
    //             >
    //       <Heading
    //         color={textColor}
    //         as="h4"
    //         fontFamily="Helvetica"
    //         fontSize="16px"
    //         fontWeight="700"
    //         textDecoration="underline"
    //       >
    //         NFTS owned
    //       </Heading>
    //     </Tab>

    //   </TabList>
    //   <TabPanels>
    //     <TabPanel>
    //     {/* <Box>
    //     {props.isLoading ? (
    //           <SpinnerIcon
    //             color="white"
    //             animation={`${spin} 2s infinite linear`}
    //           />
    //     ) : (
    //           "Upload File to IPFS"
    //     )}
    //     </Box> */}
    //       <NFTs nfts={nftsOwned as any}></NFTs>
    //     </TabPanel>
    //   </TabPanels>
    // </Tabs>
  );
};

export { NftsTabs };