// Generated by CoffeeScript 2.4.1
(function() {
  var TestRailApi, TestRailService, co;

  co = require('co');

  TestRailApi = require('./testrail_api');

  TestRailService = (function() {
    class TestRailService {
      constructor(config, suite_config, opts, testrail_metrics) {
        this.config = config;
        this.suite_config = suite_config;
        this.opts = opts;
        this.testrail_metrics = testrail_metrics;
        this.api = new TestRailApi(this.config, this.opts, this.suite_config, this.testrail_metrics[this.suite_config.project_symbol] || []);
      }

    };

    TestRailService.prototype.sendTestResults = co.wrap(function*() {
      var case_ids, testrun_id;
      case_ids = (yield this.api.fetchCases());
      if (this.opts.newrun === true) {
        testrun_id = (yield this.api.generateTestRun(case_ids, this.opts.runid));
      } else {
        testrun_id = this.opts.runid;
      }
      return (yield this.api.addResults(testrun_id));
    });

    return TestRailService;

  }).call(this);

  module.exports = TestRailService;

}).call(this);

//# sourceMappingURL=testrail_service.js.map
