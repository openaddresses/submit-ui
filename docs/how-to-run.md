# OpenAddresses Submit-UI: How to Run

This document outlines the details of collaborating on this Ember application.

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM)
* [Bower](http://bower.io/)
* [Ember CLI](http://ember-cli.com/)
* [PhantomJS](http://phantomjs.org/)

## Installation

* `git clone <repository-url>` this repository
* change into the new directory
* `npm install`
* `bower install`

## Set up .env file
* Create a .env file  with `export apiKey=` + the aws key for uploads
* Run `source .env` before serving the app

## Running / Development

* `ember server`
* Visit your app at [http://localhost:4200](http://localhost:4200).

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

* `ember test`
* `ember test --server`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying

The Submit-UI app automatically deploys on [Netlify](https://app.netlify.com/sites/mod). The [production URL](https://mod.netlify.com) deploys from the `master` branch, but it is also possible to view a live site for other branches. The URL for non-master branches is `https://` + branch-name + `--mod.netlify.com`, where you would insert the name of the branch you'd like to view before `--mod.netlify.com`.

Netlify also handles redirects and environment variables for the app. The [.netlifyredirects](.netlifyredirects) file is integrated into the built app by the [ember-cli-netlify](https://github.com/shipshapecode/ember-cli-netlify) Ember addon. [Environment variables](https://app.netlify.com/sites/mod/settings/deploys#build-environment-variables) saved directly on Netlify provide keys for AWS that are necessary for file upload


  

## Further Reading / Useful Links

* [ember.js](http://emberjs.com/)
* [ember-cli](http://ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)