# Cucumber TestRail

Post Cucumber Results on TestRail!

## Setup

Preconditions

* [Cucumber](https://cucumber.io/docs#cucumber-implementations)
* [TestRail](http://www.gurock.com/testrail/)

Setup on TestRail
--

1) Create New Project and enter project overview. The last number in the resulting url is your *project_id*

2) Navigate to *Test Cases* tab

3) Generate a new section and add test cases for your suite

4) Navigate to *Test Runs & Results* tab

5) Click on *Add Test Plan* or *Add Test Run* Button

6) Give your test plan or run a name. The last number in the resulting url is your *runId*

Setup on Your Project
--

1) Add a `cucumber_testrail.yml` file to your root directory containing the following information:
  ```
  testrail_url: "https://yourtestrailurlhere.testrail.net/index.php?"

  suites:

    - suite:
        project_id: [your project_id]
        project_symbol: 'SYM'
        suite_id: (optional) 1
        section_id: (optional) [your section_id (not exposed on the UI but is sequential so starts with 1)]
  ```
  In this configuration, you will have one suite. Tags with the SYM symbol in your cucumber tags will correlate with this TestRail suite.

2) This command will publish the results to testrail:
  ```
  ./node_modules/.bin/cucumber-testrail -c /absolute/path/to/cucumber_testrail.yml -r /path/to/cucumber/results -u $TESTRAIL_USERNAME -p $TESTRAIL_PASSWORD -i runId/planId -n newTestRun -t 'Test Run Name'
  ```
  * -c absolute path to cucumber_testrail.yml (required)
  * -r path to cucumber execution results (required)
  * -u TestRail username (required)
  * -p TestRail password (required)
  * -i Test Run or Test Plan Id (required)
  * -n New Test Run, when this option is set to true a Test Plan Id is required on -i and a Test Run name is required on -t.
  * -t Test Run name, will be added on your generated Test Run in this format: *Test Run: (specified name) - MM/dd/yyy*

4) Write Cucumber Tests with proper TestRail tags!
  In order to add feature tests that correlate with the above sample suite, add the following tag to the top of your scenario:
  ```
    @TestRail-SYM-1
    Scenario: Logging in to the Application
  ```
  In this example, this scenario maps to case_id 1 from your SYM test suite

Reporting via NPM
-----------------
If you use a CI tool or you just want the ability to run ad hoc, you can always add a new script to package.json
and execute it via NPM anywhere.

Add a new script package.json like:
```json
    "scripts": {
        "report": "cucumber-testrail -c /absolute/path/to/cucumber_testrail.yml -r /path/to/cucumber/results -u $TESTRAIL_USERNAME -p $TESTRAIL_PASSWORD -i runId/planId -n newTestRun -t 'Test Run Name'"
    }
```