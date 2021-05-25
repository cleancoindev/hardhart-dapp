// MintNFT index.ts is a react component for uploading/minting/pinning NFT's on IPFS and Polygon

import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Button, VStack, Input, FormControl, FormErrorMessage, Box, HStack, Center, Image, Heading, useClipboard, Text, FormLabel, keyframes } from '@chakra-ui/react';
import { CloseIcon, CopyIcon, SmallCloseIcon, SpinnerIcon } from '@chakra-ui/icons';

import { useMintNFTFormManagement } from './useMintNFTFormManagement';
import { useFormik } from 'formik';

import { CurrentAddressContext, ProviderContext, SignerContext } from '../../hardhat/SymfoniContext';


interface IProps {
    isSubmitting?: boolean;
}


interface ISubmittedProps {
    url: string;
    id: string;
}

// Form input params
export const params = [
    "_name",
    "_desc",
    "_url",
  ] as const;


export const Submitted: React.FC<ISubmittedProps> = (props) => {

    const { hasCopied, onCopy } = useClipboard(props.url);

    // Hot linking for uploaded nft
    const nftIdUrl = `${window.location.href.replace("/mint-nft", `/nft/${props.id}`)}`;
    const { hasCopied: hasIdCopied, onCopy: onIdCopy } = useClipboard(nftIdUrl);


    return (
        <Center 
            width={["auto", "auto", "90vw", "1200px"]}
            height={["auto", "auto", "auto", "775px"]}
            {...{
                background: "black",
                borderRadius: "16px",
                py: 8
            }}
        >
            <VStack spacing={0}>
                <Heading
                    as="h3"
                    {...{
                        fontFamily: "Helvetica",
                        fontStyle: "normal",
                        fontWeight: "bold",
                        fontSize: "24px",
                        color: "white",
                    }}
                    mb={"24px"}
                >
                    Your NFT has been successfully created.    
                </Heading>
                <Image src={props.url} width="425px" height="auto" mb={"26px"}></Image>

                <HStack spacing={3} mb={"12px"}>
                    <Text 
                    {...{
                        fontFamily: "Helvetica",
                        fontStyle: "normal",
                        fontSize: "16px",
                        textOverflow: "ellipsis",
                        width: "290px",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        color: "white",
                    }}
                    >
                        {props.url}
                    </Text>

                    {hasCopied ? (
                        <Text>Copied</Text>
                    ) : (
                        <CopyIcon 
                            color="white"
                            id="add"
                            cursor="pointer"
                            onClick={onCopy}
                            ></CopyIcon>
                    )}

                </HStack>

                <VStack spacing={1}>
                    <Text
                        color="white"
                        {...{
                            fontFamily: "Helvetica",
                            fontStyle: "normal",
                            fontWeight: "bold",
                            fontSize: "18px",
                            width: "400px",
                            textAlign: "center",
                        }}
                        >
                            hey dumbass
                        </Text>

                        <Text
                            {...{
                                fontFamily: "Helvetica",
                                fontStyle: "normal",
                                fontWeight: "bold",
                                fontSize: "18px",
                                width: "400px",
                                textAlign: "center",
                                color: "white",
                            }}
                            >
                                Share the image and URL 
                        </Text>
                </VStack>



            </VStack>
        </Center>
    );
};


// placeholder data for input forms
export type ValuesOf<T extends readonly any[]> = T[number];

const getPlaceholder = (param: ValuesOf<typeof params>) => {

    switch(param) {
        case "_name": {
            return "A title/name for your NFT";
        }
        case "_desc": {
            return "Description for your NFT (e.g 'it's blue!')";
        }
        default: {
            return param;
        }
    }
};



// createNFT

const MintNFT: React.FunctionComponent<IProps> = (props) => {

    const mgmt = useMintNFTFormManagement();
    const formik = useFormik(mgmt);

    const [provider] = useContext(ProviderContext);
    const [signer] = useContext(SignerContext);
    const [currentAddress] = useContext(CurrentAddressContext);
    // formik 
    const _url = String(formik?.values[Number(params.indexOf("_url"))]);

    const [isApproved, setIsApproved] = useState<boolean>(false);
    const [maxAmount, setMaxAmount] = useState<number>(0);
    const [isUploadingCoverImageUrl, setIsUploadingImage] = useState<boolean>(
        false
      );
    const [chosenFile, setChosenFile] = useState<File | undefined>(undefined);
    const [chosenFileUrl, setChosenFileUrl] = useState<string>("");
    const [isVideo, setIsVideo] = useState<boolean>(false);


    // Check if our IPFS file is a video 
    useEffect(() => {
        const fetch = async function () {
            const ipfsFileUrl = _url;
            console.log(ipfsFileUrl);

            if (ipfsFileUrl?.includes("mp4") && !isVideo) {
                setIsVideo(true);
            } else if (ipfsFileUrl?.includes("ipfs") && !isVideo) {
                const [urlSourced] = await all <any>(urlSource(ipfsFileUrl));
                const [file] = awiat all<ArrayBuffer(urlSourced.content);
                const fileTypeResult = await fileType.fromBuffer(file);
                const isVideo = Boolean(fileTypeResult?.mime?.includes("video"));

                setIsVideo(isVideo);
            }
        };

        fetch();
    }, [_url, isVideo]);

    async function saveToIpfs(file: File) {

        if (file) {
            setIsUploadingImage(true);
            ipfs
                .add(file, {
                    progress: (prog: any) => console.log(`received: ${prog}`),
                })
                .then((file) => {
                    // lemme see
                    console.log(file);
                    const ipfsHash = file.path;
                    const ipfsGateway = "https://gateway.ipfs.io/ipfs/";
                    formik.setFieldValue(
                        String(params.indexOf("_url")),
                        ipfsGateway + ipfsHash
                    );

                    setIsUploadingImage(false);
                    setChosenFile(undefined);
                    setChosenFileUrl("");
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    }

    function handleChooseFile(files: FileList) {
        setIsVideo(false);

        const fileExtension = files?.[0]["name"]
            .substring(files?.[0]["name"].lastIndexOf(".") + 1)
            .toLowerCase();

            // Dumbest shit ever please fix
        if (
            files &&
            files[0] &&
            (fileExtension === "gif" || 
                fileExtension === "png" ||
                fileExtension === "jpeg" ||
                fileExtension === "jpg")
        ) {
            // select our file
            setChosenFile(files[0]);

            const reader = new FileReader();

            reader.onload = function (e) {
                if (e?.target?.result) {
                    console.log(e.target.result);

                    setChosenFileUrl(e.target.result.toString());
                }
            };

            // Read data
            reader.readAsDataURL(files[0]);
        } else if (files && files[0] && fileExtension === "mp4") {
            // video case
            const reader = new FileReader();

            reader.onload = (e) => {
                var videoElement = document.createElement("video");

                if (e?.target?.result) {
                    videoElement.src = String(e.target.result);
                    setChosenFileUrl(e.target.result.toString());
                }
            };

            reader.readAsDataURL(files[0]);
            // update video state
            setIsVideo(true);

            setChosenFile(files[0]);
        }
    }

    // lol
    if (mgmt.hasSubmitted) {

        return (
            <Submitted 
                id={mgmt.pbnCreatedId}
                url={formik.values?.["5"]}
            ></Submitted>
        );
    }

    return (
        <form onSubmit={formik.handleSubmit}>
            <HStack
                spacing={0}
                {...{
                    boxShadow: "0px 0px 68px rgba(27, 39, 70, 0.15)",
                    borderRadius: "16px",
                    background: 
                        "linear-gradient(342.98deg, #013A6D 0%, #0055AC 56.01%, #0065D0 93.35%)",
                }}
                width={["auto", "auto", "auto", "1200px"]}
                height={["auto", "auto", "auto", "775px"]}
                flexDirection={["column", "column", "column", "row"]}
                alignItems={["center", "center", "center", "inherit"]}
                mb={8}
            >


                <Center height={"100%"} width={["100%", "100%", "100%", "50%"]}>
                    {" "}
                    <VStack
                        spacing={0}
                        py={"36px"}
                        height={"100%"}
                        alignItems={["center", "center", "center", "inherit"]}
                    >
                        <Box position="relative">
                            {chosenFile?.type?.includes("video") || isVideo? (
                                <video
                                    src={
                                        formik?.values?.[
                                            Number(params?.indexOf("_url"))
                                        ]?.toString() || chosenFileUrl
                                    }

                                    autoPlay
                                    playsInline
                                    muted
                                    loop
                                    height="auto"
                                    width="464px"
                                />
                            ) : (

                                <Image 
                                    borderRadius="16px"
                                    maxHeight={
                                        (chosenFileUrl ||
                                            formik.values?.[Number(params.indexOf("_url"))]) &&
                                        "463px"
                                    }
                                    height={
                                        ((chosenFileUrl ||
                                            formik.values?.[Number(params.indexOf("_url"))])) && 
                                            "auto") ||
                                        "463px"
                                    }
                                    maxWidth={
                                        ((chosenFileUrl ||
                                          formik.values?.[Number(params.indexOf("_url"))]) &&
                                          "424px") ||
                                        "304px"
                                    }
                                    src={
                                        chosenFileUrl ||
                                        formik.values?.[
                                          Number(params.indexOf("_url"))
                                        ]?.toString() ||
                                        graphic
                                    }
                                    mb={"18px"}
                                    ></Image>
                            )}
                            
                        </Box>

                        </VStack>

                </Center>






            </HStack>




        </form>
    )



}