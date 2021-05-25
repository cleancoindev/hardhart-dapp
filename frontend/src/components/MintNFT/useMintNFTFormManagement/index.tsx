import { useCallback, useContext, useState } from 'react';

import { CurrentAddressContext, ProviderContext, PbNFTContext } from '../../../hardhat/SymfoniContext';
import { PbNFT } from '../../../hardhat/typechain/PbNFT';
import { BigNumber, ethers, } from 'ethers';

import { useRouter } from 'next/router';
import { resolve } from 'url';


export function useMintNFTFormManagement() {

    const [currentAddress] = useContext(CurrentAddressContext);
    const [provider] = useContext(ProviderContext);
    const [PbNFT] = useContext(PbNFTContext);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [pbnCreatedId, setPbnCreatedId] = useState("");

    const Router = useRouter();


    const submitHandler = async (params: Parameters<PbNFT["mint"]>) => {
        // debug
        console.log(params);

        return new Promise(async (resolve) => {
            // Need to convert ether to gwei here for transaction
            console.log(params[2]);

            // params[2] = ethers.utils.parseUnits(
            //     params[2].toString(),
            //     erc20TokensData.find(
            //         (token) => token.address.toLowerCase() === params[1].toLowerCase()
            //     )?.decimals
            // );

            // console.log(params[2]);

            // // Resolve ENS for recipient and _token
  

            try {

                const gasLimit = await PbNFT?.instance?.estimateGas.mint.apply(
                    null,
                    params as any 
                );

                const tx = PbNFT?.instance?.mint.apply(
                    null,
                    params.concat({ gasLimit: gasLimit?.add("80000") }) as any
                );

                const createNftTx = await tx;
                await createNftTx?.wait();
                setHasSubmitted(true);

                const nftMintedSentEventFilter = PbNFT?.instance?.filters?.NFTMinted(
                    String(currentAddress),
                    null,
                    null,
                    null
                );

                if (nftMintedSentEventFilter) {
                    const logs = await provider?.getLogs({
                        ...nftMintedSentEventFilter,
                        fromBlock: 0,
                    });

                    const nftsMinted = logs.map(
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
        "",
    ];
    return {
        onSubmit,
        initialValues,
        hasSubmitted,
        pbnCreatedId,
    };
}
