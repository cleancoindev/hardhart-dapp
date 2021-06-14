// Utility to resolve ethereum network names

import { useContext, useEffect, useState } from 'react';


import { useEthers, useNotifications,  } from '@usedapp/core';


export const networkResolver = () => {

    const { account, library } = useEthers();
    const { notifications } = useNotifications();



    const [networkName, setNetworkname] = useState<string | undefined>(undefined);


    useEffect(() => {

        const fetch = async () => {


            if (library) {
                // get the network name from ethers
                const networkName = await library?.getNetwork().catch(err => {
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


    }, [account, library]);

    // Return formatted name
    return {
        networkName,
    };
};