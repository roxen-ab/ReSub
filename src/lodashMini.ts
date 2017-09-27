/**
* lodashMini.ts
*
* Copyright (c) Microsoft Corporation. All rights reserved.
* Licensed under the MIT license.
*
* Imports a subset of lodash library needed for ReSub
*/

import {
    bind,
    forEach,
    extend,
    isArray,
    isFunction,
    isNumber,
    isString,
    map,
    noop,
    get,
    isEqual,
    isEmpty,
    find,
    some,
    remove,
    findIndex,
    flatten,
    values,
    clone,
    uniq,
    indexOf,
    pull,
    union,
    keys,
    uniqueId
} from 'lodash';

export interface Dictionary<T> {
    [index: string]: T;
}

export {
    bind,
    forEach,
    extend,
    isArray,
    isFunction,
    isNumber,
    isString,
    map,
    noop,
    get,
    isEqual,
    isEmpty,
    find,
    some,
    remove,
    findIndex,
    flatten,
    values,
    clone,
    uniq,
    indexOf,
    pull,
    union,
    keys,
    uniqueId
};
