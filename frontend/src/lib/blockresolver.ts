

// utility to resolve account balance


import { useContext, useEffect, useState } from 'react';
import {  ProviderContext } from '../hardhat/SymfoniContext';
import { utils, BigNumber } from 'ethers';


export const blockResolver = (lookupAddress?: string) => {

    const [provider] = useContext(ProviderContext);
    const [blockNumber, setBlockNumber] = useState<string | undefined>(undefined);

    // Resolve ENS name
    // TODO: kinda shit 
    useEffect(() => {

        const fetch = async () => {


            if (provider) {
                
                const blockNumber = await provider?.getBlockNumber().catch((err: any) => {
                    console.error('error fetching getBlockNumber', err);
                });
                

                if (blockNumber) {
                    setBlockNumber(String(blockNumber));
                } else {
                    console.log('unable to update blocknumber',)
                }
            }



        };

        fetch();


    }, [provider, lookupAddress]);

    // Return formatted name
    return {
        blockNumber,
    };
};