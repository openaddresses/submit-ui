# UI/UX Flow

This document explains the general Submit-UI app structure and flow.

The Submit-UI app is set up to allow the user to proceed forward through the application only once they have provided the answers to required questions. The user can navigate backwards in the app at any time.

The [ember-changeset-validations](https://github.com/poteto/ember-changeset-validations) Ember addon is used to validate inputs where a specific type or format of answer is necessary.

## Help

The "Help" option is available during every step. If the user has trouble contributing a source, they have the option to fill out the help form, which will create an issue on the [OpenAddresses repositiory](https://github.com/openaddresses/openaddresses/issues). 

## Step 1: Intro  

* the `/intro` application route

The user can contribute authoritative address data using either a file or a URL. If a URL is provided, it is sent to the OpenAddresses `sample` service. The `/sample` response is used to create a `web-service-response` model record, with information that is later used to display sample rows to the user and ask the user the right questions about the data. 

If the user provideds a file, it is uploaded to an aws bucket, and that endpoint is used in the `sample` request.

## Step 2: Data Information 

* the `more-info` application route

The user is required to answer questions about frequency of update, data license, and attribution. 

If the data has a license, the user can choose from a list of common license, or provide a link to a different license. The user can also mark whether the license is share-alike. 

If the license requires attribution, the user can provide text for attribution.

## Step 3: Data format 

* the `/data-format` application route

In this step, the user is asked to match their data to the OpenAddresses schema. House number and street are required (as well as lat and lon for .csv files), but the user may also provide information about unit, city, district, region, and postcode.

The dropdown menu shows the fields offered by the user's data. Once the user selects a field for each category, sample rows are displayed in the table (which can be expanded to view additional sample rows by clicking "See More"). The user can choose to perform a number of functions to help their data accurately match the OpenAddresses schema. The same regex is performed on these sample rows to show the user what the data will look like once it has been processed by OpenAddresses.

## Step 4: Contact 

* the `/contact` application route

The user is required to provide an email address to OpenAddresses.

## Step 5: Review 

* the `/review` application route

The user can review the information they will be submitting. They can click "edit" to return to any step and edit that information, click "cancel" to cancel the submission and start over, or click "submit". 

When the user clicks "submit", the information they have provided (which has been recorded in a `submission` model record) is used to format a request to the OpenAddresses `/submit` service. If the `submit` service returns an error, the user will be alerted. If there is a successful response, the user is routed to the `/success` step.

## Step 6: Success 

* the `/success` application route

A success message lets the user know that they have successfully submitted their data to OpenAddresses. The message includes a link to the pull request that the `submit` service created on the OpenAddresses repository.

