import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('help-modal', 'Integration | Component | help modal', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  // Check that it renders by checking .help-button
  this.render(hbs`{{help-modal}}`);
  assert.equal(this.$('div.help-button').text().trim(), 'Help');
});

test('help modal opens when "Help" clicked', function(assert) {
  assert.expect(2);

  this.render(hbs`{{help-modal}}`);
  assert.equal(this.$('div.help-modal').hasClass("scale in"), false);

  this.$('div.help-button').click();
  assert.equal(this.$('div.help-modal').hasClass("scale in"), true);
});

test('help modal closes when "cancel" button is clicked', function(assert) {
  assert.expect(2);

  this.render(hbs`{{help-modal}}`);
  this.$('.help-button').click();
  assert.equal(this.$('.help-modal').hasClass("scale in"), true);

  this.$('.ui.deny.button').click();
  assert.equal(this.$('.help-modal').hasClass("scale out"), true);
})
