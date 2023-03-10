"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GelatoStopLimitOrders = void 0;
const tslib_1 = require("tslib");
const ethers_1 = require("ethers");
const constants_1 = require("../constants");
const core_1 = require("./core");
const stoplimit_1 = require("../utils/queries/stoplimit");
class GelatoStopLimitOrders extends core_1.GelatoBase {
    constructor(chainId, signerOrProvider, handler) {
        var _a;
        if (handler && !(0, core_1.isValidChainIdAndHandler)(chainId, handler)) {
            throw new Error("Invalid chainId and handler");
        }
        const sotplossHandlers = constants_1.NETWORK_STOP_LIMIT_HANDLERS[chainId];
        if (!handler) {
            throw new Error("No Handler defined");
        }
        if (handler && !sotplossHandlers.includes(handler)) {
            throw new Error("Handler not supported");
        }
        const moduleAddress = constants_1.GELATO_STOP_LIMIT_ORDERS_MODULE_ADDRESS[chainId];
        if (!moduleAddress)
            throw new Error("Invalid chainId and handler");
        const handlerAddress = (_a = constants_1.HANDLERS_ADDRESSES[chainId][handler]) === null || _a === void 0 ? void 0 : _a.toLowerCase();
        super(chainId, moduleAddress, signerOrProvider, handler, handlerAddress);
    }
    submitStopLimitOrder(inputToken, outputToken, inputAmount, maxReturn, checkAllowance = true, overrides) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!this.signer)
                throw new Error("No signer");
            if (!maxReturn)
                throw new Error("No StopLimit defined");
            const owner = yield this.signer.getAddress();
            const txData = yield this.encodeStopLimitOrderSubmission(inputToken, outputToken, inputAmount, maxReturn, owner, checkAllowance);
            return this.signer.sendTransaction(Object.assign(Object.assign({}, overrides), { to: txData.to, data: txData.data, value: ethers_1.BigNumber.from(txData.value) }));
        });
    }
    encodeStopLimitOrderSubmission(inputToken, outputToken, inputAmount, maxReturn, owner, checkAllowance = true) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { payload } = yield this.encodeStopLimitOrderSubmissionWithSecret(inputToken, outputToken, inputAmount, maxReturn, owner, checkAllowance);
            return payload;
        });
    }
    encodeStopLimitOrderSubmissionWithSecret(inputToken, outputToken, inputAmount, maxReturnToBeParsed, owner, checkAllowance = true) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!maxReturnToBeParsed)
                throw new Error("No StopLimit defined");
            if (!this.handlerAddress)
                throw new Error("No handlerAddress");
            const randomSecret = ethers_1.utils.hexlify(ethers_1.utils.randomBytes(19)).replace("0x", "");
            // 0x67656c61746f6e6574776f726b = gelatonetwork in hex
            const fullSecret = `0x67656c61746f6e6574776f726b${randomSecret}`;
            const { privateKey: secret, address: witness } = new ethers_1.Wallet(fullSecret);
            const { minReturn } = this.getFeeAndSlippageAdjustedMinReturn(maxReturnToBeParsed);
            const payload = yield this._encodeSubmitData(inputToken, outputToken, owner, witness, inputAmount, maxReturnToBeParsed, minReturn, secret, checkAllowance);
            const encodedData = this.abiEncoder.encode(["address", "uint256", "address", "uint256"], [outputToken, minReturn, this.handlerAddress, maxReturnToBeParsed]);
            return {
                payload,
                secret,
                witness,
                order: {
                    id: this._getKey({
                        module: this.moduleAddress,
                        inputToken,
                        owner,
                        witness,
                        data: encodedData,
                    }),
                    module: this.moduleAddress.toLowerCase(),
                    data: encodedData,
                    inputToken: inputToken.toLowerCase(),
                    outputToken: outputToken.toLowerCase(),
                    owner: owner.toLowerCase(),
                    witness: witness.toLowerCase(),
                    inputAmount: inputAmount.toString(),
                    minReturn: minReturn.toString(),
                    maxReturn: maxReturnToBeParsed.toString(),
                    adjustedMinReturn: maxReturnToBeParsed.toString(),
                    inputData: payload.data.toString(),
                    secret: secret.toLowerCase(),
                    handler: (_a = this.handlerAddress) !== null && _a !== void 0 ? _a : null,
                },
            };
        });
    }
    getOpenStopLimitOrders(owner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const orders = yield (0, stoplimit_1.queryStopLimitOrders)(owner, this.chainId);
            return orders.map((order) => (Object.assign(Object.assign({}, order), { adjustedMinReturn: this.getAdjustedMinReturn(order.minReturn) })));
        });
    }
    getStopLimitOrders(owner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const orders = yield (0, stoplimit_1.queryStopLimitOrders)(owner, this.chainId);
            return orders.map((order) => (Object.assign(Object.assign({}, order), { adjustedMinReturn: this.getAdjustedMinReturn(order.minReturn) })));
        });
    }
    getExecutedStopLimitOrders(owner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const orders = yield (0, stoplimit_1.queryStopLimitExecutedOrders)(owner, this.chainId);
            return orders.map((order) => (Object.assign(Object.assign({}, order), { adjustedMinReturn: this.getAdjustedMinReturn(order.minReturn) })));
        });
    }
    getCancelledStopLimitOrders(owner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const orders = yield (0, stoplimit_1.queryStopLimitCancelledOrders)(owner, this.chainId);
            return orders.map((order) => (Object.assign(Object.assign({}, order), { adjustedMinReturn: this.getAdjustedMinReturn(order.minReturn) })));
        });
    }
    getPastStopLimitOrders(owner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const orders = yield (0, stoplimit_1.queryPastOrders)(owner, this.chainId);
            return orders.map((order) => (Object.assign(Object.assign({}, order), { adjustedMinReturn: this.getAdjustedMinReturn(order.minReturn) })));
        });
    }
}
exports.GelatoStopLimitOrders = GelatoStopLimitOrders;
