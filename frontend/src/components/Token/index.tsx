import React from "react";
import { Flex, Stack, Text, Button, VStack, Heading, HStack, Input, Image, Box, useColorModeValue,
List, ListItem, UnorderedList, Link, Divider, Badge,
Stat,
StatLabel,
StatNumber,
StatHelpText,
StatArrow,
StatGroup, } from "@chakra-ui/react";
import { ExternalLinkIcon } from '@chakra-ui/icons';

import PbNFTDeployment from '../../hardhat/deployments/chainstack/PbNFT.json';


interface IProps {}

interface IContentProps {}

const Content: React.FC<IContentProps> = (props) => {
  // const [address, setAddress] = React.useState("");
  // const history = useHistory();

  const bgColor = useColorModeValue("black.500", "black.200");
  const textColor = useColorModeValue("white.500", "black.500");
  const bg2Color = useColorModeValue("grey.900", "white.500");

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
          token
      </Heading>
      <VStack textAlign="left" alignItems="flex-start">

        <Box backgroundColor={bgColor} color={textColor} border="2px" padding={2} maxW="lg">
            <Heading mb={[2,4]}>
                PolyBread Token
            </Heading>

            <VStack textAlign="left" alignItems="flex-start">
                <Text as="kbd" fontSize="sm">
                    name: PolyBread
                </Text>
                <Text as="kbd" fontSize="sm">
                    symbol: BREAD
                </Text>
            </VStack>

            <Divider />

            <Box>
                <Link  href="https://polygonscan.com/address/0xc6287874391410c77e3fd73748c735f9381b8859" isExternal as="kbd" fontWeight="bold">0xc6287874391410C77E3fD73748C735f9381b8859<ExternalLinkIcon mx="2px" /></Link>
                <Badge colorScheme="green" variant="outline">deployed-mainnet</Badge>
                

            </Box>




        </Box>


        <Box backgroundColor={bgColor} color={textColor} border="2px" padding={2} maxW="lg">
            <Heading as="h4" fontSize={["md", "lg"]}>
                what is it?
            </Heading>

            <Text as="kbd">
                A social token that acts as a gateway to the PolyBread ecosystem. Members must hold 25 BREAD
                to participate in the community. Access to the PolyBread discord server is verified using your web3
                connected wallet (via Collab.Land).
            </Text>

            <Divider />

            <Heading as="h4" mt={1} fontSize={["md", "lg"]}>
                why?
            </Heading>

            <Text as="kbd">
                The social token acts as a means to invest in the community and ensure everyone who participates is 
                aligned on a common goal. By owning BREAD, you're helping to bring value to a space of creators and artists. 
                This space has value because of the content and ideas of the users this community creates and shares. It's a private club,
                and you're invited.
            </Text>

        </Box>


        <Box backgroundColor={bgColor} color={textColor} border="2px" padding={2} maxW="lg">
            <Heading as="h4" fontSize={["md", "lg"]}>
                me want token
            </Heading>

            <Text as="kbd">
                where to get BREAD:

            </Text>

            <Box mt="4">
                <Text as="kbd" fontSize="sm">
                    tokenomics will be decided by founding members of the DAO. BREAD is not publicly available at this time, nor is it
                    staked in any LP's. 
                </Text>
            </Box>

            <Box border="2px" padding={2} mt="2" mb="2">
                <Text as="kbd" fontStyle="italic" fontSize="xs" fontWeight="bold" >private OTC offerings will be made with founders. please inquire if you're interested in the project</Text>
            </Box>

            <Divider />
            <Badge colorScheme="yellow" variant="outline">not publicly available yet</Badge>




        </Box>




        
        
        <Box backgroundColor={bgColor} color={textColor} border="2px" padding={2} maxW="lg">
            <Heading as="h4" fontSize={["md", "lg"]}>
                stats
            </Heading>

            <Text as="kbd">
                metrics on BREAD
            </Text>
            <Divider />

            <StatGroup >
                <Stat>
                    <StatLabel >Total Supply</StatLabel>
                    <StatNumber  >100,000 BREAD</StatNumber>
                    <StatHelpText >init amount minted = 100k</StatHelpText>
                </Stat>

                <Stat>
                    <StatLabel >Holders</StatLabel>
                    <StatNumber >1</StatNumber>
                    <StatHelpText >(not implemented)</StatHelpText>
                </Stat>

            </StatGroup>
            
            <Divider />

            <Text as="kbd">
                contract owner: 0x1CD4935Eb3d7291b2B0782F9aF7525564D277E7B
            </Text>


        </Box>






      </VStack>



      




    </VStack>
  );
};

const Token: React.FunctionComponent<IProps> = (props) => (
  <HStack spacing={[0, 10]} px={[5, 10, 10]} flexDirection={["column", "column", "column", "row"]}>
    <Content></Content>
  </HStack>
);

export { Token };