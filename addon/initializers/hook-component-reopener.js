import Ember from 'ember';
import returnWhenTesting from 'ember-hook/utils/return-when-testing';

const {
  computed,
  Component
} = Ember;

export function initialize() {
  Component.reopen({
    attributeBindings: ['_testHook:data-test'],

    _testHook: computed('testHook', 'forceHook', {
      get() {
        const config = this.container.lookupFactory('config:environment');
        const { testHook, forceHook } = this.getProperties('testHook', 'forceHook');
        
        return returnWhenTesting(config, testHook, forceHook);
      }
    }).readOnly()
  });
}

export default {
  name: 'hook-component-reopener',
  initialize: initialize
};
