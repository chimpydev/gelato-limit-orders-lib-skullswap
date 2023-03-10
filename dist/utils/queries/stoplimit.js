"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._getUniqueOrdersWithExpiry = exports.queryPastOrders = exports.queryStopLimitCancelledOrders = exports.queryStopLimitExecutedOrders = exports.queryOpenStopLimitOrders = exports.queryStopLimitOrders = void 0;
const tslib_1 = require("tslib");
const graphql_request_1 = require("graphql-request");
const constants_1 = require("../../constants");
const constants_2 = require("./constants");
const queryStopLimitOrders = (owner, chainId) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const dataStopLimitSubgraph = constants_1.SUBGRAPH_URL[chainId]
            ? yield (0, graphql_request_1.request)(constants_1.SUBGRAPH_URL[chainId], constants_2.GET_ALL_STOP_LIMIT_ORDERS_BY_OWNER, {
                owner: owner.toLowerCase(),
                module: constants_1.GELATO_STOP_LIMIT_ORDERS_MODULE_ADDRESS[chainId].toLowerCase(),
            })
            : { orders: [] };
        const orders = dataStopLimitSubgraph.orders;
        return (0, exports._getUniqueOrdersWithExpiry)(orders);
    }
    catch (error) {
        console.error(error);
        throw new Error("Could not query subgraph for all orders");
    }
});
exports.queryStopLimitOrders = queryStopLimitOrders;
const queryOpenStopLimitOrders = (owner, chainId) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const dataStopLimitSubgraph = constants_1.SUBGRAPH_URL[chainId]
            ? yield (0, graphql_request_1.request)(constants_1.SUBGRAPH_URL[chainId], constants_2.GET_ALL_STOP_LIMIT_ORDERS_BY_OWNER, {
                owner: owner.toLowerCase(),
                module: constants_1.GELATO_STOP_LIMIT_ORDERS_MODULE_ADDRESS[chainId].toLowerCase(),
            })
            : { orders: [] };
        const orders = dataStopLimitSubgraph.orders;
        return (0, exports._getUniqueOrdersWithExpiry)(orders).filter((order) => order.status === "open");
    }
    catch (error) {
        throw new Error("Could not query subgraph for open orders");
    }
});
exports.queryOpenStopLimitOrders = queryOpenStopLimitOrders;
const queryStopLimitExecutedOrders = (owner, chainId) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const dataStopLimitSubgraph = constants_1.SUBGRAPH_URL[chainId]
            ? yield (0, graphql_request_1.request)(constants_1.SUBGRAPH_URL[chainId], constants_2.GET_ALL_STOP_LIMIT_ORDERS_BY_OWNER, {
                owner: owner.toLowerCase(),
                module: constants_1.GELATO_STOP_LIMIT_ORDERS_MODULE_ADDRESS[chainId].toLowerCase(),
            })
            : { orders: [] };
        const orders = dataStopLimitSubgraph.orders;
        return (0, exports._getUniqueOrdersWithExpiry)(orders).filter((order) => order.status === "executed");
    }
    catch (error) {
        throw new Error("Could not query subgraph for executed orders");
    }
});
exports.queryStopLimitExecutedOrders = queryStopLimitExecutedOrders;
const queryStopLimitCancelledOrders = (owner, chainId) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const dataStopLimitSubgraph = constants_1.SUBGRAPH_URL[chainId]
            ? yield (0, graphql_request_1.request)(constants_1.SUBGRAPH_URL[chainId], constants_2.GET_ALL_STOP_LIMIT_ORDERS_BY_OWNER, {
                owner: owner.toLowerCase(),
                module: constants_1.GELATO_STOP_LIMIT_ORDERS_MODULE_ADDRESS[chainId].toLowerCase(),
            })
            : { orders: [] };
        const orders = dataStopLimitSubgraph.orders;
        return (0, exports._getUniqueOrdersWithExpiry)(orders).filter((order) => order.status === "cancelled");
    }
    catch (error) {
        throw new Error("Could not query subgraph for cancelled orders");
    }
});
exports.queryStopLimitCancelledOrders = queryStopLimitCancelledOrders;
const queryPastOrders = (owner, chainId) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const dataStopLimitSubgraph = constants_1.SUBGRAPH_URL[chainId]
            ? yield (0, graphql_request_1.request)(constants_1.SUBGRAPH_URL[chainId], constants_2.GET_ALL_STOP_LIMIT_ORDERS_BY_OWNER, {
                owner: owner.toLowerCase(),
                module: constants_1.GELATO_STOP_LIMIT_ORDERS_MODULE_ADDRESS[chainId].toLowerCase(),
            })
            : { orders: [] };
        const orders = dataStopLimitSubgraph.orders;
        return (0, exports._getUniqueOrdersWithExpiry)(orders).filter((order) => order.status !== "open");
    }
    catch (error) {
        throw new Error("Could not query subgraph for past orders");
    }
});
exports.queryPastOrders = queryPastOrders;
const _getUniqueOrdersWithExpiry = (allOrders) => [...new Map(allOrders.map((order) => [order.id, order])).values()]
    // sort by `updatedAt` asc so that the most recent one will be used
    .sort((a, b) => parseFloat(a.updatedAt) - parseFloat(b.updatedAt))
    // add expiry to order obj
    .map((order) => {
    const isExpired = Date.now() >
        (parseInt(order.createdAt) + constants_1.MAX_LIFETIME_IN_SECONDS) * 1000;
    return Object.assign(Object.assign({}, order), { isExpired });
});
exports._getUniqueOrdersWithExpiry = _getUniqueOrdersWithExpiry;
