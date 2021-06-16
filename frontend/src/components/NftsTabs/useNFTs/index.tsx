import { Provider, useContext, useEffect, useState } from 'react';
import { CurrentAddressContext, ProviderContext, SignerContext, PbNFTContext } from '../../../hardhat/SymfoniContext';
import { BigNumber, ethers } from 'ethers';

import { PbNFTModel } from '../../NFTs/NFT';


//@TODO: FIX MEMORY LEAKS!!!!!!!!!!!!

export function useNfts() {


    const [signer] = useContext(SignerContext);
    const [provider] = useContext(ProviderContext);
    const [currentAddress] = useContext(CurrentAddressContext);

    const PbNFT = useContext(PbNFTContext);

    const [nftsOwned, setNftsOwned] = useState<(PbNFTModel | undefined)>();
    // const [nftsSent, setNftsSent] = useState<(PbNFTModel | undefined)>();



    useEffect(() => {

        const fetch = async () => {


            // Grab owned ERC-721 balance from the current address
            
            const addressNftBalance = await PbNFT?.instance?.balanceOf(String(currentAddress)).then((value) => {

                console.log('address balance:', value);

                if (value) {
                    // balance more than 0?
                    return value.toNumber();
                }

            }).catch(error => {
                console.error(error);
            });



            // Current address has a balance of ERC-721 tokens, so we can load them up
            if (addressNftBalance) {
                // should be more than 0?

                // get each owned token id?
                // const ids:string[] = PbNFT?.instance?.tokenOfOwnerByIndex(String(currentAddress))
                const ides: string[] = [];
                // ides.length = addressNftBalance;
                // console.log('ideas', ides);
                
                for (let i = 0; i < addressNftBalance; i++) {
                    const id =  await PbNFT?.instance?.tokenOfOwnerByIndex(String(currentAddress), i)
                    // console.log('new nfts:', nfts);
                    ides.push(String(id?.toNumber()));
                }

                console.log('ides:', ides);

                let nfts =  await Promise.all(ides.map((id) => PbNFT?.instance?.tokenURI( id)));
                // console.log(nfts);


                // const safenfts = nfts;

                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (nfts as any) = ides.map((id, index) => ({ ...[nfts[index]?.toString()], id}));


                // here we'd want to resolve the ipfs data and populate the nfts[] with data
                // nfts
                console.log('nfts:' ,nfts);
                //@ts-ignore-next
                setNftsOwned(nfts);




                // console.log('new nfts:', nfts);
            }





        };

        fetch();


        
    }, [PbNFT?.instance, signer, provider, currentAddress]);


    return  {nftsOwned};
}