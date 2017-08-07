import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return fetch('/v1/state')
      .then(data => data.json());
  }
});
