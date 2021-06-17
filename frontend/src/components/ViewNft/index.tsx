import React, { useContext, useEffect, useState } from 'react';
import {
    Text,
    VStack,
    HStack,
    Image,
    Heading,
    Box,
    useMediaQuery,
} from "@chakra-ui/react";
import fileType from 'file-type';

import {
    // @ts-ignore-next
    urlSource,
} from 'ipfs-http-client';
import { PbNFTModel } from '../NFTs/NFT';
import { CurrentAddressContext, ProviderContext, PbNFTContext } from '../../hardhat/SymfoniContext';
import all from 'it-all';
import { ParsedUrlQuery } from 'querystring';
import { BigNumber, utils } from 'ethers';



interface IProps {
    id: any;
    uri: any;
}

type metadataModel = {
    name: string;
    description: string;
    image: string;
    attributes: Array<string>;
};


const ViewNft: React.FunctionComponent<IProps> = (props) => {

    const { id } = props;

    const [isSmallMobileBreakpoint] = useMediaQuery(`(max-width: 430px)`);

    const PbNFT = useContext(PbNFTContext);
    const [currentAddress] = useContext(CurrentAddressContext);
    const [provider] = useContext(ProviderContext);

    const [isVideo, setIsVideo] = useState<boolean>(false);
    const [metadata, setMetadata] = useState<metadataModel>();
    const [assetURL, setAssetURL] = useState("");
    const [owner, setOwner] = useState("");



    const getOwner = async (nftId: string) => {

        if (!nftId) {

            return;
        }

        else if (PbNFT.instance) {

            // check ownerOf index converted to hex
            const owner = await PbNFT.instance.ownerOf(nftId);
            console.log('owner', owner)



            setOwner(String(owner));


        }
    }
  

    const loadMetadata = async (metaURL: string) => {
        // add gateway to resolve

        if (!metaURL){
            return;
        }

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
        loadMetadata(props.uri);
        getOwner(props.id);
        // fetch();
    }, [props.uri, isVideo]);




    if (props) {
        return (
            <VStack
                minHeight={"auto"}
                width={["auto", "auto", "auto", "920px"]}
                mb={8}
                border={"2px"}
            >
    
                <HStack
                    borderRadius="0px"
                    pb={2}
                    spacing={["0", "auto"]}
                    flexDirection={["column", "row"]}
                    alignItems="flex-start"
                >
    
                    <Box  p={10} cursor="pointer" alignSelf={isSmallMobileBreakpoint ? "center" : "inherit"}>
                        {isVideo ? (
                            <video
                            src={assetURL}
                            autoPlay
                            loop
                            muted
                            playsInline
                            height="auto"
                            width="400px"
                            style={{ borderRadius: "0px" }}
                            />
                        ) : (
    
                            <Image
                            borderRadius={"0px"}
                            border="2px"
                            height="auto"
                            width={["auto", "auto", "auto", "400px"]}
                            src={assetURL}
                            alignSelf="flex-start"
                            />
    
                        )}
                    </Box>
    
                    <VStack
                        height="100%"
                        width={["auto", "auto", "auto", "auto"]}
                        alignItems="flex-start"
                        p={10}
                        spacing={10}
                    >
                        {/* section */}
                        <HStack width="auto%" border="2px" p={4}>
                            <Heading
                                {...{
                                fontFamily: "Helvetica",
                                fontStyle: "normal",
                                fontWeight: "bold",
                                lineHeight: "126.39%",
                                }}
                                mr="auto"
                            >
                                {metadata?.name}
                            </Heading>
                            <Text fontSize="x-small" as="kbd"> title</Text>
    
                        </HStack>

                        <HStack width="auto" border="2px" p={4}>
                            <Heading
                                {...{
                                fontFamily: "Helvetica",
                                fontStyle: "normal",
                                }}
                                fontSize={["x-small", "sm", "md"]}
                                mr="auto"
                            >
                                {metadata?.description}
                            </Heading>
                            <Text fontSize="x-small" as="kbd"> desc</Text>
                        </HStack>


                        <HStack width="auto%" border="2px" p={4}>
                            <Heading
                                {...{
                                fontFamily: "Helvetica",
                                fontStyle: "normal",
                                }}
                                fontSize={["x-small", "sm", "md"]}
                                mr="auto"
                            >
                                {owner}
                            </Heading>
                            <Text fontSize="x-small" as="kbd"> owner</Text>
                        </HStack>



                     </VStack>
                </HStack>
    
            </VStack>
        );

    } else {
        return (
            <VStack
            minHeight={"container.sm"}
            width={["auto", "auto", "auto", "920px"]}
            mb={8}
            border={"2px"}
            >

                <Text>failed to load :(</Text>
            </VStack>

        );
    }
    

}


export { ViewNft };