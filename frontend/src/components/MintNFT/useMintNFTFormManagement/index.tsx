// Helper function, this is where the contract interaction is called to mint NFT's


import { useCallback, useContext, useState } from 'react';

import { CurrentAddressContext, ProviderContext, PbNFTContext, SignerContext } from '../../../hardhat/SymfoniContext';
import { PbNFT } from '../../../hardhat/typechain';

import { useEthers, useSendTransaction, useContractFunction } from '@usedapp/core'
import { utils, BigNumber } from 'ethers';
import PbNFTContract from '../../../hardhat/deployments/chainstack/PbNFT.json';

import { useRouter } from 'next/router';
import { resolve } from 'url';
import { Contract } from '@ethersproject/contracts';



import ipfsClient, {
    // @ts-ignore-next
    urlSource,
} from "ipfs-http-client";


// IPFS object
const ipfs = ipfsClient({ url: "https://ipfs.infura.io:5001" });
const pbnftInterface = new utils.Interface(PbNFTContract.abi);
const pbcontract = new Contract(PbNFTContract.address, pbnftInterface);




/**
 * 
 * @TODO: pin NFT metadata to ipfs, mint with token URI as ipfs hash
 */

export function useMintNFTFormManagement() {



    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [pbnCreatedId, setPbnCreatedId] = useState("");


    // new 
    const { account, library } = useEthers();

    const Router = useRouter();




    const { state, send } = useContractFunction(pbcontract, 'mint', { transactionName: 'mint', signer: library?.getSigner(String(account)) });


    // const PbNFT = new ethers.Contract(PbNFTContract.address, PbNFTContract.abi, library) as PbNFT;

    // const { state, send } = useContractFunction(PbNFT, 'mint', { transactionName: 'Mint'})

    // const doAMint = (owner: string, metadata: string) => {
    //     send(owner, metadata)
    // };

    async function doAMint(owner: string, metadata: string ) {
        send(owner, metadata);
    }

    // async function to request access to users web3/metamask account
    async function requestAccount() {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
    }


    /**
     *  helper function to generate metadata in JSON
     * @param assetURI - IPFS URI for the uploaded corresponding media asset
     * @param options options
     * @param {?string} name - optional name to store in metadata
     * @param {?string} description - optional description to store in metadata
     * @returns {object} - NFT metadata object
     */
    async function generateNFTMetadata(assetURI: any, options: { name: string; description: string; }) {

        const { name, description} = options;
        assetURI = ensureIpfsUriPrefix(assetURI);

        /**
         * potential options conforming to opensea metadata standards (https://docs.opensea.io/docs/metadata-standards)
         * 
         * -image: url or ipfs
         * -image_data: raw svg data
         * -external_url: url that will appear below assets image
         * -description: human readable description, markdown supported!
         * -name: name of item
         * -attributes[]: eg. "attributes: [ { "trait_type": "Level", "value": 5}, ]"
         * -background_color: six digit hex without #
         * -animation_url: url to multi media attatched for item. (GLTF, GLB, WEBM, MP4, M4V, OGV, OGG, MP3, WAV, OGA). also supportes html pages.
         * -youtube_url: youtube video url
         */

        // return metadata object
        return {
            name,
            description,
            image: assetURI,
            attributes: [
                {
                    trait_type: "Personality",
                    value: "Bread"
                },
            ]
            
        };

    }


    const ensureIpfsUriPrefix = (cidOrURI: any) => {
        // get uri
        let uri = cidOrURI.toString();

        if(!uri.startsWith('ipfs://') && !uri.startsWith('https://gateway.ipfs.io/ipfs/')) {
            // ensure that we have a ipfs uri set
            uri = 'ipfs://' + cidOrURI;
        }

        if (uri.startsWith('ipfs://ipfs/')) {
            uri = uri.replace('ipfs://ipfs/', 'ipfs://');
        }

        // should hit on uploaded images? this is so fucking stupid lol
        if (uri.startsWith('https://gateway.ipfs.io/ipfs/')) {
            uri = uri.replace('https://gateway.ipfs.io/ipfs/', 'ipfs://');
        }

        return uri;

    }


    /**
     * 
     * @param params : [name, desc, imageipfsurl, empty]
     * @returns 
     */

    const submitHandler = async (params: Parameters<PbNFT["mint"]>) => {
        // debug
        console.log('hit hit hit');
        console.log('SUMBIT HANDLER RECEIVED PARAMS:', params);


        console.log('PBNFT: ', PbNFT);
        return new Promise(async (resolve) => {

            // Need to convert ether to gwei here for transaction
            console.log('params2:', params[2]);



            // // Resolve ENS for recipient and _token
  

            try {

    


                // Setup our NFT metadata here
                const assetURI = ensureIpfsUriPrefix(params[2]); // params[2] is where the ipfs media URL lives (that we already uploaded). this should give us a clean ipfs hash
                console.log('generated/checked assetURI: ', assetURI);

                const metadata = await generateNFTMetadata(assetURI, { name: params[0], description: params[1] } );
                console.log('generated NFT metadata: ', metadata);

                // Upload the metadata to IPFS
                // We're adding cid specification to 'options?'
                const metadataCid = await ipfs.add({ path: '/nft/metadata.json', content: JSON.stringify(metadata)},  {
                    cidVersion: 1,
                    hashAlg: 'sha2-256',
                    progress: (prog: any) => console.log(`received: ${prog}`),
                });
                console.log('metadataCID:', metadataCid);
                const metadataURI = ensureIpfsUriPrefix(metadataCid.cid.toString()) + '/metadata.json';


                console.log('generated metadata URI: ', metadataURI);


                // ipfs:// prefix is added on mint, so we can replace it here
                const cleanMetadata = metadataURI.replace('ipfs://', '');



                // INTERACT WITH CONTRACT HERE
                if (library && account) {
                    //
                    console.log('wallet connect, librabry pass');
                
                    const signer = await library.getSigner(String(account));

                    console.log('signer', signer);

                    // const pbContract = new ethers.Contract(
                    //     PbNFTContract.address,
                    //     PbNFTContract.abi,
                    //     library
                    // ) as PbNFT;

                    pbcontract.connect(library.getSigner(String(account)));
                    
                    // const tranny = (owner: string, metadata: string) => {
                    //     send(owner, metadata)
                    // }

                    // const tx =  await doAMint(String(account), String(cleanMetadata));
                    // library.contra
                    
                    const tx =  doAMint(String(account), String(cleanMetadata));

                    console.log('transaction:', tx);
                    // await tx?.wait();
    
                    
    
    
               
                    setHasSubmitted(true);
    
                    const nftMintedSentEventFilter = pbcontract?.filters.NFTMinted(
                        String(account),
                    );
    
                    if (nftMintedSentEventFilter) {
                        console.log('NFT MINTED SENT EVENT FILTER HIT');
    
                        const logs = await library?.getLogs({
                            ...nftMintedSentEventFilter,
                            fromBlock: 0,
                        });
    
                        const nftsMinted = logs?.map(
                
                            (log) => pbcontract?.interface?.parseLog(log)?.args
                        );
    
                        if (nftsMinted?.[nftsMinted.length - 1]) {
                            console.log(nftsMinted);
                            const nftMinted = nftsMinted?.[nftsMinted.length - 1];
    
                            setPbnCreatedId(nftMinted?.[2]);
                        }
    
                    }
    
    
                    resolve(true);
                }



            } catch (e) {
                console.error(e);
                Router.push("/error");
                resolve(false);
            }
        });
    };


    const onSubmit = useCallback(submitHandler, [
        PbNFT,
        library,
        account,
        Router,
    ]);

    const initialValues: Parameters<PbNFT["mint"]> = [
        "",
        "",
    ];
    
    return {
        onSubmit,
        initialValues,
        hasSubmitted,
        pbnCreatedId,
    };
}
