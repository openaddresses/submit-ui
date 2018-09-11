# How to contribute

Thanks for your interest in contributing to the Submit-UI app! We welcome contributions in the form of issues and pull requests. If you have a suggestion for an improvement, or you've noticed an error or bug, we'd love to hear about it -- please [create a github issue](https://github.com/openaddresses/submit-ui/issues/new) with any relevant information, including screenshots if it involves the UI. We will do our best to review your issue and either fix or add the feature(s) to our plan.

## Development

### Getting started

If you'd like to contribute to development, but are unsure where to start, look for issues with the [Help Wanted](https://github.com/openaddresses/submit-ui/labels/Help%20Wanted) label.

Once you've selected an issue to work work on, create a new branch and add a comment and the `in progress` label to the issue. Use the issue comments for discussion about questions, requirements, or blockers as well.

For information on running the app locally, please see [How to run](docs/how-to-run.md).

### Tests

Circle CI is configured to run tests on GitHub, so when you open a pull request, tests will run automatically. 

To run the test suite locally, use `ember test` from the project root.

## Submitting a Pull Request

Before submitting a pull request, please make sure all tests pass by running `ember test` locally. In your pull request description, mention `closes #[issue number]`, and please include details about the changes your pull request will make. If your pull request will impact the UI, please include a screenshot to show how your changes will look.