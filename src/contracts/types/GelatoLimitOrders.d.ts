/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
  BaseContract,
  ContractTransaction,
  Overrides,
  PayableOverrides,
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import type { TypedEventFilter, TypedEvent, TypedListener } from "./common";

interface GelatoLimitOrdersInterface extends ethers.utils.Interface {
  functions: {
    "ETH_ADDRESS()": FunctionFragment;
    "canExecuteOrder(address,address,address,address,bytes,bytes)": FunctionFragment;
    "cancelOrder(address,address,address,address,bytes)": FunctionFragment;
    "decodeOrder(bytes)": FunctionFragment;
    "depositEth(bytes)": FunctionFragment;
    "encodeEthOrder(address,address,address,address,bytes,bytes32)": FunctionFragment;
    "encodeTokenOrder(address,address,address,address,bytes,bytes32,uint256)": FunctionFragment;
    "ethDeposits(bytes32)": FunctionFragment;
    "executeOrder(address,address,address,bytes,bytes,bytes)": FunctionFragment;
    "existOrder(address,address,address,address,bytes)": FunctionFragment;
    "keyOf(address,address,address,address,bytes)": FunctionFragment;
    "vaultOfOrder(address,address,address,address,bytes)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "ETH_ADDRESS",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "canExecuteOrder",
    values: [string, string, string, string, BytesLike, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "cancelOrder",
    values: [string, string, string, string, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "decodeOrder",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "depositEth",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "encodeEthOrder",
    values: [string, string, string, string, BytesLike, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "encodeTokenOrder",
    values: [string, string, string, string, BytesLike, BytesLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "ethDeposits",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "executeOrder",
    values: [string, string, string, BytesLike, BytesLike, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "existOrder",
    values: [string, string, string, string, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "keyOf",
    values: [string, string, string, string, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "vaultOfOrder",
    values: [string, string, string, string, BytesLike]
  ): string;

  decodeFunctionResult(
    functionFragment: "ETH_ADDRESS",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "canExecuteOrder",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "cancelOrder",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "decodeOrder",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "depositEth", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "encodeEthOrder",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "encodeTokenOrder",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "ethDeposits",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "executeOrder",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "existOrder", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "keyOf", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "vaultOfOrder",
    data: BytesLike
  ): Result;

  events: {
    "DepositETH(bytes32,address,uint256,bytes)": EventFragment;
    "OrderCancelled(bytes32,address,address,address,bytes,uint256)": EventFragment;
    "OrderExecuted(bytes32,address,address,address,bytes,bytes,uint256,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "DepositETH"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OrderCancelled"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OrderExecuted"): EventFragment;
}

export type DepositETHEvent = TypedEvent<
  [string, string, BigNumber, string] & {
    _key: string;
    _caller: string;
    _amount: BigNumber;
    _data: string;
  }
>;

export type OrderCancelledEvent = TypedEvent<
  [string, string, string, string, string, BigNumber] & {
    _key: string;
    _inputToken: string;
    _owner: string;
    _witness: string;
    _data: string;
    _amount: BigNumber;
  }
>;

export type OrderExecutedEvent = TypedEvent<
  [string, string, string, string, string, string, BigNumber, BigNumber] & {
    _key: string;
    _inputToken: string;
    _owner: string;
    _witness: string;
    _data: string;
    _auxData: string;
    _amount: BigNumber;
    _bought: BigNumber;
  }
>;

export class GelatoLimitOrders extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  listeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter?: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): Array<TypedListener<EventArgsArray, EventArgsObject>>;
  off<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  on<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  once<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeListener<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeAllListeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): this;

  listeners(eventName?: string): Array<Listener>;
  off(eventName: string, listener: Listener): this;
  on(eventName: string, listener: Listener): this;
  once(eventName: string, listener: Listener): this;
  removeListener(eventName: string, listener: Listener): this;
  removeAllListeners(eventName?: string): this;

  queryFilter<EventArgsArray extends Array<any>, EventArgsObject>(
    event: TypedEventFilter<EventArgsArray, EventArgsObject>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEvent<EventArgsArray & EventArgsObject>>>;

  interface: GelatoLimitOrdersInterface;

  functions: {
    ETH_ADDRESS(overrides?: CallOverrides): Promise<[string]>;

    canExecuteOrder(
      _module: string,
      _inputToken: string,
      _owner: string,
      _witness: string,
      _data: BytesLike,
      _auxData: BytesLike,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    cancelOrder(
      _module: string,
      _inputToken: string,
      _owner: string,
      _witness: string,
      _data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    decodeOrder(
      _data: BytesLike,
      overrides?: CallOverrides
    ): Promise<
      [string, string, string, string, string, string] & {
        module: string;
        inputToken: string;
        owner: string;
        witness: string;
        data: string;
        secret: string;
      }
    >;

    depositEth(
      _data: BytesLike,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    encodeEthOrder(
      _module: string,
      _inputToken: string,
      _owner: string,
      _witness: string,
      _data: BytesLike,
      _secret: BytesLike,
      overrides?: CallOverrides
    ): Promise<[string]>;

    encodeTokenOrder(
      _module: string,
      _inputToken: string,
      _owner: string,
      _witness: string,
      _data: BytesLike,
      _secret: BytesLike,
      _amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string]>;

    ethDeposits(
      arg0: BytesLike,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    executeOrder(
      _module: string,
      _inputToken: string,
      _owner: string,
      _data: BytesLike,
      _signature: BytesLike,
      _auxData: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    existOrder(
      _module: string,
      _inputToken: string,
      _owner: string,
      _witness: string,
      _data: BytesLike,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    keyOf(
      _module: string,
      _inputToken: string,
      _owner: string,
      _witness: string,
      _data: BytesLike,
      overrides?: CallOverrides
    ): Promise<[string]>;

    vaultOfOrder(
      _module: string,
      _inputToken: string,
      _owner: string,
      _witness: string,
      _data: BytesLike,
      overrides?: CallOverrides
    ): Promise<[string]>;
  };

  ETH_ADDRESS(overrides?: CallOverrides): Promise<string>;

  canExecuteOrder(
    _module: string,
    _inputToken: string,
    _owner: string,
    _witness: string,
    _data: BytesLike,
    _auxData: BytesLike,
    overrides?: CallOverrides
  ): Promise<boolean>;

  cancelOrder(
    _module: string,
    _inputToken: string,
    _owner: string,
    _witness: string,
    _data: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  decodeOrder(
    _data: BytesLike,
    overrides?: CallOverrides
  ): Promise<
    [string, string, string, string, string, string] & {
      module: string;
      inputToken: string;
      owner: string;
      witness: string;
      data: string;
      secret: string;
    }
  >;

  depositEth(
    _data: BytesLike,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  encodeEthOrder(
    _module: string,
    _inputToken: string,
    _owner: string,
    _witness: string,
    _data: BytesLike,
    _secret: BytesLike,
    overrides?: CallOverrides
  ): Promise<string>;

  encodeTokenOrder(
    _module: string,
    _inputToken: string,
    _owner: string,
    _witness: string,
    _data: BytesLike,
    _secret: BytesLike,
    _amount: BigNumberish,
    overrides?: CallOverrides
  ): Promise<string>;

  ethDeposits(arg0: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;

  executeOrder(
    _module: string,
    _inputToken: string,
    _owner: string,
    _data: BytesLike,
    _signature: BytesLike,
    _auxData: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  existOrder(
    _module: string,
    _inputToken: string,
    _owner: string,
    _witness: string,
    _data: BytesLike,
    overrides?: CallOverrides
  ): Promise<boolean>;

  keyOf(
    _module: string,
    _inputToken: string,
    _owner: string,
    _witness: string,
    _data: BytesLike,
    overrides?: CallOverrides
  ): Promise<string>;

  vaultOfOrder(
    _module: string,
    _inputToken: string,
    _owner: string,
    _witness: string,
    _data: BytesLike,
    overrides?: CallOverrides
  ): Promise<string>;

  callStatic: {
    ETH_ADDRESS(overrides?: CallOverrides): Promise<string>;

    canExecuteOrder(
      _module: string,
      _inputToken: string,
      _owner: string,
      _witness: string,
      _data: BytesLike,
      _auxData: BytesLike,
      overrides?: CallOverrides
    ): Promise<boolean>;

    cancelOrder(
      _module: string,
      _inputToken: string,
      _owner: string,
      _witness: string,
      _data: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    decodeOrder(
      _data: BytesLike,
      overrides?: CallOverrides
    ): Promise<
      [string, string, string, string, string, string] & {
        module: string;
        inputToken: string;
        owner: string;
        witness: string;
        data: string;
        secret: string;
      }
    >;

    depositEth(_data: BytesLike, overrides?: CallOverrides): Promise<void>;

    encodeEthOrder(
      _module: string,
      _inputToken: string,
      _owner: string,
      _witness: string,
      _data: BytesLike,
      _secret: BytesLike,
      overrides?: CallOverrides
    ): Promise<string>;

    encodeTokenOrder(
      _module: string,
      _inputToken: string,
      _owner: string,
      _witness: string,
      _data: BytesLike,
      _secret: BytesLike,
      _amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;

    ethDeposits(arg0: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;

    executeOrder(
      _module: string,
      _inputToken: string,
      _owner: string,
      _data: BytesLike,
      _signature: BytesLike,
      _auxData: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    existOrder(
      _module: string,
      _inputToken: string,
      _owner: string,
      _witness: string,
      _data: BytesLike,
      overrides?: CallOverrides
    ): Promise<boolean>;

    keyOf(
      _module: string,
      _inputToken: string,
      _owner: string,
      _witness: string,
      _data: BytesLike,
      overrides?: CallOverrides
    ): Promise<string>;

    vaultOfOrder(
      _module: string,
      _inputToken: string,
      _owner: string,
      _witness: string,
      _data: BytesLike,
      overrides?: CallOverrides
    ): Promise<string>;
  };

  filters: {
    "DepositETH(bytes32,address,uint256,bytes)"(
      _key?: BytesLike | null,
      _caller?: string | null,
      _amount?: null,
      _data?: null
    ): TypedEventFilter<
      [string, string, BigNumber, string],
      { _key: string; _caller: string; _amount: BigNumber; _data: string }
    >;

    DepositETH(
      _key?: BytesLike | null,
      _caller?: string | null,
      _amount?: null,
      _data?: null
    ): TypedEventFilter<
      [string, string, BigNumber, string],
      { _key: string; _caller: string; _amount: BigNumber; _data: string }
    >;

    "OrderCancelled(bytes32,address,address,address,bytes,uint256)"(
      _key?: BytesLike | null,
      _inputToken?: null,
      _owner?: null,
      _witness?: null,
      _data?: null,
      _amount?: null
    ): TypedEventFilter<
      [string, string, string, string, string, BigNumber],
      {
        _key: string;
        _inputToken: string;
        _owner: string;
        _witness: string;
        _data: string;
        _amount: BigNumber;
      }
    >;

    OrderCancelled(
      _key?: BytesLike | null,
      _inputToken?: null,
      _owner?: null,
      _witness?: null,
      _data?: null,
      _amount?: null
    ): TypedEventFilter<
      [string, string, string, string, string, BigNumber],
      {
        _key: string;
        _inputToken: string;
        _owner: string;
        _witness: string;
        _data: string;
        _amount: BigNumber;
      }
    >;

    "OrderExecuted(bytes32,address,address,address,bytes,bytes,uint256,uint256)"(
      _key?: BytesLike | null,
      _inputToken?: null,
      _owner?: null,
      _witness?: null,
      _data?: null,
      _auxData?: null,
      _amount?: null,
      _bought?: null
    ): TypedEventFilter<
      [string, string, string, string, string, string, BigNumber, BigNumber],
      {
        _key: string;
        _inputToken: string;
        _owner: string;
        _witness: string;
        _data: string;
        _auxData: string;
        _amount: BigNumber;
        _bought: BigNumber;
      }
    >;

    OrderExecuted(
      _key?: BytesLike | null,
      _inputToken?: null,
      _owner?: null,
      _witness?: null,
      _data?: null,
      _auxData?: null,
      _amount?: null,
      _bought?: null
    ): TypedEventFilter<
      [string, string, string, string, string, string, BigNumber, BigNumber],
      {
        _key: string;
        _inputToken: string;
        _owner: string;
        _witness: string;
        _data: string;
        _auxData: string;
        _amount: BigNumber;
        _bought: BigNumber;
      }
    >;
  };

  estimateGas: {
    ETH_ADDRESS(overrides?: CallOverrides): Promise<BigNumber>;

    canExecuteOrder(
      _module: string,
      _inputToken: string,
      _owner: string,
      _witness: string,
      _data: BytesLike,
      _auxData: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    cancelOrder(
      _module: string,
      _inputToken: string,
      _owner: string,
      _witness: string,
      _data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    decodeOrder(
      _data: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    depositEth(
      _data: BytesLike,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    encodeEthOrder(
      _module: string,
      _inputToken: string,
      _owner: string,
      _witness: string,
      _data: BytesLike,
      _secret: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    encodeTokenOrder(
      _module: string,
      _inputToken: string,
      _owner: string,
      _witness: string,
      _data: BytesLike,
      _secret: BytesLike,
      _amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    ethDeposits(arg0: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;

    executeOrder(
      _module: string,
      _inputToken: string,
      _owner: string,
      _data: BytesLike,
      _signature: BytesLike,
      _auxData: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    existOrder(
      _module: string,
      _inputToken: string,
      _owner: string,
      _witness: string,
      _data: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    keyOf(
      _module: string,
      _inputToken: string,
      _owner: string,
      _witness: string,
      _data: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    vaultOfOrder(
      _module: string,
      _inputToken: string,
      _owner: string,
      _witness: string,
      _data: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    ETH_ADDRESS(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    canExecuteOrder(
      _module: string,
      _inputToken: string,
      _owner: string,
      _witness: string,
      _data: BytesLike,
      _auxData: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    cancelOrder(
      _module: string,
      _inputToken: string,
      _owner: string,
      _witness: string,
      _data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    decodeOrder(
      _data: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    depositEth(
      _data: BytesLike,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    encodeEthOrder(
      _module: string,
      _inputToken: string,
      _owner: string,
      _witness: string,
      _data: BytesLike,
      _secret: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    encodeTokenOrder(
      _module: string,
      _inputToken: string,
      _owner: string,
      _witness: string,
      _data: BytesLike,
      _secret: BytesLike,
      _amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    ethDeposits(
      arg0: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    executeOrder(
      _module: string,
      _inputToken: string,
      _owner: string,
      _data: BytesLike,
      _signature: BytesLike,
      _auxData: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    existOrder(
      _module: string,
      _inputToken: string,
      _owner: string,
      _witness: string,
      _data: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    keyOf(
      _module: string,
      _inputToken: string,
      _owner: string,
      _witness: string,
      _data: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    vaultOfOrder(
      _module: string,
      _inputToken: string,
      _owner: string,
      _witness: string,
      _data: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}