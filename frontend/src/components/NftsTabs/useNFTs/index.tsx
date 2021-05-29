import { useContext, useEffect, useState } from 'react';
import { CurrentAddressContext, ProviderContext, SignerContext, PbNFTContext } from '../../../hardhat/SymfoniContext';

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

            // not sure if these filters work
            const nftMintedSentEventFilter = PbNFT?.instance?.filters?.NFTMinted(String(currentAddress));
            // const nftMintedOwnedEventFilter = PbNFT?.instance?.filters?.NFTMinted(String(currentAddress));

            if (nftMintedSentEventFilter) {

                
                    const logs = await provider?.getLogs({ ...nftMintedSentEventFilter, fromBlock: 0 });
                    // logs?.forEach(log => console.log(log.transactionHash));
    
                    const nftsMinted = logs?.map((log) => PbNFT?.instance?.interface?.parseLog(log)?.args);
    
                    // check the printout here for where our id is
    
                    const ids:string[] = nftsMinted?.map((nft) => {
    
                        console.log('nft-loading:', nft);
                        const id = nft?.[1];
                        
                        console.log('id: ', id);
                        console.log('id to number: ', id.toNumber())
                        const idNumformat = id.toNumber()

                        return idNumformat;
    
                    }) ?? [''];
    
    
                    let nfts = await Promise.all(ids.map((id) => PbNFT?.instance?.breads(id)));

                    (nfts as any) = ids.map((id, index) => ({ ...nfts[index], id}));
                    console.log('nfts:' ,nfts);
                    setNftsOwned(nfts);
                  

            
                    // console.error(e);




            }


            // if (nftMintedOwnedEventFilter) {

            //     // same thing just in case?
            //     // todo: fix

            //     const logs = await provider?.getLogs({ ...nftMintedOwnedEventFilter, fromBlock: 0, toBlock: 'latest' });
            //     // logs?.forEach(log => console.log(log.transactionHash));

            //     const nftsMinted = logs?.map((log) => PbNFT?.instance?.interface?.parseLog(log)?.args);

            //     const ids: string[] = nftsMinted?.map((nft) => {

            //         const id = nft?.[2];
            //         console.log('id', id);
            //         return id;
                    

            //     });


            //     let nfts = await Promise.all(ids.map((id) => PbNFT?.instance?.breads(id)));
            //     (nfts as any) = ids.map((id, index) => ({ ...nfts[index], id }));
                
            //     setNftsOwned(nfts);



            // }
        };

        fetch();


        
    }, [PbNFT?.instance, signer, provider, currentAddress]);


    return  {nftsOwned};
}