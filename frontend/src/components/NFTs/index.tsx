import React, { useContext } from 'react';
import { Flex, Stack, Text, Button, Wrap, WrapItem, Center, VStack, Heading, useColorModeValue } from '@chakra-ui/react';

import { PbNFTContext } from '../../hardhat/SymfoniContext';
import { NFT, PbNFTModel } from './NFT';

import { useRouter } from 'next/router';


export const params = [];


interface IProps {
    nfts: [PbNFTModel & { description?: string }];
}


const NoNFTs: React.FC = () => {

    const router = useRouter();
    const bgColor = useColorModeValue("black.500", "black.200");
    const textColor = useColorModeValue("white.500", "black.500");

    return (

        <Center width="100%" height="100%" py={"30vh"}>
            <VStack spacing={4}>
                <Heading as="h2" fontFamily="Helvetica" fontWeight="bold" fontSize="40px">
                    you have no NFT's! lol!!!!
                </Heading>

                <Button
                    borderColor={bgColor}
                    borderRadius="0px"
                    variant="outline"
                    _hover={{ border: "1px solid grey", background: "transparent" }}
                    color={textColor}
                    fontFamily="Helvetica"
                    fontSize="16px"
                    minWidth="200px"
                    height="56px"
                    onClick={() => {
                        router.push("/mint-nft");
                    }}
                >
                    Create a NFT
                </Button>
            </VStack>
        </Center>
    );
};

const NFTs: React.FunctionComponent<IProps> = (props) => {

    return (
        <Wrap spacing={"24px"} px={6} justify="center">
            {props?.nfts?.length ? ( 
                props?.nfts.map((nft) => (
                    <WrapItem>
                        <NFT {...nft}></NFT>
                    </WrapItem>
                ))
            ) : (
                <NoNFTs></NoNFTs>


            )}
        </Wrap>


    );
};

export { NFTs}