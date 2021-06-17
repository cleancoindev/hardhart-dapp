import React from "react";
import { Flex, Stack, Text, Button, VStack, Heading, HStack, Input, Image, Box, useColorModeValue,
List, ListItem, UnorderedList,  Divider, Badge,
Stat,
StatLabel,
StatNumber,
StatHelpText,
StatArrow,
StatGroup,
Link as Clink, } from "@chakra-ui/react";
import { ExternalLinkIcon } from '@chakra-ui/icons';

import PbNFTDeployment from '../../hardhat/deployments/chainstack/PbNFT.json';
import BreadDeployment from '../../hardhat/deployments/matic/Bread.json';

interface IProps {}

interface IContentProps {}

const Content: React.FC<IContentProps> = (props) => {
  // const [address, setAddress] = React.useState("");
  // const history = useHistory();

  const bgColor = useColorModeValue("black.500", "black.200");
  const textColor = useColorModeValue("white.500", "black.500");
  const bg2Color = useColorModeValue("grey.900", "white.500");

  const contractAddress = PbNFTDeployment.address;
  const breadAddress = BreadDeployment.address;

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
          dao
      </Heading>
      <VStack textAlign="left" alignItems="flex-start">

        <Box backgroundColor={bgColor} color={textColor} border="2px" padding={2} maxW="lg">
            <Heading mb={[2,4]}>
                PolyBread DAO
            </Heading>

            <VStack textAlign="left" alignItems="flex-start">
                <Text as="kbd" fontSize="sm">
                    a decentralized autonomous organization
                </Text>
                <Text as="kbd" fontSize="sm">
                    governance token: BREAD
                </Text>
            </VStack>

            <Divider />

            <Box>
                <Clink  href={`https://polygonscan.com/address/${breadAddress}`} isExternal={true} fontWeight="bold">{breadAddress}<ExternalLinkIcon mx="2px" /></Clink>
                <Badge colorScheme="green" variant="outline">deployed-mainnet</Badge>
                

            </Box>




        </Box>


        <Box backgroundColor={bgColor} color={textColor} border="2px" padding={2} maxW="lg">
            <Heading as="h4" fontSize={["md", "lg"]}>
                governance
            </Heading>

            <Text as="kbd">
                A social token that acts as a gateway to the PolyBread ecosystem. Members must hold 25 BREAD
                to participate in the community. Access to the PolyBread discord server is verified using your web3
                connected wallet (via Collab.Land).
            </Text>

            <Divider />

            <Heading as="h4" mt={1} fontSize={["md", "lg"]}>
                treasury
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
                objectives
            </Heading>

            <Text as="kbd">
                where to get BREAD:

            </Text>

            <Box mt="4">
                <Text as="kbd" fontSize="sm">
                    tokenomics will be decided by founding members of the DAO. BREAD is not publicly available at this time, nor is it
                    staked in any LP's. once gnosis has enabled support for polygon, the ownership of the contract
                    and supply of tokens will be moved to the DAO's multi-sig gnosis safe. 
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

const Dao: React.FunctionComponent<IProps> = (props) => (
  <HStack spacing={[0, 10]} px={[5, 10, 10]} pb={5} flexDirection={["column", "column", "column", "row"]}>
    <Content></Content>
  </HStack>
);

export { Dao };