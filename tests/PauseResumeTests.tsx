/**
 * PauseResumeTests.ts
 * Author: David de Regt
 * Copyright: Microsoft 2017
 *
 * Tests pause/resume behavior on components.
 */

import assert = require('assert');
import _ = require('lodash');
import React = require('react');
import TestUtils = require('react-addons-test-utils');

import ComponentBase from '../src/ComponentBase';
import { AutoSubscribeStore, autoSubscribe, autoSubscribeWithKey, disableWarnings, key, warnIfAutoSubscribeEnabled } from '../src/AutoSubscriptions';
import { StoreBase } from '../src/StoreBase';

// ----------------------------------------------------------------------------
// Store definition that uses auto-subscriptions.

// Data held by the store.
type StoreData = number;

const enum TriggerKeys {
    First,
    Second
}

@AutoSubscribeStore
class SimpleStore extends StoreBase {
    private _first = 1;
    private _second = 2;

    @autoSubscribeWithKey(TriggerKeys.First)
    getFirst() {
        return this._first;
    }

    @autoSubscribeWithKey(TriggerKeys.Second)
    getSecond() {
        return this._second;
    }

    setFirst(val: number) {
        this._first = val;
        this.trigger(TriggerKeys.First);
    }

    setSecond(val: number) {
        this._second = val;
        this.trigger(TriggerKeys.Second);
    }
}

let store: SimpleStore;

interface SimpleProps extends React.Props<any> {
}

interface SimpleState {
    first: number;
    second: number;
}

class SimpleComponent extends ComponentBase<SimpleProps, SimpleState> {
    buildStateCount = 0;
    renderCount = 0;

    protected _buildState(props: SimpleProps, initialBuild: boolean): Partial<SimpleState> {
        this.buildStateCount++;

        let newState: Partial<SimpleState> = {
            first: store.getFirst(),
            second: store.getSecond()
        };

        return newState;
    }

    render() {
        this.renderCount++;
        return <div>Not testing render...</div>;
    }
}

describe('PauseResumeTests', function () {
    beforeEach(() => {
        store = new SimpleStore();
    });
    
    function makeComponent(props: SimpleProps): SimpleComponent {
        const component = TestUtils.renderIntoDocument<SimpleProps>(<SimpleComponent { ...props } />) as SimpleComponent;

        return component;
    }

    it('Simple test', () => {
        const component = makeComponent({});
        assert.equal(component.buildStateCount, 1);
        assert.equal(component.renderCount, 1);
        store.setFirst(3);
        assert.equal(component.buildStateCount, 2);
        assert.equal(component.renderCount, 2);
        component.pause();
        store.setFirst(4);
        assert.equal(component.buildStateCount, 2);
        assert.equal(component.renderCount, 2);
        component.resume();
        assert.equal(component.buildStateCount, 3);
        assert.equal(component.renderCount, 3);
    });
});
