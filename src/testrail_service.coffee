co = require 'co'

TestRailApi = require './testrail_api'

class TestRailService

  constructor: (@config, @suite_config, @opts, @testrail_metrics) ->
#    @api = new TestRailApi @config, @opts, @suite_config, (@testrail_metrics[@suite_config.project_symbol] or [])
    @api = new TestRailApi @config, @opts, @suite_config, @testrail_metrics

  sendTestResults: co.wrap ->
    case_ids = yield @api.fetchCases()
    if @opts.newrun == true
      testrun_id = yield @api.generateTestRun case_ids, @opts.runid
    else
      testrun_id = @opts.runid
    yield @api.addResults testrun_id

  sendResultsPerCase: co.wrap ->
    testrun_id = @opts.runid
    yield @api.addResultsPerCase testrun_id

module.exports = TestRailService
