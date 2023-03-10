import { ContractTransaction, BigNumberish, Overrides } from "ethers";
import { Provider } from "@ethersproject/abstract-provider";
import { Signer } from "@ethersproject/abstract-signer";
import { ERC20OrderRouter, GelatoLimitOrders as GelatoLimitOrdersContract } from "../contracts/types";
import { Handler, ChainId, Order, TransactionData, TransactionDataWithSecret } from "../types";
export declare const isValidChainIdAndHandler: (chainId: ChainId, handler: Handler) => boolean;
export declare const isFlashbotsCompatibleChainId: (chainId: ChainId) => boolean;
export declare class GelatoLimitOrders {
    private _chainId;
    private _provider;
    private _signer;
    private _gelatoLimitOrders;
    private _erc20OrderRouter;
    private _moduleAddress;
    private _subgraphUrl;
    private _abiEncoder;
    private _handlerAddress?;
    private _handler?;
    private _isFlashbotsProtected;
    private _gelatoFeeBPS;
    private _slippageBPS;
    get gelatoFeeBPS(): number;
    get slippageBPS(): number;
    get chainId(): ChainId;
    get signer(): Signer | undefined;
    get provider(): Provider | undefined;
    get subgraphUrl(): string;
    set subgraphUrl(url: string);
    get handler(): Handler | undefined;
    get handlerAddress(): string | undefined;
    get moduleAddress(): string;
    get contract(): GelatoLimitOrdersContract;
    get erc20OrderRouter(): ERC20OrderRouter;
    get isFlashbotsProtected(): boolean;
    constructor(chainId: ChainId, signerOrProvider?: Signer | Provider, handler?: Handler, isFlashbotsProtected?: boolean, subgraphUrl?: string);
    encodeLimitOrderSubmission(inputToken: string, outputToken: string, inputAmount: BigNumberish, minReturn: BigNumberish, owner: string, checkAllowance?: boolean): Promise<TransactionData>;
    encodeLimitOrderSubmissionWithSecret(inputToken: string, outputToken: string, inputAmount: BigNumberish, minReturnToBeParsed: BigNumberish, owner: string, checkAllowance?: boolean): Promise<TransactionDataWithSecret>;
    submitLimitOrder(inputToken: string, outputToken: string, inputAmount: BigNumberish, minReturn: BigNumberish, checkAllowance?: boolean, overrides?: Overrides): Promise<ContractTransaction>;
    encodeLimitOrderCancellation(order: Order, checkIsActiveOrder?: boolean): Promise<TransactionData>;
    cancelLimitOrder(order: Order, checkIsActiveOrder?: boolean, overrides?: Overrides): Promise<ContractTransaction>;
    approveTokenAmount(inputToken: string, amount: BigNumberish, overrides?: Overrides): Promise<ContractTransaction>;
    isActiveOrder(order: Order): Promise<boolean>;
    getExchangeRate(inputValue: BigNumberish, inputDecimals: number, outputValue: BigNumberish, outputDecimals: number, invert?: boolean): string;
    getFeeAndSlippageAdjustedMinReturn(outputAmount: BigNumberish, extraSlippageBPS?: number): {
        minReturn: string;
        slippage: string;
        gelatoFee: string;
    };
    getAdjustedMinReturn(minReturn: BigNumberish, extraSlippageBPS?: number): string;
    getExecutionPrice(inputAmount: BigNumberish, inputDecimals: number, outputAmount: BigNumberish, outputDecimals: number, isInverted?: boolean): string;
    getOrder(orderId: string): Promise<Order | null>;
    getOrders(owner: string, includeOrdersWithNullHandler?: boolean): Promise<Order[]>;
    getOpenOrders(owner: string, includeOrdersWithNullHandler?: boolean): Promise<Order[]>;
    getPastOrders(owner: string, includeOrdersWithNullHandler?: boolean): Promise<Order[]>;
    getExecutedOrders(owner: string, includeOrdersWithNullHandler?: boolean): Promise<Order[]>;
    getCancelledOrders(owner: string, includeOrdersWithNullHandler?: boolean): Promise<Order[]>;
    private _getKey;
    private _encodeSubmitData;
}
