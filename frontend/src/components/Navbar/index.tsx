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
 useDisclosure,
 Skeleton,
 Divider,
Badge} from "@chakra-ui/react";
import { DiGithubBadge } from 'react-icons/di';
import { CloseIcon, MoonIcon, SunIcon, InfoOutlineIcon, HamburgerIcon } from '@chakra-ui/icons'
import NavLink from "next/link";
import Web3Modal, { IProviderOptions } from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { ethers } from "ethers";


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
    BreadContext, 
 } from "../../hardhat/SymfoniContext";


// Node access from our chainstack polygon node
// import * as chainstack from '../../../../chainstack.json';
import { formatAddress } from '../../lib/formataddress';
import { useRouter } from 'next/router';
import { nameResolver } from '../../lib/nameresolver';
import { networkResolver } from '../../lib/networkresolver';
import { breadBalanceResolver } from '../../lib/breadbalanceresolver';
import { truncateHash } from "../../lib/truncatehash";


const network = "maticmum";
const CS_USERNAME = process.env.CS_USERNAME;
const CS_PASSWORD = process.env.CS_PASSWORD;
const CS_MAIN_USERNAME = process.env.CS_MAIN_USERNAME;
const CS_MAIN_PASSWORD = process.env.CS_MAIN_PASSWORD;

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
    setERC721: Function,
    setBread: Function
    
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
                        137: `https://${CS_MAIN_USERNAME}:${CS_MAIN_PASSWORD}@nd-211-935-416.p2pify.com`
                    },
                },
            },
        };

        const web3Modal = new Web3Modal({
            network,
            cacheProvider: true,
            disableInjectedProvider: false,
            providerOptions,
            theme: "dark",
        });


        const provider = await web3Modal.connect();

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
    const bread = useContext(BreadContext);

    console.log('bread', bread);

    console.log(pbNFT);
    console.log(erc721);
    

    // const erc721 = getERC721(web3provider, signer);

    setPbNFT(pbNFT);
    setERC721(erc721);
    setBread(bread);






};


const OurLink = (props: any) => {

    const [currentAddress] = useContext(CurrentAddressContext);
    const [_provider, setProvider] = useContext(ProviderContext);
    const [_signer, setSigner] = useContext(SignerContext);
    const [_currentAddress, setCurrentAddress] = useContext(CurrentAddressContext);
    // const [SampleBread, setSampleBread] = useContext(SampleBreadContext);
    const [PbNFT, setPbNFT] = useState("");
    const [ERC721, setERC721] = useState("");
    const [Bread, setBread] = useState("");


    const Router = useRouter();
    const isActive = Router.pathname == props.href;


    if (!currentAddress) {
        return (
            <CLink
                onClick={handleWeb3ProviderConnect(setProvider, setSigner, setCurrentAddress, setPbNFT, setERC721, setBread)}
                href={"#"}
                {...props}
                fontSize={["4xs", "2xs", "xs","sm", "md"]}
                px={2}
                py={1}
                {...{
                    fontFamily: "Helvetica",
                    ...(isActive && {
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
            fontSize={["4xs","xs","sm", "md"]}
            px={2}
            py={1}
            {...{

                ...(isActive && {
                    textDecoration: "underline"
                }),
            }}
        />
    );

};

// NAVBAR LINKS GO HERE
const Links = () => (
    <Center mx="auto" fontSize={["xx-small", "xs", "small", "md", "lg"]}>
        <HStack spacing={[1, 2, 4, 6, 8,  10]}>
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
    const [Bread, setBread] = useState("");

    const { ensName } = nameResolver();

    const { networkName } = networkResolver();
    const { breadBalance, loading } = breadBalanceResolver();



    // Chakra color mode
    const { colorMode, toggleColorMode } = useColorMode();

    

 

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

    const determineMembership = (balance: any) => {

        if (Number(balance) >= 25) {
            return (
                <Badge variant="outline" colorScheme="green" ml="1" fontSize={["xx-small", "xs"]} >member</Badge>
            );

        } else {
            return;
        }
    }



    const bgColor = useColorModeValue("black.500", "black.200");
    const textColor = useColorModeValue("white.500", "black.500");

    return (
        <Flex width="100%" px={[2,10]} py={4} borderColor={bgColor} border="2px" as="nav">

            <Box>
                <Logo></Logo>
            </Box>
            <Links></Links>

            <HStack>
            <Center border="2px" borderColor={bgColor} maxW={["xs", "sm"]} maxH={["xs", "sm"]} fontSize={["sm", "md", "lg"]}>
                {ensName ? (
                    <Box  mx="2"  isTruncated fontSize={["xs", "sm", "md"]} > 
                        <Text 
                            px="2"
                        {...{
                            fontFamily: "Helvetica",
                            color: textColor,
                            
                        }}
                        _hover={{
                            color: textColor,
                        }}
                        >
                            {truncateHash(ensName)}



                        </Text>
                    </Box>




                ) : (
                    <Box border="2px" mx="2"  isTruncated fontSize={["xs", "sm", "md"]} > 

                    <Button
                        background="black"
                        borderRadius="0px"
                        color="white"
                        onClick={handleWeb3ProviderConnect(setProvider, setSigner, setCurrentAddress, setPbNFT, setERC721, setBread)}
                    >
                        Connect
                    </Button>
                    </Box>
                )}
                
 
                <Box border="1px" mx="2" mr="auto">
                    <Skeleton isLoaded={!loading}>
                    <Text as="kbd" fontSize={["2xs", "xs"]} px="2">{breadBalance}BREAD</Text>
                    <Divider orientation="horizontal" />
                    {determineMembership(breadBalance)}
                    </Skeleton>
                </Box>

                <Divider orientation="vertical" variant="solid" />
    


                <Box mx="2" >
                <IconButton
                    ml="auto"
                    mr="auto"
                    borderRadius="0"
                    color={textColor} background={bgColor}
                    aria-label="toggle darkmode" icon={ determineIcon() } onClick={handleToggle} >
                        Toggle {colorMode === "light" ? "Dark" : "Light"}
                    </IconButton>
                    <Popover>
                        <PopoverTrigger>
                            <IconButton 
                            ml="auto" 
                            mr="auto" 
                            borderRadius="0"  
                            aria-label="info panel" 
                            icon={<InfoOutlineIcon/>} 
                            color={textColor} 
                            background={bgColor}  ></IconButton>
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


                                <PopoverFooter as="kbd" fontSize="x-small">deployed on polygon/matic mainnet</PopoverFooter>
                                <PopoverFooter as="kbd" fontSize="x-small" >version 0.0.3 pre-release alpha</PopoverFooter>
                                <PopoverFooter as="kbd" fontSize="x-small" >
                                    <Link href='https://github.com/bretth18/hardhart-dapp'>
                                        <Icon as={DiGithubBadge} fontSize="xl"></Icon>
                                    </Link>
                                </PopoverFooter>

                            </PopoverContent>
                        </Portal>

                    </Popover>
                </Box>



               
              
            </Center>

                    </HStack>





        </Flex>
    );
};

export { Navbar };