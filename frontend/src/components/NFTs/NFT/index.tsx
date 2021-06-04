

import React, { useEffect, useState } from 'react';
import { Flex, Stack, Text, Button, Image, VStack, Heading, useColorModeValue, Box } from '@chakra-ui/react';
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





const NFT: React.FunctionComponent<PbNFTModel> = (props) => {

    const [isVideo, setIsVideo] = useState<boolean>(false);

    const bgColor = useColorModeValue("black.500", "black.200");
    const textColor = useColorModeValue("white.500", "black.500");


    
    // check if ipfs file is video
    useEffect(() => {

        const fetch = async function () {
            console.log('props?:', props)

            const initURL = props[0];

            //should point to our metadata.json ipfs url
            const ipfsFileUrl = initURL.replace('ipfs://', 'https://gateway.ipfs.io/ipfs/');
            console.log(ipfsFileUrl);


            // const api_call = await fetch(ipfsFileUrl);

            if (isVideo) {
                return;
            }

            if (ipfsFileUrl?.includes("mp4") && !isVideo) {

                setIsVideo(true);

            } else if (ipfsFileUrl?.includes("ipfs") && !isVideo) {

                // if (ipfsFileUrl?.includes("metadata.json")) {

                //     const fetchURL = ipfsFileUrl.replace('ipfs://', 'https://gateway.ipfs.io/ipfs/');

                //     const [urlSourced] = await all<any>(urlSource(fetchURL));
                //     const [file] = await all<JSON>(urlSourced.content);

                // }

                const [urlSourced] = await all<any>(urlSource(ipfsFileUrl));
                const [file] = await all<ArrayBuffer>(urlSourced.content);
                const fileTypeResult = await fileType.fromBuffer(file);

                // const jsonfile = JSON.parse(JSON.stringify(file));

                // console.log('JASON FILE', jsonfile)
                const isVideo = Boolean(fileTypeResult?.mime?.includes("video"));

                console.log({ isVideo });

                if (isVideo) {
                    setIsVideo(true);
                }
            }
        };

        fetch();
    }, [props.metadataURI, isVideo]);


    return (
        <Link href={`/nft/${props.id}`}>
            <VStack spacing={10} width="auto" boxShadow="0px opx 24px rgba(27, 39, 70, 0.1)" cursor="pointer" border="2px">

                {isVideo ? (

                    <video
                        src={props.url}
                        autoPlay
                        loop
                        muted
                        playsInline
                        height="auto"
                        width="220px"
                        style={{ borderRadius: "0px"}}
                    />
                ) : (
                    <Image width="220px" height="auto" src={props?.url} borderRadius="0px" border="2px" marginTop="5" borderColor={bgColor}></Image>
                )}


                <VStack p={2} width="100%" spacing={1} alignItems="flex-start" >
                    <Box border="2px" borderColor={bgColor}>

                        <Text fontFamily="Helvetica" fontSize="16px" fontWeight="bold" color={textColor}>
                            <Text as="kbd" fontSize="10px">tokenID: </Text>{props?.id}
                        </Text>


                        <Heading as="h4" fontFamily="Helvetica" fontSize="18px" fontWeight="700" color={textColor}>
                            <Text as="kbd" fontSize="10px">title: </Text>{props?.name}
                        </Heading>
                    

                        <Text fontFamily="Helvetica" fontSize="16px" fontWeight="bold" color={textColor}>
                            <Text as="kbd" fontSize="10px">description: </Text>{props?.description}
                        </Text>

                        <Text fontFamily="Helvetica" fontSize="16px" fontWeight="bold" color={textColor}>
                            <Text as="kbd" fontSize="10px">creator: </Text>{props?.createdBy}
                        </Text>


                    </Box>




                </VStack> 

            </VStack>



        </Link>
    );
};


export { NFT }