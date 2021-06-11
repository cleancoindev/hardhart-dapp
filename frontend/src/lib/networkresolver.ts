// Utility to resolve ethereum network names

import { useContext, useEffect, useState } from 'react';
import { CurrentAddressContext, ProviderContext } from '../hardhat/SymfoniContext';


export const networkResolver = () => {

    const [currentAddress] = useContext(CurrentAddressContext);
    const [provider] = useContext(ProviderContext);
    const [networkName, setNetworkname] = useState<string | undefined>(undefined);


    useEffect(() => {

        const fetch = async () => {


            if (provider) {
                // get the network name from ethers
                const networkName = await provider?.getNetwork().catch(err => {
                    console.log('error fetching network name:', err);
                });

                if (networkName) {
                    
                    if (networkName.chainId === 80001) {
                        // chainstack polygon testnet
                        setNetworkname('chainstack-polygon-testnet')
                    } else {
                        // should return normal string for network
                        setNetworkname(networkName.name);
                    }
                }
            }


        };

        fetch();


    }, [currentAddress, provider]);

    // Return formatted name
    return {
        networkName,
    };
};