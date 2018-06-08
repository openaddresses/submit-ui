import { validatePresence, validateFormat, validateLength } from 'ember-changeset-validations/validators';

export default {
  contact_email: [
    validatePresence(true),
    validateFormat({ type: 'email' })
  ],
  help_location: [
    validatePresence(true),
  ],
  help_explanation: [
    validatePresence(true),
  ],
  data_url: [
    validateLength({ min: 1 }),
    validateFormat({ type: 'url' })
  ]
};