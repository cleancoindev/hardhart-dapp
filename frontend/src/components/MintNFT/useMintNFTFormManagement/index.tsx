import { useCallback, useContext, useState } from 'react';

import { CurrentAddressContext, ProviderContext, PbNFTContext, SignerContext } from '../../../hardhat/SymfoniContext';
import { PbNFT } from '../../../hardhat/typechain/PbNFT';
import { BigNumber, ethers, } from 'ethers';

import { useRouter } from 'next/router';
import { resolve } from 'url';
import { PbNFTContractAddress } from '..';


export function useMintNFTFormManagement() {

    const [currentAddress] = useContext(CurrentAddressContext);
    const [provider] = useContext(ProviderContext);
    const [signer] = useContext(SignerContext);
    const  PbNFT = useContext(PbNFTContext);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [pbnCreatedId, setPbnCreatedId] = useState("");

    const Router = useRouter();

    const TESTNET_DEPLOYED_ADDRESS = '0xFceA5c282084B15950F9e7bC66ABA82E29965787';


    const submitHandler = async (params: Parameters<PbNFT["mint"]>) => {
        // debug
        console.log('hit hit hit');
        console.log(params);

        // console.log('pbnft deployed at:', await PbNFT?.instance?._deployed())

        // PbNFT?.instance?.connect(TESTNET_DEPLOYED_ADDRESS, provider);


        console.log('PBNFT: ', PbNFT);
        return new Promise(async (resolve) => {
            // Need to convert ether to gwei here for transaction
            console.log('params2:', params[2]);

        
            // params[2] = ethers.utils.parseUnits(
            //     params[2].toString(),
            //     erc20TokensData.find(
            //         (token) => token.address.toLowerCase() === params[1].toLowerCase()
            //     )?.decimals
            // );

            // console.log(params[2]);

            // // Resolve ENS for recipient and _token
  

            try {

                // const gasLimit = await PbNFT?.instance?.estimateGas.mint.apply(
                //     null,
                //     params as any 
                // );

                // const tx = await ethers.co

                // const connect = await PbNFT?.factory?.connect(PbNFTContractAddress, provider);
                
                // TESTING REMOVE FOR MAINNET
            
                // const connect = PbNFT?.instance?.connect(provider);
                
                const gasLimit = await PbNFT?.instance?.estimateGas.mint(String(currentAddress), params[0], params[1], params[2])
                

                const tx = await PbNFT?.instance?.mint(String(currentAddress), params[0], params[1], params[2], {gasLimit: gasLimit?.add("80000")} );
                console.log('transaction:', tx);
                await tx?.wait();

                // console.log('newly mined result: ', await PbNFT.instance?.tokenURI())
                // const tx = PbNFT?.instance?.mint.apply(
                //     currentAddress,
                //     params[0],
                //     params[1],
                //     params[2]
                // );

           
                setHasSubmitted(true);

                const nftMintedSentEventFilter = PbNFT?.instance?.filters?.NFTMinted(
                    String(currentAddress),
                    null,
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
