declare module "src/lodashMini" {
    /**
    * lodashMini.ts
    *
    * Copyright (c) Microsoft Corporation. All rights reserved.
    * Licensed under the MIT license.
    *
    * Imports a subset of lodash library needed for ReSub
    */
    import bind = require('lodash/bind');
    import forEach = require('lodash/forEach');
    import extend = require('lodash/extend');
    import isArray = require('lodash/isArray');
    import isFunction = require('lodash/isFunction');
    import isNumber = require('lodash/isNumber');
    import isString = require('lodash/isString');
    import map = require('lodash/map');
    import noop = require('lodash/noop');
    import get = require('lodash/get');
    import isEqual = require('lodash/isEqual');
    import isEmpty = require('lodash/isEmpty');
    import find = require('lodash/find');
    import some = require('lodash/some');
    import remove = require('lodash/remove');
    import findIndex = require('lodash/findIndex');
    import flatten = require('lodash/flatten');
    import values = require('lodash/values');
    import clone = require('lodash/clone');
    import uniq = require('lodash/uniq');
    import indexOf = require('lodash/indexOf');
    import pull = require('lodash/pull');
    import union = require('lodash/union');
    import keys = require('lodash/keys');
    import uniqueId = require('lodash/uniqueId');
    export interface Dictionary<T> {
        [index: string]: T;
    }
    export { bind, forEach, isArray, isFunction, isNumber, isString, map, noop, extend, get, isEqual, isEmpty, find, some, remove, findIndex, flatten, values, clone, uniq, indexOf, pull, union, keys, uniqueId };
}
declare module "src/Decorator" {
    class FakeClassWithDecorator {
        foo(): typeof FakeClassWithDecorator;
    }
    export const decorate: Function;
    export { FakeClassWithDecorator as __unused };
}
declare module "src/Options" {
    export interface IOptions {
        setTimeout: (callback: () => void, timeoutMs?: number) => number;
        clearTimeout: (id: number) => void;
        shouldComponentUpdateComparator: <T>(values: T, compareTo: T) => boolean;
        development: boolean;
    }
    let OptionsVals: IOptions;
    export default OptionsVals;
}
declare module "src/MapShim" {
    export interface Map<K, V> {
        clear(): void;
        delete(key: K): boolean;
        forEach(callbackfn: (value: V, index: K, map: Map<K, V>) => void): void;
        get(key: K): V | undefined;
        has(key: K): boolean;
        set(key: K, value: V): Map<K, V>;
        size: number;
    }
    export interface MapConstructor {
        new <K, V>(): Map<K, V>;
        prototype: Map<any, any>;
    }
    var _default: MapConstructor;
    export default _default;
}
declare module "src/Types" {
    /**
    * Types.ts
    * Author: David de Regt
    * Copyright: Microsoft 2016
    *
    * Shared basic types for ReSub.
    */
    import { StoreBase } from "src/StoreBase";
    export type SubscriptionCallbackFunction = {
        (keys?: string[]): void;
    };
    export type SubscriptionCallbackBuildStateFunction<S> = {
        (keys?: string[]): Partial<S> | void;
    };
    export interface StoreSubscription<S> {
        store: StoreBase;
        callbackBuildState?: SubscriptionCallbackBuildStateFunction<S>;
        callback?: SubscriptionCallbackFunction;
        keyPropertyName?: string;
        specificKeyValue?: string | number;
        enablePropertyName?: string;
    }
}
declare module "src/StoreBase" {
    import { SubscriptionCallbackFunction } from "src/Types";
    export interface AutoSubscription {
        store: StoreBase;
        callback: () => void;
        key: string;
        used: boolean;
    }
    export abstract class StoreBase {
        static Key_All: string;
        private _subscriptions;
        private _autoSubscriptions;
        private _subTokenNum;
        private _subsByNum;
        storeId: string;
        private _gatheredCallbacks;
        private _throttleMs;
        private _throttleTimerId;
        private _bypassTriggerBlocks;
        private _triggerBlocked;
        private _isTriggering;
        private _triggerPending;
        private static _triggerBlockCount;
        private static _triggerBlockedStoreList;
        private static _pendingThrottledStores;
        private static _bypassThrottle;
        static pushTriggerBlock(): void;
        static popTriggerBlock(): void;
        static setThrottleStatus(enabled: boolean): void;
        constructor(throttleMs?: number, bypassTriggerBans?: boolean);
        protected trigger(keyOrKeys?: string | number | (string | number)[]): void;
        private _resolveThrottledCallbacks;
        subscribe(callback: SubscriptionCallbackFunction, rawKey?: string | number): number;
        unsubscribe(subToken: number): void;
        trackAutoSubscription(subscription: AutoSubscription): void;
        removeAutoSubscription(subscription: AutoSubscription): void;
        protected _startedTrackingKey(key: string): void;
        protected _stoppedTrackingKey(key: string): void;
        protected _getSubscriptionKeys(): string[];
        protected _isTrackingKey(key: string): boolean;
    }
}
declare module "src/AutoSubscriptions" {
    import { StoreBase } from "src/StoreBase";
    export type InstanceTarget = {};
    export interface AutoSubscribeHandler {
        handle(instance: InstanceTarget, store: StoreBase, key: string): void;
    }
    export function enableAutoSubscribeWrapper<T extends Function>(handler: AutoSubscribeHandler, existingMethod: T, thisArg: any): T;
    export function forbidAutoSubscribeWrapper<T extends Function>(existingMethod: T, thisArg?: any): T;
    export function enableAutoSubscribe(handler: AutoSubscribeHandler): MethodDecorator;
    export var AutoSubscribeStore: ClassDecorator;
    export var autoSubscribe: MethodDecorator;
    export function autoSubscribeWithKey(keyOrKeys: string | number | (string | number)[]): MethodDecorator;
    export function key(target: InstanceTarget, methodName: string, index: number): void;
    export function disableWarnings<T extends Function>(target: InstanceTarget, methodName: string, descriptor: TypedPropertyDescriptor<T>): TypedPropertyDescriptor<T>;
    export function warnIfAutoSubscribeEnabled<T extends Function>(target: InstanceTarget, methodName: string, descriptor: TypedPropertyDescriptor<T>): TypedPropertyDescriptor<T>;
}
declare module "src/ComponentBase" {
    import React = require('react');
    import { StoreSubscription } from "src/Types";
    abstract class ComponentBase<P extends React.Props<any>, S extends Object> extends React.Component<P, S> {
        private _storeSubscriptions;
        private static _nextSubscriptionId;
        private _handledSubscriptions;
        private _handledAutoSubscriptions;
        private _handledSubscriptionsLookup;
        private _isMounted;
        constructor(props: P);
        protected _initStoreSubscriptions(): StoreSubscription<S>[];
        componentWillMount(): void;
        componentWillReceiveProps(nextProps: P): void;
        componentWillUnmount(): void;
        componentWillUpdate(nextProps: P, nextState: S): void;
        shouldComponentUpdate(nextProps: P, nextState: S): boolean;
        isComponentMounted(): boolean;
        protected _addSubscription(subscription: StoreSubscription<S>): StoreSubscription<S> | undefined;
        protected _removeSubscription(subscription: StoreSubscription<S>): StoreSubscription<S>[];
        private _registerSubscription(subscription, key?);
        private _cleanupSubscription(subscription);
        private _shouldRemoveAndCleanupAutoSubscription(subscription);
        private _onSubscriptionChanged(subscription, changedItem);
        private _onAutoSubscriptionChanged;
        private _addSubscriptionToLookup(subscription);
        private _removeSubscriptionFromLookup(subscription);
        private _handleAutoSubscribe(store, key);
        private _hasMatchingSubscription(storeId, key);
        private _hasMatchingAutoSubscription(store, key);
        private static _autoSubscribeHandler;
        private _buildStateWithAutoSubscriptions(props, initialBuild);
        protected _buildState(props: P, initialBuild: boolean): Partial<S> | undefined;
        componentDidMount(): void;
        componentDidUpdate(prevProps: P, prevState: S): void;
        protected _componentDidRender(): void;
    }
    export default ComponentBase;
}
declare module "src/ReSub" {
    /**
    * ReSub.ts
    * Author: David de Regt
    * Copyright: Microsoft 2016
    *
    * Shared basic types for ReSub.
    */
    import ComponentBaseI = require("src/ComponentBase");
    import AutoSubscriptionsI = require("src/AutoSubscriptions");
    import StoreBaseI = require("src/StoreBase");
    import TypesI = require("src/Types");
    import OptionsI = require("src/Options");
    export const ComponentBase: typeof ComponentBaseI.default;
    export const StoreBase: typeof StoreBaseI.StoreBase;
    export const AutoSubscribeStore: ClassDecorator;
    export const autoSubscribe: MethodDecorator;
    export const autoSubscribeWithKey: typeof AutoSubscriptionsI.autoSubscribeWithKey;
    export const key: typeof AutoSubscriptionsI.key;
    export const disableWarnings: typeof AutoSubscriptionsI.disableWarnings;
    export const Options: OptionsI.IOptions;
    export import Types = TypesI;
}
declare module "tests/AutoSubscribeTests" {
}
declare module "tests/StoreBaseTests" {
}
declare module "tests/tests" {
    import "tests/AutoSubscribeTests";
    import "tests/StoreBaseTests";
}
