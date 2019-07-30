co = require 'co'

TestRailApi = require './testrail_api'

class TestRailService

  constructor: (@config, @suite_config, @opts, @testrail_metrics) ->
    @testRunId = @opts.runId
    console.log("Asignacion TestRunId" + @testRunId)
    @api = new TestRailApi @config, @opts, @suite_config, (@testrail_metrics[@suite_config.project_symbol] or [])


  fetchScenarios: co.wrap ->
    yield @api.fetchCaseDescriptions()


  sendTestResults: co.wrap ->
    case_ids = yield @api.fetchCases()
    if @testRunId
      testrun_id = yield @api.generateTestRun case_ids
    else
      testrun_id = @testRunId
    yield @api.addResults testrun_id

module.exports = TestRailService
