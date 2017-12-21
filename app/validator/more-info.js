import { validateLength, validateFormat } from 'ember-changeset-validations/validators';

export default {
  user_submitted_url: [
    validateFormat({ type: 'url' })
  ],
  attribution_text: [
    validateLength({ min: 1 })
  ]
};