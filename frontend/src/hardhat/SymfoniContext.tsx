/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { providers, Signer, ethers } from "ethers";
import React, { useEffect, useState } from "react";
import Web3Modal, { IProviderOptions } from "web3modal";
import { BreadFarm } from "./typechain/BreadFarm";
import { BreadFarm__factory } from "./typechain/factories/BreadFarm__factory";
import { Bread } from "./typechain/Bread";
import { Bread__factory } from "./typechain/factories/Bread__factory";
import { PbNFT } from "./typechain/PbNFT";
import { PbNFT__factory } from "./typechain/factories/PbNFT__factory";
import { SampleBread } from "./typechain/SampleBread";
import { SampleBread__factory } from "./typechain/factories/SampleBread__factory";
import { PolyBread } from "./typechain/PolyBread";
import { PolyBread__factory } from "./typechain/factories/PolyBread__factory";
import { ERC20 } from "./typechain/ERC20";
import { ERC20__factory } from "./typechain/factories/ERC20__factory";
import { ERC721 } from "./typechain/ERC721";
import { ERC721__factory } from "./typechain/factories/ERC721__factory";
import WalletConnectProvider from "@walletconnect/web3-provider";

const emptyContract = {
    instance: undefined,
    factory: undefined
};
const defaultProvider: providers.Provider | undefined = undefined;
export const ProviderContext = React.createContext<[providers.Provider | undefined, React.Dispatch<React.SetStateAction<providers.Provider | undefined>>]>([defaultProvider, () => { }]);
const defaultCurrentAddress: string = "";
export const CurrentAddressContext = React.createContext<[string, React.Dispatch<React.SetStateAction<string>>]>([defaultCurrentAddress, () => { }]);
const defaultSigner: Signer | undefined = undefined;
export const SignerContext = React.createContext<[Signer | undefined, React.Dispatch<React.SetStateAction<Signer | undefined>>]>([defaultSigner, () => { }]);
const defaultSymfoniContext: SymfoniContextInterface = {
    currentHardhatProvider: "",
    init: () => { throw Error("Symfoni context not initialized") },
    loading: false,
    messages: [],
    providers: []
};
export const SymfoniContext = React.createContext<SymfoniContextInterface>(defaultSymfoniContext);
export const BreadFarmContext = React.createContext<SymfoniBreadFarm>(emptyContract);
export const BreadContext = React.createContext<SymfoniBread>(emptyContract);
export const PbNFTContext = React.createContext<SymfoniPbNFT>(emptyContract);
export const SampleBreadContext = React.createContext<SymfoniSampleBread>(emptyContract);
export const PolyBreadContext = React.createContext<SymfoniPolyBread>(emptyContract);
export const ERC20Context = React.createContext<SymfoniERC20>(emptyContract);
export const ERC721Context = React.createContext<SymfoniERC721>(emptyContract);

export interface SymfoniContextInterface {
    init: (provider?: string) => void;
    loading: boolean;
    messages: string[];
    currentHardhatProvider: string;
    providers: string[];
}

export interface SymfoniProps {
    autoInit?: boolean;
    showLoading?: boolean;
    loadingComponent?: React.ReactNode;
}

export interface SymfoniBreadFarm {
    instance?: BreadFarm;
    factory?: BreadFarm__factory;
}

export interface SymfoniBread {
    instance?: Bread;
    factory?: Bread__factory;
}

export interface SymfoniPbNFT {
    instance?: PbNFT;
    factory?: PbNFT__factory;
}

export interface SymfoniSampleBread {
    instance?: SampleBread;
    factory?: SampleBread__factory;
}

export interface SymfoniPolyBread {
    instance?: PolyBread;
    factory?: PolyBread__factory;
}

export interface SymfoniERC20 {
    instance?: ERC20;
    factory?: ERC20__factory;
}

export interface SymfoniERC721 {
    instance?: ERC721;
    factory?: ERC721__factory;
}

export const Symfoni: React.FC<SymfoniProps> = ({
    showLoading = true,
    autoInit = true,
    ...props
}) => {
    const [initializeCounter, setInitializeCounter] = useState(0);
    const [currentHardhatProvider, setCurrentHardhatProvider] = useState("");
    const [loading, setLoading] = useState(false);
    const [messages, setMessages] = useState<string[]>([]);
    const [signer, setSigner] = useState<Signer | undefined>(defaultSigner);
    const [provider, setProvider] = useState<providers.Provider | undefined>(defaultProvider);
    const [currentAddress, setCurrentAddress] = useState<string>(defaultCurrentAddress);
    const [fallbackProvider] = useState<string | undefined>(undefined);
    const [providerPriority, setProviderPriority] = useState<string[]>(["web3modal", "hardhat"]);
    const [BreadFarm, setBreadFarm] = useState<SymfoniBreadFarm>(emptyContract);
    const [Bread, setBread] = useState<SymfoniBread>(emptyContract);
    const [PbNFT, setPbNFT] = useState<SymfoniPbNFT>(emptyContract);
    const [SampleBread, setSampleBread] = useState<SymfoniSampleBread>(emptyContract);
    const [PolyBread, setPolyBread] = useState<SymfoniPolyBread>(emptyContract);
    const [ERC20, setERC20] = useState<SymfoniERC20>(emptyContract);
    const [ERC721, setERC721] = useState<SymfoniERC721>(emptyContract);
    useEffect(() => {
        if (messages.length > 0)
            console.debug(messages.pop())
    }, [messages])

    const getProvider = async (): Promise<{ provider: providers.Provider, hardhatProviderName: string } | undefined> => {
        let hardhatProviderName = "Not set";
        let _providerPriority = [...providerPriority];
        // Fallback provider
        if (fallbackProvider && autoInit && initializeCounter === 0) {
            if (localStorage.getItem("WEB3_CONNECT_CACHED_PROVIDER") === null) {
                _providerPriority = _providerPriority.sort((a, b) => {
                    return a === fallbackProvider ? -1 : b === fallbackProvider ? 1 : 0;
                })
            }
        }
        const provider = await _providerPriority.reduce(async (maybeProvider: Promise<providers.Provider | undefined>, providerIdentification) => {
            let foundProvider = await maybeProvider
            if (foundProvider) {
                return Promise.resolve(foundProvider)
            }
            else {
                switch (providerIdentification.toLowerCase()) {
                    case "web3modal":
                        try {
                            const provider = await getWeb3ModalProvider()
                            const web3provider = new ethers.providers.Web3Provider(provider);
                            hardhatProviderName = "web3modal";
                            return Promise.resolve(web3provider)
                        } catch (error) {
                            return Promise.resolve(undefined)
                        }
                    case "hardhat":
                        try {
                            const provider = new ethers.providers.JsonRpcProvider({
                                url: "http://127.0.0.1:8545",
                            });
                            hardhatProviderName = "hardhat";
                            return Promise.resolve(provider)
                        } catch (error) {
                            return Promise.resolve(undefined)
                        } default:
                        return Promise.resolve(undefined)
                }
            }
        }, Promise.resolve(undefined)) // end reduce
        return provider ? { provider, hardhatProviderName } : undefined
    };
    const getSigner = async (_provider: providers.Provider, hardhatProviderName: string): Promise<Signer | undefined> => {
        switch (hardhatProviderName) {
            case "web3modal":
                const web3provider = _provider as ethers.providers.Web3Provider
                return await web3provider.getSigner()
            case "hardhat":
                return ethers.Wallet.fromMnemonic("test test test test test test test test test test test junk").connect(_provider)
            default:
                return undefined
        }
    };
    const getWeb3ModalProvider = async (): Promise<any> => {
        const providerOptions: IProviderOptions = {
            walletconnect: {
                package: WalletConnectProvider,
                options: {
                    infuraId: "c229331f1d044c8f95e03f54b0ea2f26"
                }
            }
        };
        const web3Modal = new Web3Modal({
            // network: "mainnet",
            cacheProvider: false,
            providerOptions,
            theme: "dark", // required
        });
        return await web3Modal.connect();
    };

    useEffect(() => {
        let subscribed = true
        const doAsync = async () => {
            const finish = (text: string) => {
                setLoading(false)
                setMessages(old => [...old, text])
            }
            const finishWithContracts = (text: string) => {
                setBreadFarm(getBreadFarm(_provider, _signer))
                setBread(getBread(_provider, _signer))
                setPbNFT(getPbNFT(_provider, _signer))
                setSampleBread(getSampleBread(_provider, _signer))
                setPolyBread(getPolyBread(_provider, _signer))
                setERC20(getERC20(_provider, _signer))
                setERC721(getERC721(_provider, _signer))
                finish(text)
            }
            if (!autoInit && initializeCounter === 0) return finish("Auto init turned off.")
            setLoading(true)
            setMessages(old => [...old, "Initiating Symfoni React"])
            const providerObject = await getProvider() // getProvider can actually return undefined, see issue https://github.com/microsoft/TypeScript/issues/11094

            if (!subscribed || !providerObject) return finish("No provider or signer.")
            const _provider = providerObject.provider
            setProvider(_provider)
            setMessages(old => [...old, "Useing " + providerObject.hardhatProviderName])
            setCurrentHardhatProvider(providerObject.hardhatProviderName)
            const _signer = await getSigner(_provider, providerObject.hardhatProviderName);

            if (!subscribed || !_signer) return finishWithContracts("Provider, without signer.")
            setSigner(_signer)
            setMessages(old => [...old, "Useing signer"])
            const address = await _signer.getAddress()

            if (!subscribed || !address) return finishWithContracts("Provider and signer, without address.")
            setCurrentAddress(address)

            return finishWithContracts("Completed Symfoni context initialization.")
        };
        doAsync();
        return () => { subscribed = false }
    }, [initializeCounter])

    const getBreadFarm = (_provider: providers.Provider, _signer?: Signer) => {
        let instance = _signer ? BreadFarm__factory.connect(ethers.constants.AddressZero, _signer) : BreadFarm__factory.connect(ethers.constants.AddressZero, _provider)
        const contract: SymfoniBreadFarm = {
            instance: instance,
            factory: _signer ? new BreadFarm__factory(_signer) : undefined,
        }
        return contract
    }
        ;
    const getBread = (_provider: providers.Provider, _signer?: Signer) => {

        const contractAddress = "0x31e49e59EA13408f0f7a84783e5a47347f5B0aaB"
        const instance = _signer ? Bread__factory.connect(contractAddress, _signer) : Bread__factory.connect(contractAddress, _provider)
        const contract: SymfoniBread = {
            instance: instance,
            factory: _signer ? new Bread__factory(_signer) : undefined,
        }
        return contract
    }
        ;
    const getPbNFT = (_provider: providers.Provider, _signer?: Signer) => {

        const contractAddress = "0x02af926915Bb320faA4de876f29a418450de400c"
        const instance = _signer ? PbNFT__factory.connect(contractAddress, _signer) : PbNFT__factory.connect(contractAddress, _provider)
        const contract: SymfoniPbNFT = {
            instance: instance,
            factory: _signer ? new PbNFT__factory(_signer) : undefined,
        }
        return contract
    }
        ;
    const getSampleBread = (_provider: providers.Provider, _signer?: Signer) => {
        let instance = _signer ? SampleBread__factory.connect(ethers.constants.AddressZero, _signer) : SampleBread__factory.connect(ethers.constants.AddressZero, _provider)
        const contract: SymfoniSampleBread = {
            instance: instance,
            factory: _signer ? new SampleBread__factory(_signer) : undefined,
        }
        return contract
    }
        ;
    const getPolyBread = (_provider: providers.Provider, _signer?: Signer) => {

        const contractAddress = "0xc6287874391410C77E3fD73748C735f9381b8859"
        const instance = _signer ? PolyBread__factory.connect(contractAddress, _signer) : PolyBread__factory.connect(contractAddress, _provider)
        const contract: SymfoniPolyBread = {
            instance: instance,
            factory: _signer ? new PolyBread__factory(_signer) : undefined,
        }
        return contract
    }
        ;
    const getERC20 = (_provider: providers.Provider, _signer?: Signer) => {
        let instance = _signer ? ERC20__factory.connect(ethers.constants.AddressZero, _signer) : ERC20__factory.connect(ethers.constants.AddressZero, _provider)
        const contract: SymfoniERC20 = {
            instance: instance,
            factory: _signer ? new ERC20__factory(_signer) : undefined,
        }
        return contract
    }
        ;
    const getERC721 = (_provider: providers.Provider, _signer?: Signer) => {
        let instance = _signer ? ERC721__factory.connect(ethers.constants.AddressZero, _signer) : ERC721__factory.connect(ethers.constants.AddressZero, _provider)
        const contract: SymfoniERC721 = {
            instance: instance,
            factory: _signer ? new ERC721__factory(_signer) : undefined,
        }
        return contract
    }
        ;

    const handleInitProvider = (provider?: string) => {
        if (provider) {
            setProviderPriority(old => old.sort((a, b) => {
                return a === provider ? -1 : b === provider ? 1 : 0;
            }))
        }
        setInitializeCounter(initializeCounter + 1)
    }
    return (
        <SymfoniContext.Provider value={{ init: (provider) => handleInitProvider(provider), providers: providerPriority, currentHardhatProvider, loading, messages }}>
            <ProviderContext.Provider value={[provider, setProvider]}>
                <SignerContext.Provider value={[signer, setSigner]}>
                    <CurrentAddressContext.Provider value={[currentAddress, setCurrentAddress]}>
                        <BreadFarmContext.Provider value={BreadFarm}>
                            <BreadContext.Provider value={Bread}>
                                <PbNFTContext.Provider value={PbNFT}>
                                    <SampleBreadContext.Provider value={SampleBread}>
                                        <PolyBreadContext.Provider value={PolyBread}>
                                            <ERC20Context.Provider value={ERC20}>
                                                <ERC721Context.Provider value={ERC721}>
                                                    {showLoading && loading ?
                                                        props.loadingComponent
                                                            ? props.loadingComponent
                                                            : <div>
                                                                {messages.map((msg, i) => (
                                                                    <p key={i}>{msg}</p>
                                                                ))}
                                                            </div>
                                                        : props.children
                                                    }
                                                </ERC721Context.Provider >
                                            </ERC20Context.Provider >
                                        </PolyBreadContext.Provider >
                                    </SampleBreadContext.Provider >
                                </PbNFTContext.Provider >
                            </BreadContext.Provider >
                        </BreadFarmContext.Provider >
                    </CurrentAddressContext.Provider>
                </SignerContext.Provider>
            </ProviderContext.Provider>
        </SymfoniContext.Provider>
    )

};
