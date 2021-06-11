import React, { useContext, useEffect, useState } from 'react';
import {
    Flex,
    Stack,
    Text,
    Button,
    VStack,
    HStack,
    Image,
    useDisclosure,
    Heading,
    Box,
    useMediaQuery,
} from "@chakra-ui/react";
import { PbNFTModel } from '../NFTs/NFT';
import { useParams } from "react-router-dom";
import { CurrentAddressContext, ProviderContext, PbNFTContext } from '../../hardhat/SymfoniContext';

import all from 'it-all';







interface IProps {
    id: string;
    nft: PbNFTModel;
    ownedBy: string;
}


const ViewNft: React.FunctionComponent<IProps> = (props) => {

    const { nft, ownedBy } = props;
    const { id } = props;

    const PbNFT = useContext(PbNFTContext);
    const [currentAddress] = useContext(CurrentAddressContext);
    const [provider] = useContext(ProviderContext);

    console.log(props);

    return (
        <VStack
            minHeight={"884px"}
            width={["auto", "auto", "auto", "920px"]}
            mb={8}
            border={"2px"}
            >

            </VStack>
    );

}


export { ViewNft };