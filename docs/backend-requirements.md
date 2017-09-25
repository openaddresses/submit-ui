# Backend Requirements for OpenAddresses Data Management Tool

## Query for list of countries
[Machine issue #664](https://github.com/openaddresses/machine/issues/664)

### Query type: GET
### Parameters 
- none
### Response 
- 200
- JSON array of alpha-2 country codes
### Side effects:
- none

## Query for list of regions within a country
[Machine issue #664](https://github.com/openaddresses/machine/issues/664)

### Query type: GET
### Parameters 
- country: value should be any alpha-2 country code
### Response
- 200
- JSON array of region two-letter region codes
### Side effects
- none

## Retrieve list of existing sources for specified region
### Query type: GET
### Parameters 
- region: value should be a two-letter region code
### Response 
- 200
- JSON array of existing source information (job ID, name)
### Side effects
- none

## Start new job
### Query type: POST
### Parameters
- region
- data type
- frequency of update
- source name
- data 
  - download link (e.g. link to .zip file)
  - link to ArcGIS server
  - direct upload (JSON)
### Response
- 200
- Job ID
### Side effects
- Job begins processing data

## Retrieve all job information
### Query type: GET
### Parameters 
- Job ID: Job ID number for an existing source
### Response 
- 200 
- JSON array of available source metadata
  - Frequency of data update
  - Data source
  - License
  - Data schema
  - Column mapping
  - Link to data preview
  - Link to map preview
  - Maintainer information (include?)
### Side effects
- none

## Retrieve OA schema
[Machine issue #665](https://github.com/openaddresses/machine/issues/665)

### Query type: GET
### Parameters
- none
### Response
- 200
- available properties
- for each property, available parsing functions (i.e. address -> [house,street])
### Side effects
- none

## Update job
### Query type: POST
### Parameters
- JSON with any changes to: 
  - Frequency of data update
  - Data source
  - License
  - Data schema
  - Column mapping
  - Maintainer information
### Response
- 200
- JSON array of source metadata (do we want to return the updated data immediately?)
### Side Effects
- kicks off preview build

## Query for job status
### Query type: GET
### Parameters
- Job ID
### Response
- 200
- Preview status
  - if preview is ready, provide links to map and sample parsed data
- Source validity
  - If source is not valid, return errors
### Side effects
- none

## Job update of submission status
### Query type: POST
### Parameters
- submission status (will be set to "ready" after user hits submit in preview page)
### Response
- 200
### Side effects
- send email to maintainer to acknowledge submission and provide links for updating the data in the future (also include links to preview map and sample data download)