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



            const addressNftBalance = await PbNFT?.instance?.balanceOf(String(currentAddress)).then((value) => {

                console.log('address balance:', value);

                if (value) {
                    // balance more than 0?
                    return value.toNumber();
                }

            }).catch(error => {
                console.error(error);
            });


            if (addressNftBalance) {
                // should be more than 0?

                // get each owned token id?
                // const ids:string[] = PbNFT?.instance?.tokenOfOwnerByIndex(String(currentAddress))
                let ides: string[] = [];
                // ides.length = addressNftBalance;
                // console.log('ideas', ides);
                
                for (var i = 0; i < addressNftBalance; i++) {
                    const id =  await PbNFT?.instance?.tokenOfOwnerByIndex(String(currentAddress), i)
                    // console.log('new nfts:', nfts);
                    ides.push(id?.toNumber());
                }

                console.log('ides:', ides);

                let nfts =  await Promise.all(ides.map((id) => PbNFT?.instance?.tokenURI( id)));
                // console.log(nfts);




                (nfts as any) = ides.map((id, index) => ({ ...[nfts[index].toString()], id}));


                // here we'd want to resolve the ipfs data and populate the nfts[] with data
                nfts
                console.log('nfts:' ,nfts);
                setNftsOwned(nfts);




                // console.log('new nfts:', nfts);
            }


            // const ownedEventFilter = PbNFT?.instance?.filters?.NFTMinted(null, String(currentAddress), null);
            // if (ownedEventFilter) {
                
            //     const logs = await provider?.getLogs({...ownedEventFilter, fromBlock: 0});

            //     const nftsMinted = logs?.map((log) => PbNFT?.instance?.interface?.parseLog(log)?.args);

            //     const ids: string[] = nftsMinted?.map((nft) => {
            //         console.log(nft);

            //         const id = nft?.[1];

            //         return id;
            //     });


            //     let finalNfts = await Promise.all(ids.map((id) => PbNFT?.instance?.tokenURI(id)));


            //     // generate object from resolved NFT data here?
            //     console.log('final nfts:', finalNfts);

            //     (finalNfts as any) = ids.map((id, index) => ({ ...finalNfts[index], id}));
            //     setNftsOwned(finalNfts);
            // }


            
            // // not sure if these filters work
            // const nftMintedSentEventFilter = PbNFT?.instance?.filters?.NFTMinted(String(currentAddress));

            // if (nftMintedSentEventFilter) {


                
            //         const logs = await provider?.getLogs({ ...nftMintedSentEventFilter, fromBlock: 0 });
            //         logs?.forEach(log => console.log(log.data));

            //         // const logs = await loggy(nftMintedSentEventFilter, provider);
                    
            //         const nftsMinted =  logs?.map((log: { topics: string[]; data: string; }) => PbNFT?.instance?.interface?.parseLog(log)?.args);
    

            //         console.log('nftsminted:',   nftsMinted);
            //         // check the printout here for where our id is
    
            //         const ids:string[] = nftsMinted?.map((nft) => {
    
            //             console.log('nft-loading:', nft);
            //             const id = nft?.[1];
                        
            //             // console.log('id: ', id);
            //             const idNumformat = id.toNumber();
            //             // console.log('id to number: ', idNumformat);

            //             return idNumformat;
    
            //         }) ?? [''];

            //         console.log('ids', ids);
    
    
            //         let nfts = await Promise.all(ids.map((id) => PbNFT?.instance?.tokenOfOwnerByIndex(String(currentAddress), id)));

            //         (nfts as any) = ids.map((id, index) => ({ ...nfts[index], id}));
            //         console.log('nfts:' ,nfts);
            //         setNftsOwned(nfts);

            //         // update loading state



            // }



        };

        fetch();


        
    }, [PbNFT?.instance, signer, provider, currentAddress]);


    return  {nftsOwned};
}