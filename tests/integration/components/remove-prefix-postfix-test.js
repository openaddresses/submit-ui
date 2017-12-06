import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('remove-prefix-postfix', 'Integration | Component | remove prefix postfix', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{remove-prefix-postfix}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#remove-prefix-postfix}}
      template block text
    {{/remove-prefix-postfix}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
