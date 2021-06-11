// MintNFT index.ts is a react component for uploading/minting/pinning NFT's on IPFS and Polygon

import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Button, VStack, Input, FormControl, FormErrorMessage, Box, HStack, Center, Image, Heading, useClipboard, Text, FormLabel, keyframes, Spinner, useColorMode, useColorModeValue, useProps } from '@chakra-ui/react';
import { CloseIcon, CopyIcon, SmallCloseIcon, SpinnerIcon } from '@chakra-ui/icons';

import ipfsClient, {
    // @ts-ignore-next
    urlSource,
  } from "ipfs-http-client";
import { darken } from 'polished';
// import  graphic  from '../../../public/graphic.png';

import { useMintNFTFormManagement } from './useMintNFTFormManagement';
import { Form, useFormik } from 'formik';
import { BigNumber, ethers } from 'ethers';

import PbNFTDeployment from '../../hardhat/deployments/chainstack/PbNFT.json';

import { CurrentAddressContext, ProviderContext, SignerContext } from '../../hardhat/SymfoniContext';
import all from 'it-all';
import fileType from 'file-type';

import path from 'path';

// const ipfs = create(new URL('https://ipfs.infura.io:5001'));
const ipfs = ipfsClient({ url: "https://ipfs.infura.io:5001" });



const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;


interface IProps {
    isSubmitting?: boolean;
}


interface ISubmittedProps {
    url: string;
    id: string;
}

export const PbNFTContractAddress = PbNFTDeployment.receipt.contractAddress;
export const PbNFTAbi = PbNFTDeployment.abi;

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
    // const { assetCid } = props.assetCid;


    const bgColor = useColorModeValue("black.500", "black.200");
    const textColor = useColorModeValue("white.500", "black.500");


    return (
        <Center 
            width={["auto", "auto", "90vw", "1200px"]}
            height={["auto", "auto", "auto", "775px"]}
            {...{
                background: bgColor,
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
                        color: textColor,
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
                        color: textColor,
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
                        color={textColor}
                        {...{
                            fontFamily: "Helvetica",
                            fontStyle: "normal",
                            fontWeight: "bold",
                            fontSize: "18px",
                            width: "400px",
                            textAlign: "center",
                        }}
                        >
                            your work here is greatly appreciated.
                        </Text>

                        <Text
                            {...{
                                fontFamily: "Helvetica",
                                fontStyle: "normal",
                                fontWeight: "bold",
                                fontSize: "18px",
                                width: "400px",
                                textAlign: "center",
                                color: textColor,
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
    const [assetCid, setAssetCid] = useState<any>();
    const [pbNFTContract, set] = useState<ethers.Contract | undefined>(undefined);


    // color mode shit
    const bgColor = useColorModeValue("black.500", "black.200");
    const bg2Color = useColorModeValue("gray.900", "gray.200");
    const textColor = useColorModeValue("white.500", "black.500");
    const text2Color = useColorModeValue("gray.200", "gray.900");

    // Check if our IPFS file is a video 
    useEffect(() => {
        const fetch = async function () {
            const ipfsFileUrl = _url;
            console.log(ipfsFileUrl);

            if (ipfsFileUrl?.includes("mp4") && !isVideo) {
                setIsVideo(true);
            } else if (ipfsFileUrl?.includes("ipfs") && !isVideo) {
                const [urlSourced] = await all<any>(urlSource(ipfsFileUrl));
                const [file] = await all<ArrayBuffer>(urlSourced.content);
                const fileTypeResult = await fileType.fromBuffer(file);
                const isVideo = Boolean(fileTypeResult?.mime?.includes("video"));

                setIsVideo(isVideo);
            }
        };

        fetch();
    }, [_url, isVideo]);


    /**
     * 
     * @param file 
     */
    async function saveToIpfs(file: File) {
        console.log('file', file);

        if (file) {
            setIsUploadingImage(true);
            // setup our path?
            const filePath = file.name;
            // extract file name for fully qualified path?
            const baseName = path.basename(filePath);
            const ipfsPath = '/nft/' + baseName;
            console.log('filePath: ', ipfsPath);

            // Do ipfs shit
            
            const assetCid = await ipfs
                .add( {path: ipfsPath, content: file}, {
                    // CID spec for NFT metadata, see for ref: https://docs.ipfs.io/how-to/best-practices-for-nft-data/#types-of-ipfs-links-and-when-to-use-them
                    cidVersion: 1,
                    hashAlg: 'sha2-256',
                    progress: (prog: any) => console.log(`received: ${prog}`),
                })
                .then((file) => {
                    // lemme see
                    console.log('file',file);
                    const ipfsHash = file.cid.toString();
                    const ipfsGateway = "https://gateway.ipfs.io/ipfs/";
                    formik.setFieldValue(
                        String(params.indexOf("_url")),
                        (ipfsGateway + ipfsHash + '/' + `${baseName}`)
                    );

                    setIsUploadingImage(false);
                    setChosenFile(undefined);
                    setChosenFileUrl("");
                    // MARK debug
                    setIsApproved(true);
                    setAssetCid(assetCid);

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
                url={formik?.values?.[
                    Number(params?.indexOf("_url"))
                ]?.toString() || 'whydontthisworkman'}
            ></Submitted>
        );
    }

    return (
        <form onSubmit={formik.handleSubmit}>
            <HStack
                spacing={0}
                border={"2px"}
                // {...{
                //     boxShadow: "0px 0px 68px rgba(27, 39, 70, 0.15)",
                //     borderRadius: "0px",
                //     background: 
                //         bgColor,
                // }}
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
                                    border="2px"
                                    borderColor={bg2Color}
                                    maxHeight={
                                        (chosenFileUrl ||
                                            formik.values?.[Number(params.indexOf("_url"))]) &&
                                        "463px"
                                    }
                                    height={
                                        ((chosenFileUrl ||
                                            formik.values?.[Number(params.indexOf("_url"))]) && 
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
                                        '/graphic.png'
                                    }
                                    mb={"18px"}
                                    ></Image>
                            )}

                            {chosenFileUrl && (
                                <Box 
                                {...{
                                    position: "absolute",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    width: "40px",
                                    height: "40px",
                                    right: "8px",
                                    top: "8px",
                                    background: "rgba(255,255,255,0.3",
                                    borderRadius: "0px",
                                }}
                                cursor="pointer"
                                onClick={() => {
                                    if (chosenFileUrl.length) {
                                        setChosenFile(undefined);
                                        setChosenFileUrl("");
                                        setIsVideo(false);
                                    } else {
                                        formik.setFieldValue(String(params.indexOf("_url")), "");
                                    }
                                }}
                                >
                                    <CloseIcon height="12px" width="12px"></CloseIcon>
                                </Box>
                            )}
                        </Box>

                        <FormControl 
                            display={
                                formik?.values?.[Number(params.indexOf("_url"))]
                                ? "block"
                                : "none"
                            }

                            borderRadius="0px"
                            key={"_url"}
                            isInvalid={Boolean(formik.errors[0] && formik.touched[0])}
                            mt={
                                ((chosenFileUrl || 
                                    formik.values?.[Number(params.indexOf("_url"))]) &&
                                    "auto !important") ||
                                    "inherit"
                            }
                        >
                            <Input 
                                isRequired
                                disabled
                                _disabled={{ cursor: "default" }}
                                height={"56px"}
                                width={"424px"}
                                placeholder="Cover URL"
                                key={"_url"}
                                data-testid={"_url"}
                                id={String(params.indexOf("_url"))}
                                name={String(params.indexOf("_url"))}
                                onChange={formik.handleChange}
                                type="text"
                                value={formik.values[
                                    Number(params.indexOf("_url"))
                                ]?.toString()}
                                borderRadius={"0px"}
                                border="none"
                                color={textColor}
                                bg={bgColor}
                                {...{
                                    fontFamily: "Helvetica",
                                    fontStyle: "normal",
                                    fontWeight: "normal",
                                    fontSize: "16px",
                                    lineHeight: "137.88%",
                                }}
                                mb={"32px"}
                                />
                            <FormErrorMessage>
                                {formik.errors[Number(params.indexOf("_url"))]}
                            </FormErrorMessage>

                        </FormControl>

                        {chosenFileUrl.length ? (
                            <Button
                                variant="outline"
                                _hover={{ background: "transparent", border: "1px solid grey" }}
                                cursor="pointer"
                                {...{
                                    fontFamily: "Helvetica",
                                    fontStyle: "normal",
                                    fontWeight: "normal",
                                    fontSize: "16px",
                                    lineHeight: "137.88%",
                                }}

                                color={textColor}
                                borderRadius="0px"
                                boxSizing="border-box"
                                border="1px solid orange"
                                borderColor="orange"
                                backgroundColor={bgColor}
                                textAlign="center"
                                height={"56px"}
                                width={"424px"}
                                mt={
                                    ((chosenFileUrl || 
                                        formik.values?.[Number(params.indexOf("_url"))]) && 
                                        "inherit") ||
                                        "auto"
                                }
                                m={0}
                                onClick={() => {
                                    if (chosenFile) {
                                        saveToIpfs(chosenFile);
                                    }
                                }}
                                >
                                    {isUploadingCoverImageUrl ? (
                                        <SpinnerIcon
                                            color={textColor}
                                            animation={`${spin} 2s infinite linear`}
                                        />
                                    ) : (
                                        "Upload File to IPFS"
                                    )}
                                </Button>

                        ) : (
                            <FormLabel
                                display="inline-block"
                                cursor="pointer"
                                {...{
                                    fontFamily: "Helvetica",
                                    fontStyle: "normal",
                                    fontWeight: "norma; ",
                                    fontSize: "16px",
                                    lineHeight: "137.88%",
                                }}
                                color={textColor}
                                borderRadius="0px"
                                border="1px"
                                borderColor={bgColor}
                                textAlign="center"
                                height={"56px"}
                                width={"424px"}
                                m={0}
                                mt={
                                    ((chosenFileUrl ||
                                        formik.values?.[Number(params.indexOf("_url"))]) && 
                                        "inherit") ||
                                        "auto"
                                }
                                px={5}
                                boxSizing="border-box"
                                py={"17px"}
                                _hover={{ border: "1px solid grey" }}
                                >

                                    {"Choose Image or mp4"}
                                    <Input 
                                        onChange={(event) => {
                                            event.stopPropagation();
                                            event.preventDefault();
                                            if (event.target.files) {
                                                return handleChooseFile(event.target.files);
                                            }
                                        }}
                                        display="none"
                                        type="file"
                                    />
                                </FormLabel>
                        
                        )}

                        </VStack>

                </Center>

                <Center background={bg2Color}
                width={["auto", "auto", "auto", "50%"]}
                height="100%"
                py={[5, 5, 5, 5, 0]}
                px={[5, 5, 5, 5, 20]}
                borderTopLeftRadius="none"
                borderBottomLeftRadius="none"
                >

                    <VStack spacing={"24px"} width={"420px"}>
                        <Heading
                            {...{
                                fontFamily: "Helvetica",
                                fontStyle: "normal",
                                fontWeight: "bold",
                                fontSize: "24px",
                                lineHeight: "126.39%",
                                color:  text2Color,
                                alignSelf: "flex-start",
                            }}
                            mt={`0px !important`}
                            mb={"8px"}
                            >
                                Mint a new NFT
                            </Heading>

                            <Text
                                {...{
                                    fontFamily: "Helvetica",
                                    fontStyle: "normal",
                                    fontWeight: "normal",
                                    fontSize: "16px",
                                    lineHeight: "137.88%",
                                    color: "grey",
                                    textAlign: "left",
                                    alignSelf: "flex-start",
                                }}
                                mt={`0px !important`}
                                mb={"32px"}
                            >
                                Add your work, a title, and description
                            </Text>

                            {params.map((param, index) => {
                                if (param === "_url") {
                                    return null;
                                }

                                return (
                                    <FormControl
                                        key={param}
                                        isInvalid={Boolean(
                                            formik.errors[index] && formik.touched[index]
                                        )}
                                        background={bgColor}
                                        borderRadius="0px"
                                        mt={"auto"}
                                        // mt={index === 0 ? `0px !important` : "inherit"}
                                    >
                                        <FormLabel  textAlign="center" htmlFor="_name" backgroundColor={bg2Color} color={bg2Color}></FormLabel>
                                        <FormLabel textAlign="center" htmlFor="_desc"></FormLabel>

                                        <Input
                                            isRequired
                                            placeholder={getPlaceholder(param)}
                                            key={param}
                                            data-testid={param}
                                            id={index.toString()}
                                            name={index.toString()}
                                            onChange={formik.handleChange}
                                            type={"text"}
                                            value={formik.values[index]?.toString()}
                                            {...{
                                                fontFamily: "Helvetica",
                                                fontStyle: "normal",
                                                fontWeight: "normal",
                                                fontSize: "16px",
                                                textAlign: "left",
                                                color: text2Color
                                                
                                            }}
                                            height={"56px"}
                                            width={"424px"}
                                            borderRadius="0px"
                                            borderColor={text2Color}
                                        />
                                        <FormErrorMessage>{formik.errors[index]}</FormErrorMessage>

                                        
                                    </FormControl>
                                );
                            })}

                            <Button 
                                data-testid={"submit"}
                                type={
                                    isApproved ||
                                    formik?.values?.[Number(params.indexOf("_name"))] === 0
                                    ? "submit"
                                    : "button"
                                }

                                onClick={() => {
                                    !isApproved && 
                                        formik?.values?.[Number(params.indexOf("_name"))] !== 0 
                                        // this normally would be for _amount
                                        // make transaction here
                                }}

                                isDisabled={!formik.values?.[Number(params.indexOf("_name"))]}
                                isLoading={props.isSubmitting || formik.isSubmitting}
                                variant="outline"
                                background="grey"
                                _hover={{ background: darken(0.1, "black") }}
                                borderRadius="0px"
                                width={"100%"}
                                height={"56px"}
                                color="white"
                                _disabled={{ background: darken(0.1, "black") }}
                                {...{
                                    fontFamily: "Helvetica",
                                    fontStyle: "normal",
                                    fontWeight: "normal",
                                    fontSize: "16px",
                                    lineHeight: "137.88%",
                                }}
                                >
                                    {isApproved ||
                                        formik?.values?.[Number(params.indexOf("_name"))] === 0
                                        ? "Submit"
                                        : "Approve"}
                                </Button>

                    </VStack>
                </Center>
            </HStack>

        </form>
    );



};

export { MintNFT }