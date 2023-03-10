"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GelatoBase = exports.isETHOrWETH = exports.isFlashbotsCompatibleChainId = exports.isValidChainIdAndHandler = void 0;
const tslib_1 = require("tslib");
const ethers_1 = require("ethers");
const abstract_provider_1 = require("@ethersproject/abstract-provider");
const abstract_signer_1 = require("@ethersproject/abstract-signer");
const constants_1 = require("../constants");
const types_1 = require("../contracts/types");
const utils_1 = require("../utils");
const isValidChainIdAndHandler = (chainId, handler) => {
    return constants_1.NETWORK_HANDLERS[chainId].includes(handler);
};
exports.isValidChainIdAndHandler = isValidChainIdAndHandler;
const isFlashbotsCompatibleChainId = (chainId) => {
    return chainId == constants_1.CHAIN_ID.MAINNET || chainId == constants_1.CHAIN_ID.GOERLI;
};
exports.isFlashbotsCompatibleChainId = isFlashbotsCompatibleChainId;
const isETHOrWETH = (tokenAddress, chainID) => {
    const WETH_ADDRESS = constants_1.NATIVE_WRAPPED_TOKEN_ADDRESS[chainID];
    return (tokenAddress.toLowerCase() === constants_1.ETH_ADDRESS.toLowerCase() ||
        tokenAddress.toLowerCase() === WETH_ADDRESS.toLowerCase());
};
exports.isETHOrWETH = isETHOrWETH;
class GelatoBase {
    constructor(chainId, moduleAddress, signerOrProvider, handler, handlerAddress) {
        if (handler && !(0, exports.isValidChainIdAndHandler)(chainId, handler)) {
            throw new Error("Invalid chainId and handler");
        }
        this._chainId = chainId;
        this._gelatoFeeBPS = constants_1.BPS_GELATO_FEE[chainId];
        this._slippageBPS = constants_1.STOP_LIMIT_SLIPPAGE_BPS[chainId];
        this._subgraphUrl = constants_1.SUBGRAPH_URL[chainId];
        this._signer = abstract_signer_1.Signer.isSigner(signerOrProvider)
            ? signerOrProvider
            : undefined;
        this._provider = abstract_provider_1.Provider.isProvider(signerOrProvider)
            ? signerOrProvider
            : abstract_signer_1.Signer.isSigner(signerOrProvider)
                ? signerOrProvider.provider
                : undefined;
        this._gelatoCore = this._signer
            ? types_1.GelatoLimitOrders__factory.connect(constants_1.GELATO_LIMIT_ORDERS_ADDRESS[this._chainId], this._signer)
            : this._provider
                ? types_1.GelatoLimitOrders__factory.connect(constants_1.GELATO_LIMIT_ORDERS_ADDRESS[this._chainId], this._provider)
                : new ethers_1.Contract(constants_1.GELATO_LIMIT_ORDERS_ADDRESS[this._chainId], types_1.GelatoLimitOrders__factory.createInterface());
        this._abiEncoder = new ethers_1.utils.AbiCoder();
        this._erc20OrderRouter = this._signer
            ? types_1.ERC20OrderRouter__factory.connect(constants_1.GELATO_LIMIT_ORDERS_ERC20_ORDER_ROUTER[this._chainId], this._signer)
            : this._provider
                ? types_1.ERC20OrderRouter__factory.connect(constants_1.GELATO_LIMIT_ORDERS_ERC20_ORDER_ROUTER[this._chainId], this._provider)
                : new ethers_1.Contract(constants_1.GELATO_LIMIT_ORDERS_ERC20_ORDER_ROUTER[this._chainId], types_1.ERC20OrderRouter__factory.createInterface());
        this._handler = handler;
        this._handlerAddress = handlerAddress;
        this._moduleAddress = moduleAddress;
    }
    get gelatoFeeBPS() {
        return this._gelatoFeeBPS;
    }
    get slippageBPS() {
        return this._slippageBPS;
    }
    get chainId() {
        return this._chainId;
    }
    get signer() {
        return this._signer;
    }
    get provider() {
        return this._provider;
    }
    get subgraphUrl() {
        return this._subgraphUrl;
    }
    get handler() {
        return this._handler;
    }
    get handlerAddress() {
        return this._handlerAddress;
    }
    get moduleAddress() {
        return this._moduleAddress;
    }
    get contract() {
        return this._gelatoCore;
    }
    get erc20OrderRouter() {
        return this._erc20OrderRouter;
    }
    get abiEncoder() {
        return this._abiEncoder;
    }
    encodeLimitOrderCancellation(order, checkIsActiveOrder) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!this._gelatoCore)
                throw new Error("No gelato limit orders contract");
            if (!order.inputToken)
                throw new Error("No input token in order");
            if (!order.witness)
                throw new Error("No witness in order");
            if (!order.outputToken)
                throw new Error("No output token in order");
            if (!order.minReturn)
                throw new Error("No minReturn in order");
            if (!order.owner)
                throw new Error("No owner");
            if (checkIsActiveOrder) {
                const isActiveOrder = yield this.isActiveOrder(order);
                if (!isActiveOrder)
                    throw new Error("Order not found. Please review your order data.");
            }
            const data = this._gelatoCore.interface.encodeFunctionData("cancelOrder", [
                this._moduleAddress,
                order.inputToken,
                order.owner,
                order.witness,
                order.data,
            ]);
            return {
                data,
                to: this._gelatoCore.address,
                value: ethers_1.constants.Zero,
            };
        });
    }
    cancelStopLimitOrder(order, checkIsActiveOrder, overrides) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!this._signer)
                throw new Error("No signer");
            if (!this._gelatoCore)
                throw new Error("No gelato limit orders contract");
            if (!order.inputToken)
                throw new Error("No input token in order");
            if (!order.witness)
                throw new Error("No witness in order");
            if (!order.outputToken)
                throw new Error("No output token in order");
            if (!order.minReturn)
                throw new Error("No minReturn in order");
            if (!order.data)
                throw new Error("No data in order");
            if (checkIsActiveOrder) {
                const isActiveOrder = yield this.isActiveOrder(order);
                if (!isActiveOrder)
                    throw new Error("Order not found. Please review your order data.");
            }
            const owner = yield this._signer.getAddress();
            if (owner.toLowerCase() !== order.owner.toLowerCase())
                throw new Error("Owner and signer mismatch");
            return this._gelatoCore.cancelOrder(this._moduleAddress, order.inputToken, order.owner, order.witness, order.data, overrides !== null && overrides !== void 0 ? overrides : {
                gasLimit: (0, utils_1.isEthereumChain)(this._chainId) ? 500000 : 1500000,
            });
        });
    }
    approveTokenAmount(inputToken, amount, overrides) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!this._signer)
                throw new Error("No signer");
            return overrides
                ? types_1.ERC20__factory.connect(inputToken, this._signer).approve(this._erc20OrderRouter.address, amount, overrides)
                : types_1.ERC20__factory.connect(inputToken, this._signer).approve(this._erc20OrderRouter.address, amount);
        });
    }
    isActiveOrder(order) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!this._provider)
                throw new Error("No provider");
            if (!this._gelatoCore)
                throw new Error("No gelato limit orders contract");
            if (!order.module)
                throw new Error("No module in order");
            if (!order.inputToken)
                throw new Error("No input token in order");
            if (!order.owner)
                throw new Error("No owner in order");
            if (!order.witness)
                throw new Error("No witness in order");
            if (!order.data)
                throw new Error("No data in order");
            return this._gelatoCore.existOrder(order.module, order.inputToken, order.owner, order.witness, order.data);
        });
    }
    getExchangeRate(inputValue, inputDecimals, outputValue, outputDecimals, invert = false) {
        const factor = ethers_1.BigNumber.from(10).pow(ethers_1.BigNumber.from(18));
        if (invert) {
            return ethers_1.BigNumber.from(inputValue)
                .mul(factor)
                .div(outputValue)
                .mul(ethers_1.BigNumber.from(10).pow(ethers_1.BigNumber.from(outputDecimals)))
                .div(ethers_1.BigNumber.from(10).pow(ethers_1.BigNumber.from(inputDecimals)))
                .toString();
        }
        else {
            return ethers_1.BigNumber.from(outputValue)
                .mul(factor)
                .div(inputValue)
                .mul(ethers_1.BigNumber.from(10).pow(ethers_1.BigNumber.from(inputDecimals)))
                .div(ethers_1.BigNumber.from(10).pow(ethers_1.BigNumber.from(outputDecimals)))
                .toString();
        }
    }
    getFeeAndSlippageAdjustedMinReturn(outputAmount, extraSlippageBPS) {
        if (extraSlippageBPS) {
            if (!Number.isInteger(extraSlippageBPS))
                throw new Error("Extra Slippage BPS must an unsigned integer");
        }
        const gelatoFee = ethers_1.BigNumber.from(outputAmount)
            .mul(this._gelatoFeeBPS)
            .div(10000)
            .gte(1)
            ? ethers_1.BigNumber.from(outputAmount).mul(this._gelatoFeeBPS).div(10000)
            : ethers_1.BigNumber.from(1);
        const slippageBPS = extraSlippageBPS ? extraSlippageBPS : this._slippageBPS;
        const slippage = ethers_1.BigNumber.from(outputAmount).mul(slippageBPS).div(10000);
        const minReturn = ethers_1.BigNumber.from(outputAmount).sub(gelatoFee).sub(slippage);
        return {
            minReturn: minReturn.toString(),
            slippage: slippage.toString(),
            gelatoFee: gelatoFee.toString(),
        };
    }
    getAdjustedMinReturn(minReturn, extraSlippageBPS) {
        const gelatoFee = ethers_1.BigNumber.from(this._gelatoFeeBPS);
        const slippage = extraSlippageBPS
            ? ethers_1.BigNumber.from(extraSlippageBPS)
            : ethers_1.BigNumber.from(this._slippageBPS);
        const fees = gelatoFee.add(slippage);
        const adjustedMinReturn = ethers_1.BigNumber.from(minReturn)
            .mul(10000)
            .div(ethers_1.BigNumber.from(10000).sub(fees));
        return adjustedMinReturn.toString();
    }
    getExecutionPrice(inputAmount, inputDecimals, outputAmount, outputDecimals, isInverted = false) {
        const factor = ethers_1.BigNumber.from(10).pow(ethers_1.BigNumber.from(isInverted ? outputDecimals : inputDecimals));
        if (isInverted) {
            return ethers_1.BigNumber.from(inputAmount)
                .mul(factor)
                .div(outputAmount)
                .toString();
        }
        else {
            return ethers_1.BigNumber.from(outputAmount)
                .mul(factor)
                .div(inputAmount)
                .toString();
        }
    }
    _getKey(order) {
        return ethers_1.utils.keccak256(this._abiEncoder.encode(["address", "address", "address", "address", "bytes"], [order.module, order.inputToken, order.owner, order.witness, order.data]));
    }
    _encodeSubmitData(inputToken, outputToken, owner, witness, amount, maxReturn, minReturn, secret, checkAllowance) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!this.provider)
                throw new Error("No provider");
            if (!this.handlerAddress)
                throw new Error("No handlerAddress");
            if (inputToken.toLowerCase() === outputToken.toLowerCase())
                throw new Error("Input token and output token can not be equal");
            const encodedData = this.abiEncoder.encode(["address", "uint256", "address", "uint256"], [outputToken, minReturn, this.handlerAddress, maxReturn]);
            let data, value, to;
            if ((0, utils_1.isNetworkGasToken)(inputToken)) {
                const encodedEthOrder = yield this.contract.encodeEthOrder(this.moduleAddress, constants_1.ETH_ADDRESS, // we also use ETH_ADDRESS if it's MATIC
                owner, witness, encodedData, secret);
                data = this.contract.interface.encodeFunctionData("depositEth", [
                    encodedEthOrder,
                ]);
                value = amount;
                to = this.contract.address;
            }
            else {
                if (checkAllowance) {
                    const allowance = yield types_1.ERC20__factory.connect(inputToken, this.provider).allowance(owner, this.erc20OrderRouter.address);
                    if (allowance.lt(amount))
                        throw new Error("Insufficient token allowance for placing order");
                }
                data = this.erc20OrderRouter.interface.encodeFunctionData("depositToken", [
                    amount,
                    this.moduleAddress,
                    inputToken,
                    owner,
                    witness,
                    encodedData,
                    secret,
                ]);
                value = ethers_1.constants.Zero;
                to = this.erc20OrderRouter.address;
            }
            return { data, value, to };
        });
    }
}
exports.GelatoBase = GelatoBase;
