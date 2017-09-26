import { validatePresence, validateLength, validateFormat } from 'ember-changeset-validations/validators';

export default {
  data_link: [
    validatePresence(true),
    validateLength({ min: 1 }),
    validateFormat({ type: 'url' })
  ]
};