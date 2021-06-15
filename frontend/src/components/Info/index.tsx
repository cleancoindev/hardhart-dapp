import React from "react";
import { Flex, Stack, Text, Button, VStack, Heading, HStack, Input, Image, Box, useColorModeValue,
List, ListItem, UnorderedList, Link, Divider, Badge } from "@chakra-ui/react";
import { ExternalLinkIcon } from '@chakra-ui/icons';

import PbNFTDeployment from '../../hardhat/deployments/chainstack/PbNFT.json';


interface IProps {}

interface IContentProps {}

const Content: React.FC<IContentProps> = (props) => {
  // const [address, setAddress] = React.useState("");
  // const history = useHistory();

  const bgColor = useColorModeValue("black.500", "black.200");
  const textColor = useColorModeValue("white.500", "black.500");
  const bg2Color = useColorModeValue("black.900", "white.500");

  const contractAddress = PbNFTDeployment.address;

  return (

    <VStack spacing={4} textAlign="left" width={["auto", "auto", "auto", "543px"]}>
      <Heading
        as="kbd"
        fontSize={["4xl", "58px"]}
        {...{
          fontFamily: "Helvetica",
          fontStyle: "normal",
          fontWeight: "900",
          letterSpacing: "-2.5px",
          color: "#black",
        }}
        mb={[2, 4]}
      >
          info
      </Heading>
      <VStack textAlign="left" alignItems="flex-start">

        <Box backgroundColor={bgColor} color={textColor} border="2px" padding={2} maxW="sm">
            <Heading mb={[2,4]}>
                PolyBread Ecosystem:
            </Heading>

            <Text as="kbd">
                PolyBread DAO + PbNFT + PolyBread Token 
            </Text>

        </Box>


        <Box backgroundColor={bgColor} color={textColor} border="2px" padding={2} maxW="sm">
            <Heading as="h4" fontSize={["md", "lg"]}>
                PolyBread DAO
            </Heading>

            <Text as="kbd">
                Governance and treasury for the PolyBread ecosystem.
            </Text>

            <Divider />
            <Badge colorScheme="red" variant="outline">wip</Badge>

        </Box>

        
        
        <Box backgroundColor={bgColor} color={textColor} border="2px" padding={2} maxW="sm">
            <Heading as="h4" fontSize={["md", "lg"]}>
                PbNFT
            </Heading>

            <Text as="kbd">
                PolyBread NFT platform. Mint your own multimedia NFT's on the Polygon network.
            </Text>
            <Divider />

            <Text fontWeight="bold">
                contract address:  
                <Text as="kbd" fontWeight="normal">
                    {contractAddress}
                </Text>
            </Text>
            <Badge colorScheme="green" variant="outline">deployed-testnet</Badge>

        </Box>


        <Box backgroundColor={bgColor} color={textColor} border="2px" padding={2} maxW="sm">
            <Heading as="h4" fontSize={["md", "lg"]}>
                Bread (PolyBread Token)
            </Heading>

            <Text as="kbd">
                A social token that acts as a gateway to the PolyBread ecosystem. Members must hold 25 BREAD
                to gain access to the PolyBread Discord server.
            </Text>

            <Divider />
            <Badge colorScheme="green" variant="outline">deployed</Badge>


        </Box>



      </VStack>



      <VStack textAlign="left" alignItems="flex-start" >


        <Box backgroundColor={bg2Color} bg={bg2Color} color={textColor} border="2px" padding={2} maxW="sm" >
            <Heading as="h4" fontSize={["md", "lg"]} mb="2">
                Development
            </Heading>

            <Box border="2px" padding={2} >
                <Text as="kbd" fontWeight="bold">
                    dev team:
                </Text>

                <UnorderedList>
                    <ListItem>computer data (brett h.) 
                        <Box>

                            <Link href="https://github.com/bretth18" isExternal>
                                github <ExternalLinkIcon mx="2px" />
                            </Link>
                            <Link href="https://twitter.com/computrdata" isExternal>
                                twitter <ExternalLinkIcon mx="2px" />
                            </Link>
                            <Link href="https://discordapp.com/users/128005496182407168/" isExternal>
                                discord <ExternalLinkIcon mx="2px" />
                            </Link>
  
                        </Box>
                    </ListItem>
                    <ListItem>
                        your name here (pls)
                    </ListItem>
                </UnorderedList>

            </Box>
  

        </Box>


      </VStack>





    </VStack>
  );
};

const Info: React.FunctionComponent<IProps> = (props) => (
  <HStack spacing={[0, 10]} px={[5, 10, 10]} flexDirection={["column", "column", "column", "row"]}>
    <Content></Content>
  </HStack>
);

export { Info };