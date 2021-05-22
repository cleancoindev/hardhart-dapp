// Samplebread index.ts 
// this is where the page for interacting with the samplebread smart contract is located


import React, { useContext, useEffect, useState } from 'react';
import { Button, VStack, Input, FormControl, FormLabel, FormErrorMessage, Text, HStack } from '@chakra-ui/react';
import { SampleBreadContext } from '../../hardhat/SymfoniContext';
import { ethers } from 'ethers';



// maybe need token props
interface IProps {}

interface IContentProps {}
const Content: React.FC<IContentProps> = (props) => {

    const [SampleBread] = useContext(SampleBreadContext);


    return (
        <VStack spacing={4} textAlign="left" width={["auto", "auto", "auto", "543px"]}>
            <Text
                {...{
                fontFamily: "Helvetica",
                fontStyle: "normal",
                fontWeight: "normal",
                fontSize: "16px",
                color: "#809EBD",
                 }}
             >
          connect to the fuckin dApp.
        </Text>

        </VStack>
    );

    
};

const Samplebread: React.FunctionComponent<IProps> = (props) => (
    <HStack spacing={[0, 10]} px={[5, 10, 10]} flexDirection={["column", "column", "column", "row"]}>
        <Content></Content>
    </HStack>
)


export { Samplebread };