export declare const ETH_ADDRESS = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";
export declare const SLIPPAGE_BPS = 40;
export declare const MAX_LIFETIME_IN_SECONDS = 7889238;
export declare const CHAIN_ID: {
    MAINNET: number;
    ROPSTEN: number;
    GOERLI: number;
    CRONOS: number;
    BSC: number;
    MATIC: number;
    FANTOM: number;
    AVAX: number;
};
export declare const BPS_GELATO_FEE: {
    [x: number]: number;
};
export declare const STOP_LIMIT_SLIPPAGE_BPS: {
    [x: number]: number;
};
export declare const LIMIT_ORDER_SLIPPAGE: {
    [x: number]: number;
};
export declare const HANDLERS_ADDRESSES: {
    [x: number]: {
        uniswap: string;
        uniswap_stoplimit: string;
        quickswap_stoplimit?: undefined;
        quickswap?: undefined;
        polydex?: undefined;
        cafeswap?: undefined;
        mmfinance?: undefined;
        spiritswap?: undefined;
        spookyswap?: undefined;
        bombswap?: undefined;
        defyswap?: undefined;
        tombswap?: undefined;
        skullswap?: undefined;
        protofi?: undefined;
        spiritswap_stoplimit?: undefined;
        spookyswap_stoplimit?: undefined;
        pancakeswap?: undefined;
        pancakeswap_stoplimit?: undefined;
        traderjoe?: undefined;
        pangolin?: undefined;
        pangolin_stoplimit?: undefined;
        traderjoe_stoplimit?: undefined;
        vvsfinance?: undefined;
    } | {
        uniswap: string;
        quickswap_stoplimit: string;
        uniswap_stoplimit?: undefined;
        quickswap?: undefined;
        polydex?: undefined;
        cafeswap?: undefined;
        mmfinance?: undefined;
        spiritswap?: undefined;
        spookyswap?: undefined;
        bombswap?: undefined;
        defyswap?: undefined;
        tombswap?: undefined;
        skullswap?: undefined;
        protofi?: undefined;
        spiritswap_stoplimit?: undefined;
        spookyswap_stoplimit?: undefined;
        pancakeswap?: undefined;
        pancakeswap_stoplimit?: undefined;
        traderjoe?: undefined;
        pangolin?: undefined;
        pangolin_stoplimit?: undefined;
        traderjoe_stoplimit?: undefined;
        vvsfinance?: undefined;
    } | {
        quickswap: string;
        polydex: string;
        cafeswap: string;
        mmfinance: string;
        quickswap_stoplimit: string;
        uniswap?: undefined;
        uniswap_stoplimit?: undefined;
        spiritswap?: undefined;
        spookyswap?: undefined;
        bombswap?: undefined;
        defyswap?: undefined;
        tombswap?: undefined;
        skullswap?: undefined;
        protofi?: undefined;
        spiritswap_stoplimit?: undefined;
        spookyswap_stoplimit?: undefined;
        pancakeswap?: undefined;
        pancakeswap_stoplimit?: undefined;
        traderjoe?: undefined;
        pangolin?: undefined;
        pangolin_stoplimit?: undefined;
        traderjoe_stoplimit?: undefined;
        vvsfinance?: undefined;
    } | {
        spiritswap: string;
        spookyswap: string;
        bombswap: string;
        defyswap: string;
        tombswap: string;
        skullswap: string;
        protofi: string;
        spiritswap_stoplimit: string;
        spookyswap_stoplimit: string;
        uniswap?: undefined;
        uniswap_stoplimit?: undefined;
        quickswap_stoplimit?: undefined;
        quickswap?: undefined;
        polydex?: undefined;
        cafeswap?: undefined;
        mmfinance?: undefined;
        pancakeswap?: undefined;
        pancakeswap_stoplimit?: undefined;
        traderjoe?: undefined;
        pangolin?: undefined;
        pangolin_stoplimit?: undefined;
        traderjoe_stoplimit?: undefined;
        vvsfinance?: undefined;
    } | {
        pancakeswap: string;
        pancakeswap_stoplimit: string;
        uniswap?: undefined;
        uniswap_stoplimit?: undefined;
        quickswap_stoplimit?: undefined;
        quickswap?: undefined;
        polydex?: undefined;
        cafeswap?: undefined;
        mmfinance?: undefined;
        spiritswap?: undefined;
        spookyswap?: undefined;
        bombswap?: undefined;
        defyswap?: undefined;
        tombswap?: undefined;
        skullswap?: undefined;
        protofi?: undefined;
        spiritswap_stoplimit?: undefined;
        spookyswap_stoplimit?: undefined;
        traderjoe?: undefined;
        pangolin?: undefined;
        pangolin_stoplimit?: undefined;
        traderjoe_stoplimit?: undefined;
        vvsfinance?: undefined;
    } | {
        traderjoe: string;
        pangolin: string;
        pangolin_stoplimit: string;
        traderjoe_stoplimit: string;
        uniswap?: undefined;
        uniswap_stoplimit?: undefined;
        quickswap_stoplimit?: undefined;
        quickswap?: undefined;
        polydex?: undefined;
        cafeswap?: undefined;
        mmfinance?: undefined;
        spiritswap?: undefined;
        spookyswap?: undefined;
        bombswap?: undefined;
        defyswap?: undefined;
        tombswap?: undefined;
        skullswap?: undefined;
        protofi?: undefined;
        spiritswap_stoplimit?: undefined;
        spookyswap_stoplimit?: undefined;
        pancakeswap?: undefined;
        pancakeswap_stoplimit?: undefined;
        vvsfinance?: undefined;
    } | {
        vvsfinance: string;
        mmfinance: string;
        uniswap?: undefined;
        uniswap_stoplimit?: undefined;
        quickswap_stoplimit?: undefined;
        quickswap?: undefined;
        polydex?: undefined;
        cafeswap?: undefined;
        spiritswap?: undefined;
        spookyswap?: undefined;
        bombswap?: undefined;
        defyswap?: undefined;
        tombswap?: undefined;
        skullswap?: undefined;
        protofi?: undefined;
        spiritswap_stoplimit?: undefined;
        spookyswap_stoplimit?: undefined;
        pancakeswap?: undefined;
        pancakeswap_stoplimit?: undefined;
        traderjoe?: undefined;
        pangolin?: undefined;
        pangolin_stoplimit?: undefined;
        traderjoe_stoplimit?: undefined;
    };
};
export declare const NETWORK_NAME: {
    [x: number]: string;
};
export declare const NETWORK_HANDLERS: {
    [x: number]: string[];
};
export declare const NETWORK_STOP_LIMIT_HANDLERS: {
    [x: number]: string[];
};
export declare const OLD_SUBGRAPH_URL: {
    [x: number]: string;
};
export declare const SUBGRAPH_URL: {
    [x: number]: string;
};
export declare const GELATO_LIMIT_ORDERS_ADDRESS: {
    [x: number]: string;
};
export declare const GELATO_LIMIT_ORDERS_MODULE_ADDRESS: {
    [x: number]: string;
};
export declare const GELATO_LIMIT_ORDERS_MODULE_FLASHBOTS_ADDRESS: {
    [x: number]: string;
};
export declare const GELATO_LIMIT_ORDERS_ERC20_ORDER_ROUTER: {
    [x: number]: string;
};
export declare const NATIVE_TOKEN_TICKER: {
    [x: number]: string;
};
export declare const NATIVE_WRAPPED_TOKEN_TICKER: {
    [x: number]: string;
};
export declare const NATIVE_TOKEN_NAME: {
    [x: number]: string;
};
export declare const NATIVE_WRAPPED_TOKEN_ADDRESS: {
    [x: number]: string;
};
export declare const GENERIC_GAS_LIMIT_ORDER_EXECUTION = "400000";
export declare const GELATO_STOP_LIMIT_ORDERS_MODULE_ADDRESS: {
    [x: number]: string;
};
