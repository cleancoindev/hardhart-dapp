

// utility to resolve account balance


import { useContext, useEffect, useState } from 'react';
import { CurrentAddressContext, ProviderContext } from '../hardhat/SymfoniContext';
import { utils, BigNumber } from 'ethers';


export const balanceResolver = (lookupAddress?: string) => {

    const [currentAddress] = useContext(CurrentAddressContext);
    const [provider] = useContext(ProviderContext);
    const [balance, setBalance] = useState<string | undefined>(undefined);

    // Resolve ENS name
    // TODO: kinda shit 
    useEffect(() => {

        const fetch = async () => {


            if (lookupAddress) {
                
                const balance = await provider?.getBalance(lookupAddress).catch(err => {
                    console.error('error fetching getBalance for lookupAddress', err);
                });
          

                if (balance?._isBigNumber) {
                    setBalance(utils.formatEther(balance));
                } else {
                    console.log('unable to update balance',)
                }


            }  else if (currentAddress) {


                const balance = await provider?.getBalance(currentAddress).catch(err => {
                    console.error('error fetching getBalance for currentAddress', err);
                });
    
                // const ensName = await provider?.lookupAddress(currentAddress);

                if (balance?._isBigNumber) {
                    setBalance(utils.formatEther(balance));
                } else {
                    console.log('unable to update balance for currentAddress')
                }
            }

        };

        fetch();


    }, [currentAddress, provider, lookupAddress]);

    // Return formatted name
    return {
        balance,
    };
};