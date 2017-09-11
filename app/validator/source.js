import { validatePresence, validateLength, validateFormat } from 'ember-changeset-validations/validators';

export default {
  source_name: [
    validatePresence(true),
    validateLength({ min: 1 }),
  ],
  update_frequency: [
    validatePresence(true)
  ]
};