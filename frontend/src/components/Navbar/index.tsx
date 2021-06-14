import React, { useContext, useEffect, useState } from "react";
import { Box, useColorMode, Flex, Text, Button, HStack, Heading, Link as CLink, Center, IconButton, color, useColorModeValue, 
Popover,
PopoverTrigger,
PopoverContent,
PopoverHeader,
PopoverBody,
PopoverFooter,
PopoverArrow,
PopoverCloseButton,
Portal,
Icon,  
Link,
Spacer,
 useDisclosure} from "@chakra-ui/react";
import { DiGithubBadge } from 'react-icons/di';
import { CloseIcon, MoonIcon, SunIcon, InfoOutlineIcon, HamburgerIcon } from '@chakra-ui/icons'
import NavLink from "next/link";
import Web3Modal, { IProviderOptions } from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { ethers } from "ethers";

import { useEthers, useNotifications } from '@usedapp/core';

import { Balance } from '../Balance';



import {
    CurrentAddressContext,
    ProviderContext, 
    SignerContext, 
    SymfoniPolyBread,
    SymfoniPbNFT,
    SymfoniERC721,
    PbNFTContext,
    ERC721Context, 
    SampleBreadContext, 
    SymfoniSampleBread,
    SymfoniContext, 
 } from "../../hardhat/SymfoniContext";


// Node access from our chainstack polygon node
// import * as chainstack from '../../../../chainstack.json';
import { formatAddress } from '../../lib/formataddress';
import { useRouter } from 'next/router';
import { nameResolver } from '../../lib/nameresolver';
import { networkResolver } from '../../lib/networkresolver';
import { balanceResolver } from "../../lib/balanceresolver";

import { truncateHash } from '../../lib/truncatehash';


const network = "testnet";
const CS_USERNAME = process.env.CS_USERNAME;
const CS_PASSWORD = process.env.CS_PASSWORD;

interface IProps {}

const Logo = () => (
    <NavLink href="/">
        <Heading
        fontSize={["xl", "2xl", "4xl"]}
            {...{ fontFamily: "Helvetica", fontStyle:"normal", fontWeight:"900", letterSpacing: "-2.5px"}}
            cursor="pointer"
        >
        PolyBread
        </Heading>
    </NavLink>
);



/**
 *  handleWeb3ProviderConnect
 * @param setProvider 
 * @param setSigner 
 * @param setCurrentAddress 
 * @param setSampleBread 
 * @returns promise containing web3 provider 
 */
const handleWeb3ProviderConnect = (
    setProvider: Function,
    setSigner: Function,
    setCurrentAddress: Function,
    setPbNFT: Function,
    setERC721: Function
    
) => async () => {
    const getWeb3ModalProvider = async (): Promise<any> => {

        const providerOptions: IProviderOptions = {
            walletconnect: {
                package: WalletConnectProvider, // required
                options: {
                    qrcodeModalOptions: {
                        mobileLinks: [
                          "rainbow",
                          "metamask",
                          "argent",
                          "trust",
                          "imtoken",
                          "pillar",
                        ],
                    },
                    rpc: {
                        80001: `https://${CS_USERNAME}:${CS_PASSWORD}@nd-075-619-162.p2pify.com`,
                    },
                },
            },
        };

        const web3Modal = new Web3Modal({
            network,
            cacheProvider: false,
            disableInjectedProvider: true,
            providerOptions,
            theme: "dark",
        });


        const provider = await web3Modal.connect();
        console.log('provider:', provider);

        return provider;

    };
    

    const provider = await getWeb3ModalProvider();
    console.log('provider:', provider);

    // setup ethers with walletconnect/web3 provider
    const web3provider = new ethers.providers.Web3Provider(provider);

    // Get the user details
    const signer = await web3provider.getSigner();
    const address = await signer.getAddress();

    setProvider(web3provider);
    setSigner(signer);

    console.log("address", address);

    setCurrentAddress(address);

    const pbNFT = useContext(PbNFTContext);
    const erc721 = useContext(ERC721Context);

    console.log(pbNFT);
    console.log(erc721);
    

    // const erc721 = getERC721(web3provider, signer);

    setPbNFT(pbNFT);
    setERC721(erc721);





};


const OurLink = (props: any) => {

    const [currentAddress] = useContext(CurrentAddressContext);
    const [_provider, setProvider] = useContext(ProviderContext);
    const [_signer, setSigner] = useContext(SignerContext);
    const [_currentAddress, setCurrentAddress] = useContext(CurrentAddressContext);
    // const [SampleBread, setSampleBread] = useContext(SampleBreadContext);
    const [PbNFT, setPbNFT] = useState("");
    const [ERC721, setERC721] = useState("");
    const { account, activateBrowserWallet, deactivate } = useEthers();



    const Router = useRouter();
    const isActive = Router.pathname == props.href;


    if (!account) {
        return (
            <CLink
                onClick={() => activateBrowserWallet()}
                href={"#"}
                as="kbd"
                {...props}
                fontSize={["xs","sm", "md"]}
                px={2}
                py={1}
                {...{
                    fontFamily: "Helvetica",
                    fontStyle: "normal",
                    fontWeight: "normal",
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
            fontSize={["xs","sm", "md"]}
            px={2}
            py={1}
            {...{
                fontFamily: "Helvetica",
                fontStyle: "normal",
                fontWeight: "normal",
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
        <HStack spacing={[2, 10]}>
            {/* <OurLink href="/samplebread">test link1</OurLink> */}
            <OurLink href="/mint-nft">NFT</OurLink>
            <OurLink href="/nfts">COLLECTION</OurLink>
            <OurLink href="/info">INFO</OurLink>
            <OurLink href="/token">TOKEN</OurLink>
        </HStack>
    </Center>
);


const Navbar: React.FunctionComponent<IProps> = (props) => {
    // get our contract/web3 context
    const [currentAddress, setCurrentAddress] = useContext(CurrentAddressContext);
    const [provider, setProvider] = useContext(ProviderContext);
    const [_signer, setSigner] = useContext(SignerContext);
    // const [SampleBread, setSampleBread] = useState<SymfoniSampleBread>(emptyContract);
    // const [PbNFT, setPbNFT] = useState<SymfoniPbNFT>(emptyContract);
    // const [ERC721, setERC721] = useState<SymfoniERC721>(emptyContract);
    const [PbNFT, setPbNFT] = useState("");
    const [ERC721, setERC721] = useState("");

    const { ensName } = nameResolver();

    const { networkName } = networkResolver();

    const { balance } = balanceResolver();

    // Chakra color mode
    const { colorMode, toggleColorMode } = useColorMode();



    const { account, activateBrowserWallet, deactivate } = useEthers();
    const { notifications } = useNotifications();

 

    const handleToggle = () => {
         toggleColorMode();
        //  console.log(colorMode);

    }

    const determineIcon = () => {
        if (colorMode === 'light') {
            return (<MoonIcon />);
        } else {
            return (<SunIcon />);
        }
        
    }

    const bgColor = useColorModeValue("black.500", "black.200");
    const textColor = useColorModeValue("white.500", "black.500");

    return (
        <Flex width="100%" px={[2,10]} py={4} borderColor={bgColor} border="2px" as="nav">

            <Box>
                <Logo></Logo>
            </Box>
            <Spacer />
            <Links></Links>
            <Spacer />

            <Center border="2px" borderColor={bgColor} maxW={["xs", "sm"]} fontSize={["sm", "md", "lg"]}>
                {account ? (
                        
                    <Text ml="auto"
                          mr="auto"
                          fontSize={["xs", "sm", "md"]}
                    {...{
                        fontFamily: "Helvetica",
                        fontStyle: "normal",
                        fontWeight: "normal",
                        color: textColor,
                        
                    }}
                    _hover={{
                        color: textColor,
                      }}
                    >
                        {truncateHash(account)}
                        <Button background={bgColor} variant="outline" borderRadius="0" onClick={() => deactivate()}>
                        disconnect
                    </Button>
                    { balance }
                    </Text>
                    


                ) : (
                    <Button
                        ml="2px"
                        mr="auto"
                        background="black"
                        borderRadius="0px"
                        color="white"
                        onClick={() => activateBrowserWallet()}
                    >
                        Connect
                    </Button>
                )}


                <IconButton
                 ml="auto"
                 mr="auto"
                 borderRadius="0px"
                 variant="outline"

                 aria-label="toggle darkmode" icon={ determineIcon() } onClick={handleToggle} >
                    Toggle {colorMode === "light" ? "Dark" : "Light"}
                </IconButton>
              
            </Center>

            <Box border="2px" marginLeft="5px">
                <Popover>
                    <PopoverTrigger>
                        <IconButton size={"lg"} aria-label="info panel" icon={<InfoOutlineIcon/>} color={textColor} background={bgColor} f ></IconButton>
                    </PopoverTrigger>
                    <Portal>
                        <PopoverContent borderColor={textColor} borderRadius="0">
                            <PopoverArrow />
                            <PopoverHeader fontFamily="Helvetica" fontSize="16px" fontWeight="bold">PolyBread Alpha</PopoverHeader>
                            <PopoverCloseButton />

                            <PopoverBody >
                                <Text as="kbd" fontSize="md" fontWeight="bold">wallet</Text>
                                <Box>
                                    <Text as="kbd" fontSize="sm">network-name: {networkName}</Text>
                                </Box>

                            </PopoverBody>


                            <PopoverFooter as="kbd" fontSize="x-small">deployed on polygon/matic mumbai testnet</PopoverFooter>
                            <PopoverFooter as="kbd" fontSize="x-small" >version 0.0.2 pre-release alpha</PopoverFooter>
                            <PopoverFooter as="kbd" fontSize="x-small" >
                                <Link href='https://github.com/bretth18/hardhart-dapp'>
                                    <Icon as={DiGithubBadge} fontSize="xl"></Icon>
                                </Link>
                            </PopoverFooter>

                        </PopoverContent>
                    </Portal>
 

                </Popover>

            </Box>
        </Flex>
    );
};

export { Navbar };