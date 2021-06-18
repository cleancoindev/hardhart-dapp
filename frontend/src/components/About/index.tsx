import React from "react";
import { Flex, Stack, Text, Button, VStack, Heading, HStack, Input, Image } from "@chakra-ui/react";



interface IProps {}

interface IContentProps {}
const Content: React.FC<IContentProps> = (props) => {
  // const [address, setAddress] = React.useState("");
  // const history = useHistory();
  return (

    <VStack spacing={4} textAlign="left" width={["auto", "auto", "auto", "543px"]} px={4}>
      <Heading
        as="h2"
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
          hello.
      </Heading>
      <VStack textAlign="left" alignItems="flex-start">
        {/* <Text
          {...{
            fontFamily: "Helvetica",
            fontStyle: "normal",
            fontWeight: "normal",
            fontSize: "16px",
            color: "#809EBD",
          }}
        > */}
        {/* Send a thank you with a custom NFT—or add yUSD to reward contributors with a sharable NFT that stays meaningful */}
        {/* and memorable forever. */}
        {/* NFTs for gifts, grants, and gratitude
        </Text>{" "} */}
        <Text
          {...{
            fontFamily: "Helvetica",
            fontStyle: "normal",
            fontWeight: "normal",
            fontSize: "16px",
            color: "#809EBD",
          }}
        >
          connect your wallet to begin using PolyBread
        </Text>
      </VStack>
      {/* TODO: Hide until route implemented */}
      {/* <HStack spacing={4}>
        <Input
          background="#ECF4FA"
          borderRadius="24px"
          placeholder="ETH Address"
          onChange={(e) => setAddress(e.target.value)}
          type={"text"}
          minWidth="300px"
        />
        <Button
          variant="outline"
          {...{
            border: "1px solid #0065D0",
            borderColor: "#0065D0",
            boxSizing: "border-box",
            borderRadius: "32px",
            color: "#0065D0",
          }}
          minWidth="300px"
          onClick={() => {
            history.push(`/gifts/${address}`);
          }}
        >
          View someone's gifts
        </Button>
      </HStack> */}
    </VStack>
  );
};

const About: React.FunctionComponent<IProps> = (props) => (
  <HStack spacing={[0, 10]} px={[5, 10, 10]} flexDirection={["column", "column", "column", "row"]}>
    <Content></Content>
  </HStack>
);

export { About };