"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GELATO_STOP_LIMIT_ORDERS_MODULE_ADDRESS = exports.GENERIC_GAS_LIMIT_ORDER_EXECUTION = exports.NATIVE_WRAPPED_TOKEN_ADDRESS = exports.NATIVE_TOKEN_NAME = exports.NATIVE_WRAPPED_TOKEN_TICKER = exports.NATIVE_TOKEN_TICKER = exports.GELATO_LIMIT_ORDERS_ERC20_ORDER_ROUTER = exports.GELATO_LIMIT_ORDERS_MODULE_FLASHBOTS_ADDRESS = exports.GELATO_LIMIT_ORDERS_MODULE_ADDRESS = exports.GELATO_LIMIT_ORDERS_ADDRESS = exports.SUBGRAPH_URL = exports.OLD_SUBGRAPH_URL = exports.NETWORK_STOP_LIMIT_HANDLERS = exports.NETWORK_HANDLERS = exports.NETWORK_NAME = exports.HANDLERS_ADDRESSES = exports.LIMIT_ORDER_SLIPPAGE = exports.STOP_LIMIT_SLIPPAGE_BPS = exports.BPS_GELATO_FEE = exports.CHAIN_ID = exports.MAX_LIFETIME_IN_SECONDS = exports.SLIPPAGE_BPS = exports.ETH_ADDRESS = void 0;
exports.ETH_ADDRESS = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";
exports.SLIPPAGE_BPS = 40; // 0.4%
exports.MAX_LIFETIME_IN_SECONDS = 7889238; // 3 months in seconds
exports.CHAIN_ID = {
    MAINNET: 1,
    ROPSTEN: 3,
    GOERLI: 5,
    CRONOS: 25,
    BSC: 56,
    MATIC: 137,
    FANTOM: 250,
    AVAX: 43114,
};
exports.BPS_GELATO_FEE = {
    [exports.CHAIN_ID.MAINNET]: 10,
    [exports.CHAIN_ID.MATIC]: 10,
    [exports.CHAIN_ID.FANTOM]: 10,
    [exports.CHAIN_ID.BSC]: 10,
    [exports.CHAIN_ID.AVAX]: 10,
    [exports.CHAIN_ID.CRONOS]: 10,
};
exports.STOP_LIMIT_SLIPPAGE_BPS = {
    [exports.CHAIN_ID.MAINNET]: 500,
    [exports.CHAIN_ID.ROPSTEN]: 500,
    [exports.CHAIN_ID.MATIC]: 500,
    [exports.CHAIN_ID.FANTOM]: 500,
    [exports.CHAIN_ID.BSC]: 500,
    [exports.CHAIN_ID.AVAX]: 500,
    [exports.CHAIN_ID.CRONOS]: 500,
};
exports.LIMIT_ORDER_SLIPPAGE = {
    [exports.CHAIN_ID.MAINNET]: 40,
    [exports.CHAIN_ID.ROPSTEN]: 40,
    [exports.CHAIN_ID.MATIC]: 40,
    [exports.CHAIN_ID.FANTOM]: 40,
    [exports.CHAIN_ID.BSC]: 40,
    [exports.CHAIN_ID.AVAX]: 40,
    [exports.CHAIN_ID.CRONOS]: 40,
};
exports.HANDLERS_ADDRESSES = {
    // UniswapV2Router02Handler
    [exports.CHAIN_ID.MAINNET]: {
        ["uniswap"]: "0x837c03414fb86861f28ca7e91e5fd770fda0f52d",
        ["uniswap_stoplimit"]: "0xf437a1a98566872f734bd18addf4bb610d1f887b",
    },
    // UniswapV2Router02Handler
    [exports.CHAIN_ID.ROPSTEN]: {
        ["uniswap"]: "0x1f397f95d31eb20183b69d685a5060cfdefd508b",
        ["quickswap_stoplimit"]: "0x87bE4Eb9dFb2DefcEA035D3010f33584Fc8ddDB5",
    },
    // UniswapV2Router02Handler
    [exports.CHAIN_ID.MATIC]: {
        ["quickswap"]: "0xaccbd2c6ad75ad3394dc5f4b1f606bf111e4eae3",
        ["polydex"]: "0x00fc86d360162e4672ec6B427E12ed36F39f1f53",
        ["cafeswap"]: "0xd167afcee4e9a89e69646fd3c27e58b61d1b7f97",
        ["mmfinance"]: "0xfbc6b53fa3792a95f37ac8d66e5110f41da0d976",
        ["quickswap_stoplimit"]: "0x51cc226648f8de65513de7cdfd3e7b116156234e",
    },
    // UniswapV2Router02Handler
    [exports.CHAIN_ID.FANTOM]: {
        ["spiritswap"]: "0x5fb00386558ccc219e51b69d8e963ef20b0c267a",
        ["spookyswap"]: "0x228ffd7122d202c0cd24330892881c47b0817c7a",
        ["bombswap"]: "0x87C4Fbd67f6DD8a1B5EFD9879956c728C97afeFe",
        ["defyswap"]: "0x3d401587320522a5e0bb973d10a852430a8edbbd",
        ["tombswap"]: "0xc72ef1bae14d0be7ec28c149e5e24659115f7c90",
        ["skullswap"]: "0xe7426fb4bdf06c5a4680b047eb9ca4fa3b513e25",
        ["protofi"]: "0xfd2c20e265c130dc01d5cacc3012d3205e49c8b5",
        ["spiritswap_stoplimit"]: "0x6ea82c72732389c5149326e048a46be9f8bec8e8",
        ["spookyswap_stoplimit"]: "0xe912cd26c4a4cfffc175a297f1328ab23313a1a7",
    },
    // UniswapV2Router02Handler
    [exports.CHAIN_ID.BSC]: {
        ["pancakeswap"]: "0x88f8CCC064bA2D39cF08D57B6e7504a7B6bE8E4e",
        ["pancakeswap_stoplimit"]: "0x84b826bcd26f1bc0cd5fbbdef7f5b8965d6bbb38",
    },
    // UniswapV2Router02Handler
    [exports.CHAIN_ID.AVAX]: {
        ["traderjoe"]: "0x88f8CCC064bA2D39cF08D57B6e7504a7B6bE8E4e",
        ["pangolin"]: "0x8b206547cfe6f35a77ddab2d6d97260765a349ef",
        ["pangolin_stoplimit"]: "0xb4c53e2e32caf977d61a8a776bdc44837a5d0d91",
        ["traderjoe_stoplimit"]: "0xcf497830e43836738bdd0c3d7e09b599ddf081b2",
    },
    [exports.CHAIN_ID.CRONOS]: {
        ["vvsfinance"]: "0x6b9da2978ebe1c60d2cdaf52ee6c498cd8bb3f16",
        ["mmfinance"]: "0xee5154b3408e762d935f79ddef3a4ba56ac4d102",
    },
};
exports.NETWORK_NAME = {
    [exports.CHAIN_ID.MAINNET]: "Ethereum",
    [exports.CHAIN_ID.ROPSTEN]: "Ropsten",
    [exports.CHAIN_ID.GOERLI]: "Goerli",
    [exports.CHAIN_ID.MATIC]: "Polygon (Matic)",
    [exports.CHAIN_ID.FANTOM]: "FANTOM",
    [exports.CHAIN_ID.BSC]: "BSC",
    [exports.CHAIN_ID.AVAX]: "AVAX",
    [exports.CHAIN_ID.CRONOS]: "Cronos",
};
exports.NETWORK_HANDLERS = {
    [exports.CHAIN_ID.MAINNET]: ["uniswap", "uniswap_stoplimit"],
    [exports.CHAIN_ID.ROPSTEN]: ["uniswap", "quickswap_stoplimit"],
    [exports.CHAIN_ID.MATIC]: [
        "quickswap",
        "polydex",
        "cafeswap",
        "mmfinance",
        "quickswap_stoplimit",
    ],
    [exports.CHAIN_ID.FANTOM]: [
        "spiritswap",
        "spookyswap",
        "bombswap",
        "defyswap",
        "tombswap",
        "skullswap",
        "protofi",
        "spiritswap_stoplimit",
        "spookyswap_stoplimit",
    ],
    [exports.CHAIN_ID.BSC]: ["pancakeswap", "pancakeswap_stoplimit"],
    [exports.CHAIN_ID.AVAX]: [
        "traderjoe",
        "pangolin",
        "pangolin_stoplimit",
        "traderjoe_stoplimit",
    ],
    [exports.CHAIN_ID.CRONOS]: ["vvsfinance", "mmfinance"],
};
exports.NETWORK_STOP_LIMIT_HANDLERS = {
    [exports.CHAIN_ID.MAINNET]: ["uniswap_stoplimit"],
    [exports.CHAIN_ID.ROPSTEN]: ["quickswap_stoplimit"],
    [exports.CHAIN_ID.MATIC]: ["quickswap_stoplimit"],
    [exports.CHAIN_ID.BSC]: ["pancakeswap_stoplimit"],
    [exports.CHAIN_ID.FANTOM]: ["spookyswap_stoplimit", "spiritswap_stoplimit"],
    [exports.CHAIN_ID.AVAX]: ["traderjoe_stoplimit", "pangolin_stoplimit"],
};
exports.OLD_SUBGRAPH_URL = {
    [exports.CHAIN_ID.MAINNET]: "https://api.thegraph.com/subgraphs/name/gelatodigital/limit-orders",
    [exports.CHAIN_ID.ROPSTEN]: "https://api.thegraph.com/subgraphs/name/gelatodigital/limit-orders-ropsten",
    [exports.CHAIN_ID.MATIC]: "https://api.thegraph.com/subgraphs/name/gelatodigital/limit-orders-polygon",
    [exports.CHAIN_ID.FANTOM]: "https://api.thegraph.com/subgraphs/name/gelatodigital/limit-orders-fantom",
};
exports.SUBGRAPH_URL = {
    [exports.CHAIN_ID.MAINNET]: "https://api.thegraph.com/subgraphs/name/gelatodigital/limit-orders-ii",
    [exports.CHAIN_ID.MATIC]: "https://api.thegraph.com/subgraphs/name/gelatodigital/limit-orders-polygon-ii",
    [exports.CHAIN_ID.FANTOM]: "https://api.thegraph.com/subgraphs/name/gelatodigital/limit-orders-fantom-ii",
    [exports.CHAIN_ID.BSC]: "https://api.thegraph.com/subgraphs/name/gelatodigital/limit-orders-bsc",
    [exports.CHAIN_ID.AVAX]: "https://api.thegraph.com/subgraphs/name/gelatodigital/limit-orders-avax",
    [exports.CHAIN_ID.CRONOS]: "https://graph.cronoslabs.com/subgraphs/name/gelatonetwork/limit-orders-cronos",
};
exports.GELATO_LIMIT_ORDERS_ADDRESS = {
    [exports.CHAIN_ID.MAINNET]: "0x36049D479A97CdE1fC6E2a5D2caE30B666Ebf92B",
    [exports.CHAIN_ID.ROPSTEN]: "0x0e5096D201Fe2985f5C26432A76f145D6e5D1453",
    [exports.CHAIN_ID.GOERLI]: "0xa0453c6ab71fe3da89640ee2503326bd0899a589",
    [exports.CHAIN_ID.MATIC]: "0x38c4092b28dAB7F3d98eE6524549571c283cdfA5",
    [exports.CHAIN_ID.FANTOM]: "0x05Ad1094Eb6Cde564d732196F6754Ee464896031",
    [exports.CHAIN_ID.BSC]: "0x0c30D3d66bc7C73A83fdA929888c34dcb24FD599",
    [exports.CHAIN_ID.AVAX]: "0x0c30D3d66bc7C73A83fdA929888c34dcb24FD599",
    [exports.CHAIN_ID.CRONOS]: "0x5d41545c190637b9337ec5ffa89bac5ee0cb3a4c",
};
exports.GELATO_LIMIT_ORDERS_MODULE_ADDRESS = {
    [exports.CHAIN_ID.MAINNET]: "0x037fc8e71445910e1E0bBb2a0896d5e9A7485318",
    [exports.CHAIN_ID.ROPSTEN]: "0x3f3C13b09B601fb6074124fF8D779d2964caBf8B",
    [exports.CHAIN_ID.GOERLI]: "0xCf8EDB3333Fae73b23f689229F4De6Ac95d1f707",
    [exports.CHAIN_ID.MATIC]: "0x5A36178E38864F5E724A2DaF5f9cD9bA473f7903",
    [exports.CHAIN_ID.FANTOM]: "0xf2253BF9a0BD002300cFe6f4E630d755669f6DCa",
    [exports.CHAIN_ID.BSC]: "0xb7499a92fc36e9053a4324aFfae59d333635D9c3",
    [exports.CHAIN_ID.AVAX]: "0xb7499a92fc36e9053a4324aFfae59d333635D9c3",
    [exports.CHAIN_ID.CRONOS]: "0xf437a1a98566872f734BD18aDdF4BB610D1F887b",
};
exports.GELATO_LIMIT_ORDERS_MODULE_FLASHBOTS_ADDRESS = {
    [exports.CHAIN_ID.MAINNET]: "0xbeC333EDE1A0687D2b9624F8C073a54c93ba9777",
    [exports.CHAIN_ID.GOERLI]: "0xCf8EDB3333Fae73b23f689229F4De6Ac95d1f707",
};
exports.GELATO_LIMIT_ORDERS_ERC20_ORDER_ROUTER = {
    [exports.CHAIN_ID.MAINNET]: "0x5fb00386558ccc219e51b69d8e963ef20b0c267a",
    [exports.CHAIN_ID.ROPSTEN]: "0x9c06ff386779cc2269d482bcecf2378a4ff5cb90",
    [exports.CHAIN_ID.GOERLI]: "0x247A1306b6122ba28862b19a95004899db91f1b5",
    [exports.CHAIN_ID.MATIC]: "0x16773FcA1bd726E1eafAB52699bcF738fE4AdF69",
    [exports.CHAIN_ID.FANTOM]: "0x97C1af451407e266fD57168e61D4B5af31894244",
    [exports.CHAIN_ID.BSC]: "0x64c7f3c2C19B41a6aD67bb5f4edc8EdbB3284F34",
    [exports.CHAIN_ID.AVAX]: "0x3441456d5750f4a22b0DcBD434D99B97455B70Ac",
    [exports.CHAIN_ID.CRONOS]: "0x260aB0aCb931D7Da784fC35c7E96c3B13213Abf1",
};
exports.NATIVE_TOKEN_TICKER = {
    [exports.CHAIN_ID.MAINNET]: "ETH",
    [exports.CHAIN_ID.ROPSTEN]: "ETH",
    [exports.CHAIN_ID.GOERLI]: "ETH",
    [exports.CHAIN_ID.MATIC]: "MATIC",
    [exports.CHAIN_ID.FANTOM]: "FTM",
    [exports.CHAIN_ID.BSC]: "BNB",
    [exports.CHAIN_ID.AVAX]: "AVAX",
    [exports.CHAIN_ID.CRONOS]: "CRO",
};
exports.NATIVE_WRAPPED_TOKEN_TICKER = {
    [exports.CHAIN_ID.MAINNET]: "WETH",
    [exports.CHAIN_ID.ROPSTEN]: "WETH",
    [exports.CHAIN_ID.GOERLI]: "WETH",
    [exports.CHAIN_ID.MATIC]: "WMATIC",
    [exports.CHAIN_ID.FANTOM]: "WFTM",
    [exports.CHAIN_ID.BSC]: "WBNB",
    [exports.CHAIN_ID.AVAX]: "WAVAX",
    [exports.CHAIN_ID.CRONOS]: "WCRO",
};
exports.NATIVE_TOKEN_NAME = {
    [exports.CHAIN_ID.MAINNET]: "Ether",
    [exports.CHAIN_ID.ROPSTEN]: "Ether",
    [exports.CHAIN_ID.GOERLI]: "Ether",
    [exports.CHAIN_ID.MATIC]: "Matic",
    [exports.CHAIN_ID.FANTOM]: "Fantom",
    [exports.CHAIN_ID.BSC]: "Bnb",
    [exports.CHAIN_ID.AVAX]: "Avax",
    [exports.CHAIN_ID.CRONOS]: "Cronos",
};
exports.NATIVE_WRAPPED_TOKEN_ADDRESS = {
    [exports.CHAIN_ID.MAINNET]: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    [exports.CHAIN_ID.ROPSTEN]: "0xc778417e063141139fce010982780140aa0cd5ab",
    [exports.CHAIN_ID.GOERLI]: "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6",
    [exports.CHAIN_ID.MATIC]: "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270",
    [exports.CHAIN_ID.FANTOM]: "0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83",
    [exports.CHAIN_ID.BSC]: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
    [exports.CHAIN_ID.AVAX]: "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7",
    [exports.CHAIN_ID.CRONOS]: "0x5C7F8A570d578ED84E63fdFA7b1eE72dEae1AE23",
};
exports.GENERIC_GAS_LIMIT_ORDER_EXECUTION = "400000";
exports.GELATO_STOP_LIMIT_ORDERS_MODULE_ADDRESS = {
    [exports.CHAIN_ID.MAINNET]: "0x260aB0aCb931D7Da784fC35c7E96c3B13213Abf1",
    [exports.CHAIN_ID.ROPSTEN]: "0xDC41072F4aFE7e4a7ea0f21d13a92662Fe733C55",
    [exports.CHAIN_ID.MATIC]: "0x81967ac4ce8e2d94f7e4b4cf3d2e760605079604",
    [exports.CHAIN_ID.BSC]: "0xe912cd26c4a4cfffc175a297f1328ab23313a1a7",
    [exports.CHAIN_ID.FANTOM]: "0xf437a1a98566872f734bd18addf4bb610d1f887b",
    [exports.CHAIN_ID.AVAX]: "0xf437a1a98566872f734bd18addf4bb610d1f887b",
    [exports.CHAIN_ID.CRONOS]: "",
};
