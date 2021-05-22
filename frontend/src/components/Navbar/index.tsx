import React, { useContext, useEffect, useState } from "react";
import { Flex, Text, Button, HStack, Heading, Link as CLink, Center } from "@chakra-ui/react";
import NavLink from "next/link";
import Web3Modal, { IProviderOptions } from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { ethers } from "ethers";


import { CurrentAddressContext, ProviderContext, SignerContext, getSampleBread, SampleBreadContext, SymfoniSampleBread, emptyContract } from "../../hardhat/SymfoniContext";

// Node access from our chainstack polygon node
import * as chainstack from '../../../../chainstack.json';
import { formatAddress } from '../../lib/formataddress';
import { useRouter } from 'next/router';
import { nameResolver } from '../../lib/nameresolver';


const network = "testnet";
const CS_USERNAME = chainstack.CS_USERNAME;
const CS_PASSWORD = chainstack.CS_PASSWORD;

interface IProps {}

const Logo = () => (
    <NavLink href="/">
        <Heading
            color={"black"}
            {...{ fontFamily: "Helvetica", fontStyle:"normal", fontWeight:"900", fontSize:"40px", letterSpacing: "-2.5px"}}
            cursor="pointer"
        >
        PolyBread
        </Heading>
    </NavLink>
);


const handleWeb3ProviderConnect = (
    setProvider: Function,
    setSigner: Function,
    setCurrentAddress: Function,
    setSampleBread: Function
    
) => async () => {
    const getWeb3ModalProvider = async (): Promise<any> => {

        const providerOptions: IProviderOptions = {
            walletconnect: {
                package: WalletConnectProvider, // required
                options: {
                    rpc: {
                        80001: `https://${CS_USERNAME}:${CS_PASSWORD}@nd-075-619-162.p2pify.com`,
                    },
                },
            },
        };

        const web3Modal = new Web3Modal({
            network,
            cacheProvider: true,
            providerOptions,
            theme: "dark",
        });

        const provider = await web3Modal.connect();
        console.log(provider);

        return provider;

    };

    const provider = await getWeb3ModalProvider();
    console.log(provider);

    // setup ethers with walletconnect/web3 provider
    const web3provider = new ethers.providers.Web3Provider(provider);

    // Get the user details
    const signer = await web3provider.getSigner();
    const address = await signer.getAddress();

    setProvider(web3provider);
    setSigner(signer);

    console.log("address", address);

    setCurrentAddress(address);

    // get  and set contract interaction here

    const sampleBread = getSampleBread(web3provider, signer);

    console.log("samplebread:", sampleBread);
    setSampleBread(sampleBread);
    // const token = getToken(web3provider, signer);
    // setToken(token);


};


const OurLink = (props: any) => {

    const [currentAddress] = useContext(CurrentAddressContext);
    const [_provider, setProvider] = useContext(ProviderContext);
    const [_signer, setSigner] = useContext(SignerContext);
    const [_currentAddress, setCurrentAddress] = useContext(CurrentAddressContext);
    const [SampleBread, setSampleBread] = useContext(SampleBreadContext);

    const Router = useRouter();
    const isActive = Router.pathname == props.href;


    if (!currentAddress) {
        return (
            <CLink
                onClick={handleWeb3ProviderConnect(setProvider, setSigner, setCurrentAddress, setSampleBread)}
                href={"#"}
                {...props}
                {...{
                    fontFamily: "Helvetica",
                    fontStyle: "normal",
                    fontWeight: "normal",
                    fontSize: "16px",
                    color: "#0809EBD",
                    ...(isActive && {
                        color: "#013A6D",
                        textDecoration: "underline",
                    }),
                }}
            />
        );
    }

    return (
        <CLink
            as={NavLink}
            {...props}
            {...{
                fontFamily: "Helvetica",
                fontStyle: "normal",
                fontWeight: "normal",
                fontSize: "16px",
                color: "#809EBD",
                ...(isActive && {
                    color: "#013A6D",
                    textDecoration: "underline"
                }),
            }}
        />
    );

};

// NAVBAR LINKS GO HERE
const Links = () => (
    <Center mx="auto">
        <HStack spacing={10}>
            <OurLink href="/Samplebread">test link1</OurLink>
            <OurLink href="#">test link2</OurLink>
        </HStack>
    </Center>
);

const Navbar: React.FunctionComponent<IProps> = (props) => {
    // get our contract/web3 context
    const [currentAddress, setCurrentAddress] = useContext(CurrentAddressContext);
    const [provider, setProvider] = useContext(ProviderContext);
    const [_signer, setSigner] = useContext(SignerContext);
    const [SampleBread, setSampleBread] = useState<SymfoniSampleBread>(emptyContract);

    const { ensName } = nameResolver();

    return (
        <Flex width="100%" px={[2,10]} py={4}>
            <Logo></Logo>
            <Links></Links>
            <Center>
                {ensName ? (
                    <Text ml="auto"
                    {...{
                        fontFamily: "Helvetica",
                        fontStyle: "normal",
                        fontWeight: "normal",
                        fontSize: "16px",
                        color: "#809EBD",
                    }}
                    >
                        {ensName}
                    </Text>
                ) : (
                    <Button
                        ml="auto"
                        background="black"
                        borderRadius="0px"
                        color="white"
                        onClick={handleWeb3ProviderConnect(setProvider, setSigner, setCurrentAddress, setSampleBread)}
                    >
                        Connect
                    </Button>
                )}
              
            </Center>
        </Flex>
    );
};

export { Navbar };