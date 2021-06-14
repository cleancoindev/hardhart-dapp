// Utility to resolve account balances
import  { useEffect, useState  } from 'react';

import { Text, HStack } from '@chakra-ui/react';
import { useEthers, useNotifications, useTokenBalance } from '@usedapp/core';

import { utils, BigNumber } from 'ethers';
import { formatUnits } from '@ethersproject/units';


export const balanceResolver = (lookupAddress?: string) => {
    const { account, library } = useEthers();
    const { notifications } = useNotifications();

    const [balance, setBalance] = useState('');
    const [breadBalance, setBreadBalance] = useState('');


    useEffect(() => {


        async function getBalance() {

            const signer = library?.getSigner();
            const signerBalance = await signer?.getBalance();

            
            if (signerBalance?._isBigNumber){
                // update balance
                setBalance(utils.formatEther(signerBalance));
                



            } else {
                console.log('unable to update balance, signerbalance not valid?')
            }

        }

        


        if (library && account) {
            getBalance();
        }

    }, [library, account, notifications])

    return { balance };
}

