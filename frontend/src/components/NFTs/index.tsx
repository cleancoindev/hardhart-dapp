import React, { useContext } from 'react';
import { Flex, Stack, Text, Button, Wrap, WrapItem, Center, VStack, Heading, useColorModeValue } from '@chakra-ui/react';

import { PbNFTContext } from '../../hardhat/SymfoniContext';
import { NFT, PbNFTModel } from './NFT';

import { useRouter } from 'next/router';


export const params = [];


interface IProps {
    nfts: any,
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

    console.log('props: ', props);

    // haha look at all this dumb shit i had to do just to get this to work fuck typescript fuck react fuck facebook 
    return (
        <Wrap spacing={"24px"} px={20} justify="center">

            {props?.nfts?.nftsOwned?.length ? ( 
                props?.nfts?.nftsOwned?.map((nft: JSX.IntrinsicAttributes & PbNFTModel & { children?: React.ReactNode; }) => (
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