import { ContractTransaction, BigNumberish, Overrides } from "ethers";
import { Provider } from "@ethersproject/abstract-provider";
import { Signer } from "@ethersproject/abstract-signer";
import { ERC20OrderRouter, GelatoLimitOrders as GelatoBaseContract } from "../contracts/types";
import { Handler, ChainId, StopLimitOrder, TransactionData } from "../types";
export declare const isValidChainIdAndHandler: (chainId: ChainId, handler: Handler) => boolean;
export declare const isFlashbotsCompatibleChainId: (chainId: ChainId) => boolean;
export declare const isETHOrWETH: (tokenAddress: string, chainID: ChainId) => boolean;
export declare class GelatoBase {
    private _chainId;
    private _provider;
    private _signer;
    private _gelatoCore;
    private _erc20OrderRouter;
    private _moduleAddress;
    private _subgraphUrl;
    private _abiEncoder;
    private _handlerAddress?;
    private _handler?;
    private _gelatoFeeBPS;
    private _slippageBPS;
    get gelatoFeeBPS(): number;
    get slippageBPS(): number;
    get chainId(): ChainId;
    get signer(): Signer | undefined;
    get provider(): Provider | undefined;
    get subgraphUrl(): string;
    get handler(): Handler | undefined;
    get handlerAddress(): string | undefined;
    get moduleAddress(): string;
    get contract(): GelatoBaseContract;
    get erc20OrderRouter(): ERC20OrderRouter;
    get abiEncoder(): any;
    constructor(chainId: ChainId, moduleAddress: string, signerOrProvider?: Signer | Provider, handler?: Handler, handlerAddress?: string);
    encodeLimitOrderCancellation(order: StopLimitOrder, checkIsActiveOrder?: boolean): Promise<TransactionData>;
    cancelStopLimitOrder(order: StopLimitOrder, checkIsActiveOrder?: boolean, overrides?: Overrides): Promise<ContractTransaction>;
    approveTokenAmount(inputToken: string, amount: BigNumberish, overrides?: Overrides): Promise<ContractTransaction>;
    isActiveOrder(order: StopLimitOrder): Promise<boolean>;
    getExchangeRate(inputValue: BigNumberish, inputDecimals: number, outputValue: BigNumberish, outputDecimals: number, invert?: boolean): string;
    getFeeAndSlippageAdjustedMinReturn(outputAmount: BigNumberish, extraSlippageBPS?: number): {
        minReturn: string;
        slippage: string;
        gelatoFee: string;
    };
    getAdjustedMinReturn(minReturn: BigNumberish, extraSlippageBPS?: number): string;
    getExecutionPrice(inputAmount: BigNumberish, inputDecimals: number, outputAmount: BigNumberish, outputDecimals: number, isInverted?: boolean): string;
    protected _getKey(order: StopLimitOrder): string;
    protected _encodeSubmitData(inputToken: string, outputToken: string, owner: string, witness: string, amount: BigNumberish, maxReturn: BigNumberish, minReturn: BigNumberish, secret: string, checkAllowance: boolean): Promise<TransactionData>;
}