co = require 'co'

TestRailApi = require './testrail_api'

class TestRailService

  constructor: (@config, @suite_config, @opts, @testrail_metrics) ->
    console.log("Opts en TR service: " + @opts.runid + " Run Name: " + @opts.runname)
    @api = new TestRailApi @config, @opts, @suite_config, (@testrail_metrics[@suite_config.project_symbol] or [])

  fetchScenarios: co.wrap ->
    yield @api.fetchCaseDescriptions()


  sendTestResults: co.wrap ->
    runid = @opts.runid
    console.log("Run Id: " + runid)
    case_ids = yield @api.fetchCases()
    testrun_id = yield @api.generateTestRun case_ids
    console.log("Test Run Id: " + testrun_id)
    yield @api.addResults testrun_id

module.exports = TestRailService
