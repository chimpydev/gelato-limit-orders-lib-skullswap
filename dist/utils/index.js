"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isEthereumChain = exports.isTransactionCostDependentChain = exports.isNetworkGasToken = exports.queries = void 0;
const tslib_1 = require("tslib");
const constants_1 = require("../constants");
exports.queries = tslib_1.__importStar(require("./queries/constants"));
const isNetworkGasToken = (token) => {
    if (token.toLowerCase() === constants_1.ETH_ADDRESS.toLowerCase()) {
        return true;
    }
    else {
        return false;
    }
};
exports.isNetworkGasToken = isNetworkGasToken;
const isTransactionCostDependentChain = (chainId) => {
    switch (chainId) {
        case 1:
            return true;
        case 3:
            return true;
        case 5:
            return true;
        case 25:
            return true;
        case 56:
            return true;
        case 250:
            return true;
        case 43114:
            return true;
        default:
            return false;
    }
};
exports.isTransactionCostDependentChain = isTransactionCostDependentChain;
const isEthereumChain = (chainId) => {
    switch (chainId) {
        case 1:
            return true;
        case 3:
            return true;
        case 5:
            return true;
        default:
            return false;
    }
};
exports.isEthereumChain = isEthereumChain;
