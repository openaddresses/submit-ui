import { validatePresence, validateFormat } from 'ember-changeset-validations/validators';

export default {
  maintainer_name: [
  ],
  maintainer_email: [
    validatePresence(true),
    validateFormat({ type: 'email' })
  ]
};