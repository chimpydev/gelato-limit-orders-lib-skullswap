"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GelatoLimitOrders = exports.isFlashbotsCompatibleChainId = exports.isValidChainIdAndHandler = void 0;
const tslib_1 = require("tslib");
const ethers_1 = require("ethers");
const abstract_provider_1 = require("@ethersproject/abstract-provider");
const abstract_signer_1 = require("@ethersproject/abstract-signer");
const constants_1 = require("../constants");
const types_1 = require("../contracts/types");
const queries_1 = require("../utils/queries");
const utils_1 = require("../utils");
const isValidChainIdAndHandler = (chainId, handler) => {
    return constants_1.NETWORK_HANDLERS[chainId].includes(handler);
};
exports.isValidChainIdAndHandler = isValidChainIdAndHandler;
const isFlashbotsCompatibleChainId = (chainId) => {
    return chainId == constants_1.CHAIN_ID.MAINNET || chainId == constants_1.CHAIN_ID.GOERLI;
};
exports.isFlashbotsCompatibleChainId = isFlashbotsCompatibleChainId;
class GelatoLimitOrders {
    constructor(chainId, signerOrProvider, handler, isFlashbotsProtected = false, subgraphUrl) {
        var _a;
        if (handler && !(0, exports.isValidChainIdAndHandler)(chainId, handler)) {
            throw new Error("Invalid chainId and handler");
        }
        else if (isFlashbotsProtected &&
            (handler || !(0, exports.isFlashbotsCompatibleChainId)(chainId))) {
            throw new Error("Invalid chainId or handler for Flashbots bundle submission. handler must be undefined, and chainId either 1 (mainnet) or 5 (goerli)");
        }
        this._chainId = chainId;
        this._gelatoFeeBPS = constants_1.BPS_GELATO_FEE[chainId];
        this._slippageBPS = constants_1.LIMIT_ORDER_SLIPPAGE[chainId];
        this._subgraphUrl = subgraphUrl !== null && subgraphUrl !== void 0 ? subgraphUrl : constants_1.SUBGRAPH_URL[chainId];
        this._signer = abstract_signer_1.Signer.isSigner(signerOrProvider)
            ? signerOrProvider
            : undefined;
        this._provider = abstract_provider_1.Provider.isProvider(signerOrProvider)
            ? signerOrProvider
            : abstract_signer_1.Signer.isSigner(signerOrProvider)
                ? signerOrProvider.provider
                : undefined;
        this._gelatoLimitOrders = this._signer
            ? types_1.GelatoLimitOrders__factory.connect(constants_1.GELATO_LIMIT_ORDERS_ADDRESS[this._chainId], this._signer)
            : this._provider
                ? types_1.GelatoLimitOrders__factory.connect(constants_1.GELATO_LIMIT_ORDERS_ADDRESS[this._chainId], this._provider)
                : new ethers_1.Contract(constants_1.GELATO_LIMIT_ORDERS_ADDRESS[this._chainId], types_1.GelatoLimitOrders__factory.createInterface());
        this._moduleAddress = isFlashbotsProtected
            ? constants_1.GELATO_LIMIT_ORDERS_MODULE_FLASHBOTS_ADDRESS[this._chainId]
            : constants_1.GELATO_LIMIT_ORDERS_MODULE_ADDRESS[this._chainId];
        this._handler = handler;
        this._handlerAddress = handler
            ? (_a = constants_1.HANDLERS_ADDRESSES[this._chainId][handler]) === null || _a === void 0 ? void 0 : _a.toLowerCase()
            : undefined;
        this._isFlashbotsProtected = isFlashbotsProtected;
        this._abiEncoder = new ethers_1.utils.AbiCoder();
        this._erc20OrderRouter = this._signer
            ? types_1.ERC20OrderRouter__factory.connect(constants_1.GELATO_LIMIT_ORDERS_ERC20_ORDER_ROUTER[this._chainId], this._signer)
            : this._provider
                ? types_1.ERC20OrderRouter__factory.connect(constants_1.GELATO_LIMIT_ORDERS_ERC20_ORDER_ROUTER[this._chainId], this._provider)
                : new ethers_1.Contract(constants_1.GELATO_LIMIT_ORDERS_ERC20_ORDER_ROUTER[this._chainId], types_1.ERC20OrderRouter__factory.createInterface());
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
    set subgraphUrl(url) {
        this._subgraphUrl = url;
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
        return this._gelatoLimitOrders;
    }
    get erc20OrderRouter() {
        return this._erc20OrderRouter;
    }
    get isFlashbotsProtected() {
        return this._isFlashbotsProtected;
    }
    encodeLimitOrderSubmission(inputToken, outputToken, inputAmount, minReturn, owner, checkAllowance = true) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { payload } = yield this.encodeLimitOrderSubmissionWithSecret(inputToken, outputToken, inputAmount, minReturn, owner, checkAllowance);
            return payload;
        });
    }
    encodeLimitOrderSubmissionWithSecret(inputToken, outputToken, inputAmount, minReturnToBeParsed, owner, checkAllowance = true) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const randomSecret = ethers_1.utils.hexlify(ethers_1.utils.randomBytes(19)).replace("0x", "");
            // 0x67656c61746f6e6574776f726b = gelatonetwork in hex
            const fullSecret = `0x67656c61746f6e6574776f726b${randomSecret}`;
            const { privateKey: secret, address: witness } = new ethers_1.Wallet(fullSecret);
            const { minReturn } = this.getFeeAndSlippageAdjustedMinReturn(minReturnToBeParsed);
            const payload = yield this._encodeSubmitData(inputToken, outputToken, owner, witness, inputAmount, minReturn, secret, checkAllowance);
            const encodedData = this._handlerAddress
                ? this._abiEncoder.encode(["address", "uint256", "address"], [outputToken, minReturn, this._handlerAddress])
                : this._abiEncoder.encode(["address", "uint256"], [outputToken, minReturn]);
            return {
                payload,
                secret,
                witness,
                order: {
                    id: this._getKey({
                        module: this._moduleAddress,
                        inputToken,
                        owner,
                        witness,
                        data: encodedData,
                    }),
                    module: this._moduleAddress.toLowerCase(),
                    data: encodedData,
                    inputToken: inputToken.toLowerCase(),
                    outputToken: outputToken.toLowerCase(),
                    owner: owner.toLowerCase(),
                    witness: witness.toLowerCase(),
                    inputAmount: inputAmount.toString(),
                    minReturn: minReturn.toString(),
                    adjustedMinReturn: minReturnToBeParsed.toString(),
                    inputData: payload.data.toString(),
                    secret: secret.toLowerCase(),
                    handler: (_a = this._handlerAddress) !== null && _a !== void 0 ? _a : null,
                },
            };
        });
    }
    submitLimitOrder(inputToken, outputToken, inputAmount, minReturn, checkAllowance = true, overrides) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!this._signer)
                throw new Error("No signer");
            const owner = yield this._signer.getAddress();
            const txData = yield this.encodeLimitOrderSubmission(inputToken, outputToken, inputAmount, minReturn, owner, checkAllowance);
            return this._signer.sendTransaction(Object.assign(Object.assign({}, overrides), { to: txData.to, data: txData.data, value: ethers_1.BigNumber.from(txData.value) }));
        });
    }
    encodeLimitOrderCancellation(order, checkIsActiveOrder) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!this._gelatoLimitOrders)
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
            if (!order.module)
                throw new Error("No module in order");
            if (checkIsActiveOrder) {
                const isActiveOrder = yield this.isActiveOrder(order);
                if (!isActiveOrder)
                    throw new Error("Order not found. Please review your order data.");
            }
            const data = this._gelatoLimitOrders.interface.encodeFunctionData("cancelOrder", [order.module, order.inputToken, order.owner, order.witness, order.data]);
            return {
                data,
                to: this._gelatoLimitOrders.address,
                value: ethers_1.constants.Zero,
            };
        });
    }
    cancelLimitOrder(order, checkIsActiveOrder, overrides) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!this._signer)
                throw new Error("No signer");
            if (!this._gelatoLimitOrders)
                throw new Error("No gelato limit orders contract");
            let _order = order;
            if (order.id) {
                try {
                    const subgraphOrder = yield Promise.race([
                        this.getOrder(order.id),
                        new Promise((resolve) => setTimeout(resolve, 5000)).then(() => {
                            throw new Error("Timeout");
                        }),
                    ]);
                    if (subgraphOrder) {
                        if (subgraphOrder.status === "cancelled") {
                            throw new Error(`Order status is not open. Current order status: ${subgraphOrder.status}. Cancellation transaction hash: ${subgraphOrder.cancelledTxHash}`);
                        }
                        if (subgraphOrder.status === "executed") {
                            throw new Error(`Order status is not open. Current order status: ${subgraphOrder.status}. Execution transaction hash: ${subgraphOrder.executedTxHash}`);
                        }
                        _order = Object.assign(Object.assign({}, order), subgraphOrder);
                    }
                    // eslint-disable-next-line no-empty
                }
                catch (error) { }
            }
            if (!_order.inputToken)
                throw new Error("No input token in order");
            if (!_order.witness)
                throw new Error("No witness in order");
            if (!_order.outputToken)
                throw new Error("No output token in order");
            if (!_order.minReturn)
                throw new Error("No minReturn in order");
            if (!_order.data)
                throw new Error("No data in order");
            if (!_order.module)
                throw new Error("No module in order");
            if (checkIsActiveOrder) {
                const isActiveOrder = yield this.isActiveOrder(_order);
                if (!isActiveOrder)
                    throw new Error("Order not found. Please review your order data.");
            }
            const owner = yield this._signer.getAddress();
            if (owner.toLowerCase() !== order.owner.toLowerCase())
                throw new Error("Owner and signer mismatch");
            return this._gelatoLimitOrders.cancelOrder(_order.module, _order.inputToken, _order.owner, _order.witness, _order.data, overrides !== null && overrides !== void 0 ? overrides : {
                gasLimit: (0, utils_1.isEthereumChain)(this._chainId) ? 600000 : 2000000,
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
            if (!this._gelatoLimitOrders)
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
            return this._gelatoLimitOrders.existOrder(order.module, order.inputToken, order.owner, order.witness, order.data);
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
        const slippageBPS = extraSlippageBPS
            ? this._slippageBPS + extraSlippageBPS
            : this._slippageBPS;
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
            ? ethers_1.BigNumber.from(this._slippageBPS + extraSlippageBPS)
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
    getOrder(orderId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const order = yield (0, queries_1.queryOrder)(orderId, this._chainId);
            if (order) {
                return Object.assign(Object.assign({}, order), { adjustedMinReturn: this.getAdjustedMinReturn(order.minReturn) });
            }
            else {
                return null;
            }
        });
    }
    getOrders(owner, includeOrdersWithNullHandler = false) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const orders = yield (0, queries_1.queryOrders)(owner, this._chainId);
            return orders
                .map((order) => (Object.assign(Object.assign({}, order), { adjustedMinReturn: this.getAdjustedMinReturn(order.minReturn) })))
                .filter((order) => {
                if (this._handler && !order.handler) {
                    return includeOrdersWithNullHandler ? true : false;
                }
                else {
                    return this._handler ? order.handler === this._handlerAddress : true;
                }
            });
        });
    }
    getOpenOrders(owner, includeOrdersWithNullHandler = false) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const orders = yield (0, queries_1.queryOpenOrders)(owner, this._chainId);
            return orders
                .map((order) => (Object.assign(Object.assign({}, order), { adjustedMinReturn: this.getAdjustedMinReturn(order.minReturn) })))
                .filter((order) => {
                if (this._handler && !order.handler) {
                    return includeOrdersWithNullHandler ? true : false;
                }
                else {
                    return this._handler ? order.handler === this._handlerAddress : true;
                }
            });
        });
    }
    getPastOrders(owner, includeOrdersWithNullHandler = false) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const orders = yield (0, queries_1.queryPastOrders)(owner, this._chainId);
            return orders
                .map((order) => (Object.assign(Object.assign({}, order), { adjustedMinReturn: this.getAdjustedMinReturn(order.minReturn) })))
                .filter((order) => {
                if (this._handler && !order.handler) {
                    return includeOrdersWithNullHandler ? true : false;
                }
                else {
                    return this._handler ? order.handler === this._handlerAddress : true;
                }
            });
        });
    }
    getExecutedOrders(owner, includeOrdersWithNullHandler = false) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const orders = yield (0, queries_1.queryExecutedOrders)(owner, this._chainId);
            return orders
                .map((order) => (Object.assign(Object.assign({}, order), { adjustedMinReturn: this.getAdjustedMinReturn(order.minReturn) })))
                .filter((order) => {
                if (this._handler && !order.handler) {
                    return includeOrdersWithNullHandler ? true : false;
                }
                else {
                    return this._handler ? order.handler === this._handlerAddress : true;
                }
            });
        });
    }
    getCancelledOrders(owner, includeOrdersWithNullHandler = false) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const orders = yield (0, queries_1.queryCancelledOrders)(owner, this._chainId);
            return orders
                .map((order) => (Object.assign(Object.assign({}, order), { adjustedMinReturn: this.getAdjustedMinReturn(order.minReturn) })))
                .filter((order) => {
                if (this._handler && !order.handler) {
                    return includeOrdersWithNullHandler ? true : false;
                }
                else {
                    return this._handler ? order.handler === this._handlerAddress : true;
                }
            });
        });
    }
    _getKey(order) {
        return ethers_1.utils.keccak256(this._abiEncoder.encode(["address", "address", "address", "address", "bytes"], [order.module, order.inputToken, order.owner, order.witness, order.data]));
    }
    _encodeSubmitData(inputToken, outputToken, owner, witness, amount, minReturn, secret, checkAllowance) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!this._provider)
                throw new Error("No provider");
            if (inputToken.toLowerCase() === outputToken.toLowerCase())
                throw new Error("Input token and output token can not be equal");
            const encodedData = this._handlerAddress
                ? this._abiEncoder.encode(["address", "uint256", "address"], [outputToken, minReturn, this._handlerAddress])
                : this._abiEncoder.encode(["address", "uint256"], [outputToken, minReturn]);
            let data, value, to;
            if ((0, utils_1.isNetworkGasToken)(inputToken)) {
                const encodedEthOrder = yield this._gelatoLimitOrders.encodeEthOrder(this._moduleAddress, constants_1.ETH_ADDRESS, // we also use ETH_ADDRESS if it's MATIC
                owner, witness, encodedData, secret);
                data = this._gelatoLimitOrders.interface.encodeFunctionData("depositEth", [encodedEthOrder]);
                value = amount;
                to = this._gelatoLimitOrders.address;
            }
            else {
                if (checkAllowance) {
                    const allowance = yield types_1.ERC20__factory.connect(inputToken, this._provider).allowance(owner, this._erc20OrderRouter.address);
                    if (allowance.lt(amount))
                        throw new Error("Insufficient token allowance for placing order");
                }
                data = this._erc20OrderRouter.interface.encodeFunctionData("depositToken", [
                    amount,
                    this._moduleAddress,
                    inputToken,
                    owner,
                    witness,
                    encodedData,
                    secret,
                ]);
                value = ethers_1.constants.Zero;
                to = this._erc20OrderRouter.address;
            }
            return { data, value, to };
        });
    }
}
exports.GelatoLimitOrders = GelatoLimitOrders;
