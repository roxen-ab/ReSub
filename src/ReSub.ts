/**
* ReSub.ts
* Author: David de Regt
* Copyright: Microsoft 2016
*
* Shared basic types for ReSub.
*/

import * as ComponentBaseI from './ComponentBase';
import * as AutoSubscriptionsI from './AutoSubscriptions';
import * as StoreBaseI from './StoreBase';
import * as TypesI from './Types';
import * as OptionsI from './Options';

export const ComponentBase = ComponentBaseI.default;

export const StoreBase = StoreBaseI.StoreBase;

export const AutoSubscribeStore = AutoSubscriptionsI.AutoSubscribeStore;
export const autoSubscribe = AutoSubscriptionsI.autoSubscribe;
export const autoSubscribeWithKey = AutoSubscriptionsI.autoSubscribeWithKey;
export const key = AutoSubscriptionsI.key;
export const disableWarnings = AutoSubscriptionsI.disableWarnings;

export const Options = OptionsI.default;

export import Types = TypesI;
