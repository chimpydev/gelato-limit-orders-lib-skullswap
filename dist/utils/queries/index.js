"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryCancelledOrders = exports.queryExecutedOrders = exports.queryPastOrders = exports.queryOpenOrders = exports.queryOrders = exports.queryOrder = void 0;
const tslib_1 = require("tslib");
const graphql_request_1 = require("graphql-request");
const constants_1 = require("../../constants");
const constants_2 = require("./constants");
const stopLimitModule = (chainId) => constants_1.GELATO_STOP_LIMIT_ORDERS_MODULE_ADDRESS[chainId].toLowerCase();
const queryOrder = (orderId, chainId) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const dataFromOldSubgraph = constants_1.OLD_SUBGRAPH_URL[chainId]
            ? yield (0, graphql_request_1.request)(constants_1.OLD_SUBGRAPH_URL[chainId], constants_2.GET_ORDER_BY_ID, {
                id: orderId.toLowerCase(),
            })
            : { orders: [] };
        const dataFromNewSubgraph = constants_1.SUBGRAPH_URL[chainId]
            ? yield (0, graphql_request_1.request)(constants_1.SUBGRAPH_URL[chainId], constants_2.GET_ORDER_BY_ID, {
                id: orderId.toLowerCase(),
            })
            : { orders: [] };
        const allOrders = [
            ...dataFromOldSubgraph.orders,
            ...dataFromNewSubgraph.orders,
        ];
        return (_a = _getUniqueOrdersWithExpiry(allOrders, chainId).pop()) !== null && _a !== void 0 ? _a : null;
    }
    catch (error) {
        throw new Error("Could not query subgraph for all orders");
    }
});
exports.queryOrder = queryOrder;
const queryOrders = (owner, chainId) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const dataFromOldSubgraph = constants_1.OLD_SUBGRAPH_URL[chainId]
            ? yield (0, graphql_request_1.request)(constants_1.OLD_SUBGRAPH_URL[chainId], constants_2.GET_ALL_ORDERS_BY_OWNER, {
                owner: owner.toLowerCase(),
            })
            : { orders: [] };
        const dataFromNewSubgraph = constants_1.SUBGRAPH_URL[chainId]
            ? yield (0, graphql_request_1.request)(constants_1.SUBGRAPH_URL[chainId], constants_2.GET_ALL_ORDERS_BY_OWNER, {
                owner: owner.toLowerCase(),
            })
            : { orders: [] };
        const allOrders = [
            ...dataFromOldSubgraph.orders,
            ...dataFromNewSubgraph.orders,
        ];
        return _getUniqueOrdersWithExpiry(allOrders, chainId);
    }
    catch (error) {
        throw new Error("Could not query subgraph for all orders");
    }
});
exports.queryOrders = queryOrders;
const queryOpenOrders = (owner, chainId) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const dataFromOldSubgraph = constants_1.OLD_SUBGRAPH_URL[chainId]
            ? yield (0, graphql_request_1.request)(constants_1.OLD_SUBGRAPH_URL[chainId], constants_2.GET_ALL_ORDERS_BY_OWNER, {
                owner: owner.toLowerCase(),
            })
            : { orders: [] };
        const dataFromNewSubgraph = constants_1.SUBGRAPH_URL[chainId]
            ? yield (0, graphql_request_1.request)(constants_1.SUBGRAPH_URL[chainId], constants_2.GET_ALL_ORDERS_BY_OWNER, {
                owner: owner.toLowerCase(),
            })
            : { orders: [] };
        const allOrders = [
            ...dataFromOldSubgraph.orders,
            ...dataFromNewSubgraph.orders,
        ];
        return _getUniqueOrdersWithExpiry(allOrders, chainId).filter((order) => order.status === "open");
    }
    catch (error) {
        throw new Error("Could not query subgraph for open orders");
    }
});
exports.queryOpenOrders = queryOpenOrders;
const queryPastOrders = (owner, chainId) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const dataFromOldSubgraph = constants_1.OLD_SUBGRAPH_URL[chainId]
            ? yield (0, graphql_request_1.request)(constants_1.OLD_SUBGRAPH_URL[chainId], constants_2.GET_ALL_ORDERS_BY_OWNER, {
                owner: owner.toLowerCase(),
            })
            : { orders: [] };
        const dataFromNewSubgraph = constants_1.SUBGRAPH_URL[chainId]
            ? yield (0, graphql_request_1.request)(constants_1.SUBGRAPH_URL[chainId], constants_2.GET_ALL_ORDERS_BY_OWNER, {
                owner: owner.toLowerCase(),
            })
            : { orders: [] };
        const allOrders = [
            ...dataFromOldSubgraph.orders,
            ...dataFromNewSubgraph.orders,
        ];
        return _getUniqueOrdersWithExpiry(allOrders, chainId).filter((order) => order.status !== "open");
    }
    catch (error) {
        throw new Error("Could not query subgraph for past orders");
    }
});
exports.queryPastOrders = queryPastOrders;
const queryExecutedOrders = (owner, chainId) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const dataFromOldSubgraph = constants_1.OLD_SUBGRAPH_URL[chainId]
            ? yield (0, graphql_request_1.request)(constants_1.OLD_SUBGRAPH_URL[chainId], constants_2.GET_ALL_ORDERS_BY_OWNER, {
                owner: owner.toLowerCase(),
            })
            : { orders: [] };
        const dataFromNewSubgraph = constants_1.SUBGRAPH_URL[chainId]
            ? yield (0, graphql_request_1.request)(constants_1.SUBGRAPH_URL[chainId], constants_2.GET_ALL_ORDERS_BY_OWNER, {
                owner: owner.toLowerCase(),
            })
            : { orders: [] };
        const allOrders = [
            ...dataFromOldSubgraph.orders,
            ...dataFromNewSubgraph.orders,
        ];
        return _getUniqueOrdersWithExpiry(allOrders, chainId).filter((order) => order.status === "executed");
    }
    catch (error) {
        throw new Error("Could not query subgraph for executed orders");
    }
});
exports.queryExecutedOrders = queryExecutedOrders;
const queryCancelledOrders = (owner, chainId) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const dataFromOldSubgraph = constants_1.OLD_SUBGRAPH_URL[chainId]
            ? yield (0, graphql_request_1.request)(constants_1.OLD_SUBGRAPH_URL[chainId], constants_2.GET_ALL_ORDERS_BY_OWNER, {
                owner: owner.toLowerCase(),
            })
            : { orders: [] };
        const dataFromNewSubgraph = constants_1.SUBGRAPH_URL[chainId]
            ? yield (0, graphql_request_1.request)(constants_1.SUBGRAPH_URL[chainId], constants_2.GET_ALL_ORDERS_BY_OWNER, {
                owner: owner.toLowerCase(),
            })
            : { orders: [] };
        const allOrders = [
            ...dataFromOldSubgraph.orders,
            ...dataFromNewSubgraph.orders,
        ];
        return _getUniqueOrdersWithExpiry(allOrders, chainId).filter((order) => order.status === "cancelled");
    }
    catch (error) {
        throw new Error("Could not query subgraph for cancelled orders");
    }
});
exports.queryCancelledOrders = queryCancelledOrders;
const _getUniqueOrdersWithExpiry = (allOrders, chainId) => 
// create Map and asign order id to order (key:value) to avoid having duplicated orders form multiple subgraphs
[...new Map(allOrders.map((order) => [order.id, order])).values()]
    // sort by `updatedAt` asc so that the most recent one will be used
    .sort((a, b) => parseFloat(a.updatedAt) - parseFloat(b.updatedAt))
    // filter out stop limit module
    .filter((order) => order.module !== stopLimitModule(chainId))
    // add expiry to order obj
    .map((order) => {
    const isExpired = Date.now() >
        (parseInt(order.createdAt) + constants_1.MAX_LIFETIME_IN_SECONDS) * 1000;
    return Object.assign(Object.assign({}, order), { isExpired });
});
