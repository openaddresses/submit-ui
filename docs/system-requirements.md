#
# ***DRAFT***
# 

# OpenAddresses Data Management Tools

## Actors
 * Submitter: user working through the data submission process
 * Maintainer: user whose email is specified in the point of contact of the original submission
 
## Requirements

### Submission
Submitter should be prompted for the following required items in order to make a submission.
 * license/terms-of-use for the data being submitted
 * source of the data, such as the name of the county office or transit agency _(not clear what this means exactly, or if it should be required)_ 
 * point of contact email (should be verified, optionally a backup email in case the first is unresponsive in the future)
 * data, which can be provided in several ways, each of which will be detailed out in separate sections of this document
    * direct upload
    * ArcGIS server link
    * other types of download links, for example to zip files
 * maintenance schedule and strategy
    * direct upload: specify frequency of data updates, which will dictate how often update emails are sent to maintainers
    * ArcGIS server link: specify frequency of data update, however no future manual intervention necessary unless the source is broken
    * other types of download links: specify frequency of data update, however no future manual intervention necessary unless the source is broken
 * column/property mappings to OA schema
    * optional parsing strategies for each column/property
    
    
### Submission Verification and Feedback
During and after the submission process, there should be sufficient feedback to 
the submitter to indicate errors and progress. The following is a list of the minimum required pieces of feedback, in no particular order.
 * successful upload, download, or connection to server (could show snippet of the downloaded data to put the submitter at ease) 
 * successful geospatial mapping of the address geometries (could be a dots-on-a-map view of the submission)
 * successful property parsing for each column/property (could show sample values from each column as before-and-after pairs)
 * successful email Verification
 * final preview before submission is completed
 * post-submission thank you and verification email to maintainer(s) with maintenance instructions
 
### Maintenance 
 * periodic emails should be sent to maintainer(s) with data refresh instructions
 * maintainer should have the ability to perform the following functions:
    * upload latest data using the same parameters specified during original submission
    * edit parameters specified during original submission
      * maintainer can either upload new data or not at this point
    * update maintenance strategy or timing
    * no update is available at this time 
    * no future updates available (deprecated source)

### User Environment
 * **TBD:** determine operating system / browser combinations that are critical to provide support for
 * **TBD:** determine most common data file formats that must be supported (csv, shapefile, pbf, etc)
    * think through encoding issues, since it is a global dataset
    