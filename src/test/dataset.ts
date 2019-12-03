import assert from 'assert'
import fakeRaf from 'fake-raf'
import datasetModule from '../modules/dataset'

import { init } from '../snabbdom'
fakeRaf.use();
var patch = init([
  datasetModule
]);
import h from '../h'

describe('dataset', function() {
  var elm, vnode0;
  beforeEach(function() {
    elm = document.createElement('div');
    vnode0 = elm;
  });
  it('is set on initial element creation', function() {
    elm = patch(vnode0, h('div', {dataset: {foo: 'foo'}})).elm;
    assert.equal(elm.dataset.foo, 'foo');
  });
  it('updates dataset', function() {
    var vnode1 = h('i', {dataset: {foo: 'foo', bar: 'bar'}});
    var vnode2 = h('i', {dataset: {baz: 'baz'}});
    elm = patch(vnode0, vnode1).elm;
    assert.equal(elm.dataset.foo, 'foo');
    assert.equal(elm.dataset.bar, 'bar');
    elm = patch(vnode1, vnode2).elm;
    assert.equal(elm.dataset.baz, 'baz');
    assert.equal(elm.dataset.foo, undefined);
  });
  it('can be memoized', function() {
    var cachedDataset = {foo: 'foo', bar: 'bar'};
    var vnode1 = h('i', {dataset: cachedDataset});
    var vnode2 = h('i', {dataset: cachedDataset});
    elm = patch(vnode0, vnode1).elm;
    assert.equal(elm.dataset.foo, 'foo');
    assert.equal(elm.dataset.bar, 'bar');
    elm = patch(vnode1, vnode2).elm;
    assert.equal(elm.dataset.foo, 'foo');
    assert.equal(elm.dataset.bar, 'bar');
  });
  it('handles string conversions', function() {
    var vnode1 = h('i', {dataset: {empty: '', dash: '-', dashed:'foo-bar', camel: 'fooBar', integer:0, float:0.1}});
    elm = patch(vnode0, vnode1).elm;

    assert.equal(elm.dataset.empty, '');
    assert.equal(elm.dataset.dash, '-');
    assert.equal(elm.dataset.dashed, 'foo-bar');
    assert.equal(elm.dataset.camel, 'fooBar');
    assert.equal(elm.dataset.integer, '0');
    assert.equal(elm.dataset.float, '0.1');
  });

});

fakeRaf.restore();
