import React, { useContext, useEffect, useState } from 'react';
import {
    Flex,
    Stack,
    Text,
    Button,
    VStack,
    HStack,
    Image,
    useDisclosure,
    Heading,
    Box,
    useMediaQuery,
} from "@chakra-ui/react";
import fileType from 'file-type';
import { useVideo } from 'react-use';

import {
    // @ts-ignore-next
    urlSource,
} from "ipfs-http-client";
import { PbNFTModel } from '../NFTs/NFT';
import { useParams } from "react-router-dom";
import { CurrentAddressContext, ProviderContext, PbNFTContext } from '../../hardhat/SymfoniContext';
import { utils } from 'ethers';
import all from 'it-all';
import { nameResolver } from '../../lib/nameresolver';
import { truncateHash } from '../../lib/truncatehash';
import { formatAddress } from '../../lib/formataddress';








interface IProps {
    id: string;
    nft: PbNFTModel;
    ownedBy: string;
}

type metadataModel = {
    name: string;
    description: string;
    image: string;
    attributes: Array<string>;
};


const ViewNft: React.FunctionComponent<IProps> = (props) => {

    const { nft, ownedBy, } = props;
    const { id } = props;

    const [isSmallMobileBreakpoint] = useMediaQuery(`(max-width: 430px)`);

    const PbNFT = useContext(PbNFTContext);
    const [currentAddress] = useContext(CurrentAddressContext);
    const [provider] = useContext(ProviderContext);

    const [isVideo, setIsVideo] = useState<boolean>(false);
    const [metadata, setMetadata] = useState<metadataModel>();
    const [assetURL, setAssetURL] = useState("");

    const _url = nft?.metadataURI;

    console.log(props);



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

        loadMetadata(_url);
        // fetch();
    }, [_url, isVideo]);



    const isRecipient = currentAddress == ownedBy;

    if (nft) {
        return (
            <VStack
                minHeight={"884px"}
                width={["auto", "auto", "auto", "920px"]}
                mb={8}
                border={"2px"}
            >
    
                <HStack
                    boxShadow="0px 0px 24px rgba(27, 39, 70, 0.1)"
                    borderRadius="16px"
                    pb={2}
                    spacing={["0", "32px"]}
                    flexDirection={["column", "row"]}
                    alignItems="flex-start"
                >
    
                    <Box cursor="pointer" alignSelf={isSmallMobileBreakpoint ? "center" : "inherit"}>
                        {isVideo ? (
                            <video
                            src={assetURL}
                            autoPlay
                            loop
                            muted
                            playsInline
                            height="auto"
                            width="400px"
                            style={{ borderRadius: "16px" }}
                            />
                        ) : (
    
                            <Image
                            borderRadius={"16px"}
                            height="auto"
                            width={["auto", "auto", "auto", "400px"]}
                            src={assetURL}
                            alignSelf="flex-start"
                            />
    
                        )}
                    </Box>
    
                    <VStack
                        height="100%"
                        width={["auto", "auto", "auto", "520px"]}
                        alignItems="flex-start"
                        p={4}
                        spacing={"24px"}
                    >
                        {/*  */}
                        <HStack width="100%">
                            <Heading
                                {...{
                                fontFamily: "Roboto",
                                fontStyle: "normal",
                                fontWeight: "bold",
                                fontSize: "24px",
                                lineHeight: "126.39%",
                                }}
                                color="#013A6D"
                                mr="auto"
                            >
                            {metadata?.name}
                        </Heading>
    
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