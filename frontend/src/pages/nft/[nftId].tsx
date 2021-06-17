import { BigNumber, ethers } from 'ethers';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useContext } from 'react';
import { ViewNft } from '../../components/ViewNft';
import { useRouter } from 'next/router'
import queryString from 'querystring';
import { PbNFTContext } from '../../hardhat/SymfoniContext';

import PbNFTDeployment from '../../hardhat/deployments/matic/PbNFT.json';





import { PbNFTModel } from '../../components/NFTs/NFT';

// import { PbNFT__factory } from '../../hardhat/typechain/factories/PbNFT__factory';


// const INFURA_ID = process.env.INFURA_ID;
// const INFURA_SECRET = process.env.INFURA_SECRET;


export default function NftPage({ uri, id }: { nft: string;  id: string }) {
    const router = useRouter();

    const pid = router.query;
    console.log('pid', pid);

    return <ViewNft  uri={pid.nftUri} id={pid.nftId}></ViewNft>;
}


// export const getStaticPaths: GetStaticPaths = async () => {

//     const PbNFT = useContext(PbNFTContext);

//     if (PbNFT.instance) {
//         const totalNFT = PbNFT.instance?.totalSupply();

//         const index = (await totalNFT).toNumber();


//         const ids = Array.from({length: index}, (_, i) => i + 1)

//         const paths = ids.map((id) => ({
//             params: { id: id},
//         }));

//         return { paths, fallback: 'blocking'};
//     } else {

//         // grab contract data
//         const nft = PbNFT.factory?.attach(PbNFTDeployment.address);
//         const index = await nft?.totalSupply();
        

//         const ids = Array.from({length: Number(index)}, (_, i) => i + 1)

//         const paths = ids.map((id) => ({
//             params: { id: id},
//         }));

//         return { paths, fallback: 'blocking'};


//     }
// }

// export const getStaticProps: GetStaticProps = async (context) => {
//     const router = useRouter();

//     const {pid} = router.query;
//     console.log('pid', pid);

//     return {
//         props: {
//             pid,
//         },
//     }


// }

// const NftPage = (pid) => {


//     return (<ViewNft pid={pid}></ViewNft>);
// }







// async function getInitialProps(context: NextPageContext) {
//     // MARK:  edit provider for mainnet

    

//     // // const provider = new ethers.providers.InfuraProvider("maticmum",   {projectId: INFURA_ID, projectSecret: INFURA_SECRET});
//     // const provider =   new ethers.providers.StaticJsonRpcProvider('https://rpc-mumbai.maticvigil.com/v1/ff85157c1d67dc7a9730cde6be694d74692ca9b8');
//     // console.log('infura provider', provider);


//     // const contractAddress = PbNFTDeployment.address;
//     // console.log('contract address', contractAddress);
//     // const instance = PbNFT__factory.connect(contractAddress, provider);


//     // const PbNFT: SymfoniPbNFT = {
//     //     instance: instance,
//     //     factory: undefined,
//     // };


//     // // should grab the instance from quering the tokenByIndex based on our passed Id.
//     // let nft = await PbNFT.instance?.tokenByIndex(nftId);

    
//     // if (nft) {
//     //     // maybe
//     //     nft = { ...nft, id: nftId } as any;

//     //     console.log('nft:', nft);


//     //     // Setup event filters to check if who owns this shit
//     //     const nftMintedEventFilter = PbNFT.instance?.filters?.NFTMinted(
//     //         null,
//     //         null,
//     //         BigNumber.from(nftId).toHexString(),
            
//     //     );

//     //     const transferEventFilter = await PbNFT?.instance?.filters?.Transfer(null, null, BigNumber.from(nftId).toHexString());

//     //     try {


//     //         const [nftMintedLog] = await provider?.getLogs({...nftMintedEventFilter, address: contractAddress });
//     //         const parsedNftMintedLog =  PbNFT?.instance?.interface?.parseLog(nftMintedLog)?.args;
    
    
//     //         const transferLogs = await provider?.getLogs({...transferEventFilter, address: contractAddress });
//     //         const parsedTransferLogs =  PbNFT?.instance?.interface?.parseLog(transferLogs[transferLogs.length - 1])?.args;


//     //         if (parsedNftMintedLog && parsedTransferLogs) {
                
//     //             const [createdBy] = parsedNftMintedLog;
//     //             const [, ownedBy] = parsedTransferLogs;
    
//     //             return {
//     //                 id: nftId,
//     //                 nft,
//     //                 createdBy: (await provider?.resolveName(createdBy)) || createdBy,
//     //                 ownedBy: (await provider?.resolveName(ownedBy)) || ownedBy,
//     //             };

//     //         } else if (parsedNftMintedLog && !parsedTransferLogs) {

//     //             console.log('no parse transfer found, elif condition hit');
    
//     //             const [createdBy] = parsedNftMintedLog;
    
//     //             return {
//     //                 id: nftId,
//     //                 nft,
//     //                 createdBy: (await provider?.resolveName(createdBy)) || createdBy,
//     //             };
//     //         } else if (parsedNftMintedLog) {


//     //             console.log('test');

//     //             const [ownedBy] = parsedNftMintedLog;
//     //             return {
//     //                 id: nftId,
//     //                 nft,
//     //                 ownedBy: (await provider?.resolveName(ownedBy)) || ownedBy,
//     //             }

//     //         }

//     //     } catch (e) {
//     //         console.error(e);
//     //     }




//     // }


//     return;
// }


// NftPage.getInitialProps = getInitialProps;


// export default NftPage;