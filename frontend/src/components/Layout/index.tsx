// layout index.tsx is the page layout structure

import React from 'react';
import { Center, VStack } from '@chakra-ui/react';
import { Navbar } from '../Navbar';


interface IProps {}

const Layout: React.FunctionComponent<IProps> = (props) => (

    <VStack spacing={0}>
        <Navbar></Navbar>
        <Center minHeight={`calc(100vh - 72px)`} width={"100%"}>
            {props.children}
        </Center>
    </VStack>
);


export { Layout };