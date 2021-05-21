// Utility to resolve ethereum names

import { useContext, useEffect, useState } from 'react';
import { CurrentAddressContext, ProviderContext } from '../hardhat/SymfoniContext';
import { formatAddress } from './formataddress';


export const nameResolver = (lookupAddress?: string, format: boolean = false) => {

    const [currentAddress] = useContext(CurrentAddressContext);
    const [provider] = useContext(ProviderContext);
    const [ensName, setEnsName] = useState<string | undefined>(undefined);

    // Resolve ENS name
    // TODO: kinda shit 
    useEffect(() => {
        const fetch = async () => {

            if (lookupAddress) {
                const ensName = await provider?.lookupAddress(lookupAddress);

                if (ensName) {
                    setEnsName(ensName);
                } else {
                    setEnsName(format ? formatAddress(lookupAddress) : lookupAddress);
                }

            }  else if (currentAddress) {
                const ensName = await provider?.lookupAddress(currentAddress);

                if (ensName) {
                    setEnsName(ensName);
                } else {
                    const formattedAdddress = formatAddress(currentAddress);
                    setEnsName(formattedAdddress);
                }
            }

        };

        fetch();


    }, [currentAddress, provider, lookupAddress]);

    // Return formatted name
    return {
        ensName,
    };
};