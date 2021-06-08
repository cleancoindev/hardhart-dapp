// layout index.tsx is the page layout structure

import React from 'react';
import { Center, VStack } from '@chakra-ui/react';
import { Navbar } from '../Navbar';


// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IProps {}

const Layout: React.FunctionComponent<IProps> = (props) => (

    <VStack spacing={5}>
        <Navbar></Navbar>
        <Center minHeight={`calc(100vh - 72px)`} width={"100%"}>
            {props.children}
        </Center>
    </VStack>
);


export { Layout };