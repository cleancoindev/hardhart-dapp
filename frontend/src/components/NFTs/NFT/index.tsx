

import React, { useEffect, useState } from 'react';
import { Flex, Stack, Text, Button, Image, VStack, Heading, useColorModeValue, Box, Divider } from '@chakra-ui/react';
import fileType from 'file-type';
import { BigNumber, ethers } from 'ethers';
import Link from 'next/link';
import all from 'it-all';

import { 
    //@ts-ignore-next
    urlSource,
} from 'ipfs-http-client';
import { borderColor } from 'polished';





export type PbNFTModel = {
    id?: string;
    metadataURI: string;
    0: string;
    1: string;
    2: string;
};


export type metadataModel = {
    name: string;
    description: string;
    image: string;
    attributes: Array<string>;
};


const NFT: React.FunctionComponent<PbNFTModel> = (props) => {

    const [isVideo, setIsVideo] = useState<boolean>(false);
    const [metadata, setMetadata] = useState<metadataModel>();
    const [assetURL, setAssetURL] = useState("");

    const bgColor = useColorModeValue("black.500", "black.200");
    const textColor = useColorModeValue("white.500", "black.500");




    // TODO: fix complexity
    const loadMetadata = async (metaURL: string) => {
        // add gateway to resolve
        const ipfsFileUrl = metaURL.replace('ipfs://', 'https://gateway.ipfs.io/ipfs/');

        const response = await fetch(ipfsFileUrl);
        const data = await response.json();


        console.log(data);

        // check if image url exists
        if (data.image) {

            const assetURL = data.image;

            //should point to our metadata.json ipfs url
            const gatewayURL = assetURL.replace('ipfs://', 'https://gateway.ipfs.io/ipfs/');
            console.log(gatewayURL);

            // set the state
            setAssetURL(gatewayURL);

            if (isVideo) {
                return;
            }

            if (gatewayURL?.includes("mp4") && !isVideo) {

                setIsVideo(true);

            } else if (gatewayURL?.includes("ipfs") && !isVideo) {

                const [urlSourced] = await all<any>(urlSource(gatewayURL));
                const [file] = await all<ArrayBuffer>(urlSourced.content);
                const fileTypeResult = await fileType.fromBuffer(file);

                const isVideo = Boolean(fileTypeResult?.mime?.includes("video"));

                console.log({ isVideo });

                if (isVideo) {
                    setIsVideo(true);
                }
            }
        }


        // update the state
        setMetadata(data);
    }
    

    
    // check if ipfs file is video
    useEffect(() => {

        loadMetadata(props[0]);
        // fetch();
    }, [props.metadataURI, isVideo]);


    return (
        <Link href={{
            pathname: '/nft/[nftId]',
            query: {nftId: props.id, nftUri: props[0]}
            }}
        >
            <VStack spacing={10} width="auto" boxShadow="0px opx 24px rgba(27, 39, 70, 0.1)" cursor="pointer" border="2px">

                {isVideo ? (
                    <Box border="2px" m="5" borderColor={bgColor} >
                    <video
                        src={assetURL}
                        autoPlay
                        loop
                        muted
                        playsInline
                        height="auto"
                        width="220px"
                        style={{ borderRadius: "0px"}}
                    />
                    </Box>
                ) : (
                    <Image width="220px" height="auto" src={assetURL} borderRadius="0px" border="2px"  ml="5" mr="5" my="5" borderColor={bgColor}></Image>
                )}


                <VStack p={2} width="100%" spacing={1} alignItems="flex-start" >
                    <Box border="2px" borderColor={bgColor}>

                        <Text fontFamily="Helvetica" fontSize="md" fontWeight="bold" color={textColor}>
                            <Text as="kbd" fontSize="xs">tokenID: </Text>{props?.id}
                        </Text>

                        <Divider />
                        <Heading as="h4" fontFamily="Helvetica" fontSize="md" fontWeight="700" color={textColor}>
                            <Text as="kbd" fontSize="xs">title: </Text>{metadata?.name}
                        </Heading>
                    

                        <Text fontFamily="Helvetica" fontSize="md" fontWeight="bold" color={textColor}>
                            <Text as="kbd" fontSize="xs">description: </Text>{metadata?.description}
                        </Text>

                        <Text fontFamily="Helvetica" fontSize="md" fontWeight="bold" color={textColor}>
                            <Text as="kbd" fontSize="xs">creator: </Text>
                        </Text>


                    </Box>




                </VStack> 

            </VStack>



        </Link>
    );
};


export { NFT }