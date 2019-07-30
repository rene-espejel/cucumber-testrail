// Generated by CoffeeScript 2.4.1
(function() {
  var FILTERS, PARAMS, REQUESTS, RequestManager, Table, TestRailApi;

  Table = require('cli-table');

  PARAMS = ['project_id', 'suite_id', 'section_id', 'testrun_id'];

  FILTERS = ['section_id', 'suite_id'];

  REQUESTS = {
    addPlanEntry: 'add_plan_entry/{{testrun_id}}',
    getCases: 'get_cases/{{project_id}}&suite_id={{suite_id}}&section_id={{section_id}}',
    addResults: 'add_results_for_cases/{{testrun_id}}'
  };

  RequestManager = require('./request_manager');

  TestRailApi = class TestRailApi {
    constructor(config = {}, opts1 = {}, suite_config = {}, metrics = []) {
      this.config = config;
      this.opts = opts1;
      this.suite_config = suite_config;
      this.metrics = metrics;
      this.request_manager = new RequestManager(this.opts);
    }

    * addResults(testrun_id) {
      var testrun_url, url;
      url = this._generateUrl('addResults', {testrun_id});
      yield this.request_manager.send('post', {
        url: url,
        body: {
          results: this.metrics
        }
      });
      testrun_url = `${this.config.testrail_url}/runs/view/${testrun_id}`;
      return console.log(`Successfully added the following results for project symbol ${this.suite_config.project_symbol} to TestRail. Visit ${testrun_url} to access.`);
    }

    * fetchCaseDescriptions() {
      var resp, table;
      // disables section_id filter to return table for entire suite
      this.suite_config.section_id = void 0;
      resp = (yield this.request_manager.send('get', {
        url: this._generateUrl('getCases')
      }));
      table = new Table({
        head: ['Case ID', 'Section ID', 'Title']
      });
      resp.forEach(function({section_id, title, id}) {
        return table.push([id, section_id, title]);
      });
      return console.log(table.toString());
    }

    * fetchCases() {
      var resp;
      resp = (yield this.request_manager.send('get', {
        url: this._generateUrl('getCases')
      }));
      return resp.map(function({id}) {
        return id;
      });
    }

    * generateTestRun(case_ids) {
      var body, resp, url;
      url = this._generateUrl('addPlanEntry');
      body = {
        suite_id: this.suite_config.suite_id,
        name: `Test Run: ${this.opts.runname} - ${(new Date()).toLocaleDateString()}`,
        include_all: false,
        case_ids: case_ids
      };
      console.log("Test Run Name" + body.name);
      resp = (yield this.request_manager.send('post', {url, body}));
      return resp.runs[resp.runs.length - 1].id;
    }

    _generateUrl(type, opts = {}) {
      var action;
      action = REQUESTS[type] || '';
      PARAMS.forEach((key) => {
        if (this.suite_config[key] !== void 0 && opts[key] === void 0) {
          action = action.replace(`{{${key}}}`, this.suite_config[key]);
        }
        if (!(this.suite_config[key] !== void 0 && FILTERS.indexOf(key) !== -1)) {
          action = action.replace(`&${key}={{${key}}}`, '');
        }
        if (opts[key] !== void 0) {
          return action = action.replace(`{{${key}}}`, opts[key]);
        }
      });
      return `${this.config.testrail_url}/api/v2/${action}`;
    }

  };

  module.exports = TestRailApi;

}).call(this);

//# sourceMappingURL=testrail_api.js.map
