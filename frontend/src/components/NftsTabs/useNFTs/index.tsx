import { Provider, useContext, useEffect, useState } from 'react';
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


    // async function loggy(eventFilter: any, provider: any, ){

    //     try {
    //         const logs = await provider?.getLogs({...eventFilter, fromBlock: 0, toBlock: 'latest'})
    //         // logs?.forEach(log => console.log(log.data));

    //         return logs;

    //     } catch (e){
    //         console.error('error generating RPC logs:', e);
    //     }
    // }

    // make helper functions here

    useEffect(() => {

        const fetch = async () => {


            // not sure if these filters work
            const nftMintedSentEventFilter = PbNFT?.instance?.filters?.NFTMinted(String(currentAddress));
            // const nftMintedOwnedEventFilter = PbNFT?.instance?.filters?.NFTMinted(String(currentAddress));

            if (nftMintedSentEventFilter) {
                    // console.log('current address: ', String(currentAddress));
                    // console.log('nFT MINTED EVENT FILTER: ', nftMintedSentEventFilter);

                
                    const logs = await provider?.getLogs({ ...nftMintedSentEventFilter, fromBlock: 0 });
                    logs?.forEach(log => console.log(log.data));

                    // const logs = await loggy(nftMintedSentEventFilter, provider);
                    
                    const nftsMinted =  logs?.map((log: { topics: string[]; data: string; }) => PbNFT?.instance?.interface?.parseLog(log)?.args);
    

                    console.log('nftsminted:',   nftsMinted);
                    // check the printout here for where our id is
    
                    const ids:string[] = nftsMinted?.map((nft) => {
    
                        console.log('nft-loading:', nft);
                        const id = nft?.[1];
                        
                        // console.log('id: ', id);
                        const idNumformat = id.toNumber();
                        // console.log('id to number: ', idNumformat);

                        return idNumformat;
    
                    }) ?? [''];

                    console.log('ids', ids);
    
    
                    let nfts = await Promise.all(ids.map((id) => PbNFT?.instance?.tokenOfOwnerByIndex(String(currentAddress), id)));

                    (nfts as any) = ids.map((id, index) => ({ ...nfts[index], id}));
                    console.log('nfts:' ,nfts);
                    setNftsOwned(nfts);

                    // update loading state



            }



        };

        fetch();


        
    }, [PbNFT?.instance, signer, provider, currentAddress]);


    return  {nftsOwned};
}