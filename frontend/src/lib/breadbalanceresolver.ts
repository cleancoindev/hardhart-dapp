

// utility to resolve account balance


import { useContext, useEffect, useState } from 'react';
import { CurrentAddressContext, ProviderContext, BreadContext } from '../hardhat/SymfoniContext';
import { utils, BigNumber } from 'ethers';


export const breadBalanceResolver = (lookupAddress?: string) => {

    const [currentAddress] = useContext(CurrentAddressContext);
    const Bread = useContext(BreadContext);
    const [provider] = useContext(ProviderContext);
    const [breadBalance, setBalance] = useState<string | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(true);

    // Resolve ENS name
    // TODO: kinda shit 
    useEffect(() => {

        const fetch = async () => {
            // update load status
            setLoading(loading);            

            if (!Bread?.instance) {
                const breadBalance = "0";
                setBalance(breadBalance);
            }

            if (lookupAddress) {
                

                const breadBalance = await Bread?.instance?.balanceOf(lookupAddress).catch(err => {
                    console.error('error fetching BREAD balance for lookupAddress', err);
                })
          

                if (breadBalance?._isBigNumber) {
                    setBalance(utils.formatEther(breadBalance));
                    console.log('update loading')

                    setLoading(false);
                } else {
                    console.log('unable to update balance',)
                }


            }  else if (currentAddress) {


                const breadBalance = await Bread?.instance?.balanceOf(currentAddress).catch(err => {
                    console.error('error fetching BREAD balance for currentAddress', err);
                });
    

                if (breadBalance?._isBigNumber) {
                    setBalance(utils.formatEther(breadBalance));
                    setLoading(false);
                } else {
                    console.log('unable to update balance for currentAddress')
                }
            }

        };
        
        fetch();


    }, [currentAddress, provider, lookupAddress]);

    // Return formatted name
    return {
        breadBalance,
        loading,
    };
};