# OpenAddresses Submit-UI
#### In partnership with [Portland TriMet](https://trimet.org/)

The Submit-UI application is an Ember app that allows anyone to contribute data to the [OpenAddresses](https://openaddresses.io/) database, a collection of authoritative data for address locations around the world. It guides the user through a process that gathers the necessary information OpenAddresses needs to accept new data, and then allows the user to review and submit that information along with the data they would like to contribute.

Previously, submitting data required some familiarity with GitHub; the options were to either inform the OpenAddresses team about an existing dataset via an issue, or to submit a pull request with the data, which required knowing how to work with JSON.

The goal for the Submit-UI app is to make it easier for anyone to contribute data to OpenAddresses. It does not require familiarity with GitHub or JSON; the application works with the OpenAddresses `submit` service to properly format and submit a pull request on the user's behalf. If the user experiences difficulty submitting using the app, they can alternatively fill out the Help form, which creates an issue in the OpenAddresses repository.

## Further information
- [How to Contribute to Submit-UI](CONTRIBUTING.md)
- [System Setup](docs/how-to-run.md)
- [App structure and UI/UX flow](ui-ux-flow.md)


