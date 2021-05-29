// Helper function, this is where the contract interaction is called to mint NFT's


import { useCallback, useContext, useState } from 'react';

import { CurrentAddressContext, ProviderContext, PbNFTContext, SignerContext } from '../../../hardhat/SymfoniContext';
import { PbNFT } from '../../../hardhat/typechain/PbNFT';
import { BigNumber, ethers, } from 'ethers';

import { useRouter } from 'next/router';
import { resolve } from 'url';
import { PbNFTContractAddress } from '..';

import ipfsClient, {
    // @ts-ignore-next
    urlSource,
} from "ipfs-http-client";


// IPFS object
const ipfs = ipfsClient({ url: "https://ipfs.infura.io:5001" });



/**
 * 
 * @TODO: pin NFT metadata to ipfs, mint with token URI as ipfs hash
 */

export function useMintNFTFormManagement() {

    const [currentAddress] = useContext(CurrentAddressContext);
    const [provider] = useContext(ProviderContext);
    const [signer] = useContext(SignerContext);
    const  PbNFT = useContext(PbNFTContext);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [pbnCreatedId, setPbnCreatedId] = useState("");

    const Router = useRouter();




    /**
     *  helper function to generate metadata in JSON
     * @param assetURI - IPFS URI for the uploaded corresponding media asset
     * @param options options
     * @param {?string} name - optional name to store in metadata
     * @param {?string} description - optional description to store in metadata
     * @returns {object} - NFT metadata object
     */
    async function generateNFTMetadata(assetURI: any, options: { name: String; description: String; }) {

        const { name, description} = options;
        assetURI = ensureIpfsUriPrefix(assetURI);

        // return metadata object
        return {
            name,
            description,
            image: assetURI
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
        console.log(params);


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
                const metadataCid = await ipfs.add({ path: '/nft/metadata.json', content: JSON.stringify(metadata)}, {
                    progress: (prog: any) => console.log(`received: ${prog}`),
                });
                console.log('metadataCID:', metadataCid);
                const metadataURI = ensureIpfsUriPrefix(metadataCid.cid.toString()) + '/metadata.json';


                console.log('generated metadata URI: ', metadataURI);


                // Mint NFT with reference to the metadata URI




                // const connect = await PbNFT?.factory?.connect(PbNFTContractAddress, provider);
                
                // TESTING REMOVE FOR MAINNET
            
                // const connect = PbNFT?.instance?.connect(provider);
                
                // input as the current address to the owner, and the metadataURI (ipfs hash resolving to metadata) as the uri inpput
                // const gasLimit = await PbNFT?.instance?.estimateGas.mint(String(currentAddress), metadataURI)
                

                // const tx = await PbNFT?.instance?.mint(String(currentAddress), metadataURI, {gasLimit: gasLimit?.add("80000")} );
                const tx = await PbNFT?.instance?.mint(String(currentAddress), metadataURI);
                // const tx = await PbNFT?.instance?.mint
                console.log('transaction:', tx);
                await tx?.wait();



           
                setHasSubmitted(true);

                const nftMintedSentEventFilter = PbNFT?.instance?.filters?.Transfer(
                    null,
                    String(currentAddress),
                );

                if (nftMintedSentEventFilter) {

                    const logs = await provider?.getLogs({
                        ...nftMintedSentEventFilter,
                        fromBlock: 0,
                    });

                    const nftsMinted = logs?.map(
                        (log) => PbNFT?.instance?.interface?.parseLog(log)?.args
                    );

                    if (nftsMinted?.[nftsMinted.length - 1]) {
                        console.log(nftsMinted);
                        const nftMinted = nftsMinted?.[nftsMinted.length - 1];

                        setPbnCreatedId(nftMinted?.[2]);
                    }

                }


                resolve(true);

            } catch (e) {
                console.error(e);
                Router.push("/error");
                resolve(false);
            }
        });
    };


    const onSubmit = useCallback(submitHandler, [
        PbNFT,
        provider,
        currentAddress,
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
