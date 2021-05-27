import React from 'react';
import { Tabs, TabList, Tab, TabPanels, TabPanel, Heading, useColorModeValue } from '@chakra-ui/react';
import { NFTs } from "../NFTs";
import { useNfts } from "./useNFTs";
import PbNFTDeployment from '../../hardhat/deployments/chainstack/PbNFT.json';




interface IProps {}

const NftsTabs: React.FunctionComponent<IProps> = (props) => {

    const  nftsOwned  = useNfts();

    const bgColor = useColorModeValue("black.500", "black.200");
    const textColor = useColorModeValue("white.500", "black.500");

    return (

        <Tabs align="center" variant="enclosed" alignSelf="flex-start">

            <TabList borderBottom="none">
                <Tab
                    _selected={{
                    // @ts-ignore
                        "> *": { color: "#013A6D" },
                    }}
                >
          <Heading
            color={textColor}
            as="h4"
            fontFamily="Helvetica"
            fontSize="16px"
            fontWeight="700"
            textDecoration="underline"
          >
            NFTS owned
          </Heading>
        </Tab>

      </TabList>
      <TabPanels>
        <TabPanel>
          <NFTs nfts={nftsOwned as any}></NFTs>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export { NftsTabs };