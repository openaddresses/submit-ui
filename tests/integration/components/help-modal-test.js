import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('help-modal', 'Integration | Component | help modal', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  // this.render(hbs`{{help-modal}}`);

  // assert.equal(this.$().text().trim(), '');

  // // Template block usage:
  // this.render(hbs`
  //   {{#help-modal}}
  //     template block text
  //   {{/help-modal}}
  // `);

  // assert.equal(this.$().text().trim(), 'template block text');

  test('should open modal on button click', function(assert) {
    assert.expect(2);

    this.render(hbs`{{help-modal}}`);
    assert.equal(this.$('.help-button').text(), 'Help Needed', 'Only "Help Needed" is displayed');

    // Click on "Help Needed" button
    Ember.run(() => document.querySelector('.help-button').click());
    assert.equal(this.$('.help-modal').text(), "Having trouble contributing or editing a source? Please fill out this form so that we can help.", 'help modal opens on click');
  })
});
