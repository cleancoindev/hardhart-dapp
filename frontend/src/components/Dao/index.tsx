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

    <VStack spacing={4} textAlign="left" width={["auto", "auto", "auto", "543px"]} px={4}>
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
                    a decentralized autonomous organization.
                </Text>
                <Text as="kbd" fontSize="sm">
                    governance token: BREAD
                </Text>
            </VStack>

            <Divider />

            <Box>
                <Clink  href={`https://polygonscan.com/address/${breadAddress}`} isExternal={true} fontWeight="bold">{breadAddress}<ExternalLinkIcon mx="2px" /></Clink>
                

            </Box>


        </Box>


        <Box backgroundColor={bgColor} color={textColor} border="2px" padding={2} maxW="lg">
            <Heading as="h4" fontSize={["md", "lg"]}>
                governance
            </Heading>

            <Text as="kbd">
                consensus for the polybread DAO is achieved via voting. DAO members can participate in governance via 
                <Clink href={`https://snapshot.org/#/polybread.eth`} isExternal={true} > snapshot.org<ExternalLinkIcon mx="2px" /></Clink>
                
            </Text>

            <Divider />

            <Heading as="h4" mt={1} fontSize={["md", "lg"]}>
                treasury
            </Heading>

            <Text as="kbd">
                the polybread protocol is secured via a treasury board. funds and holdings are secured in a multi-sig wallet
                (gnosis-safe)
            </Text>

        </Box>

    





        
        
        <Box backgroundColor={bgColor} color={textColor} border="2px" padding={2} maxW="lg">
            <Heading as="h4" fontSize={["md", "lg"]}>
                stats
            </Heading>

            <Text as="kbd">
                metrics on BREAD DAO
            </Text>
            <Divider />

            <StatGroup >
                <Stat>
                    <StatLabel >Total Supply</StatLabel>
                    <StatNumber  >100,000 BREAD</StatNumber>
                    <StatHelpText >init amount minted = 100k</StatHelpText>
                </Stat>

                <Stat>
                    <StatLabel >Members</StatLabel>
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