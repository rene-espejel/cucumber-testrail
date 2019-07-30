// Generated by CoffeeScript 2.4.1
(function() {
  var ConfigReader, CucumberResultReader, OptionsReader, TestRailService, co;

  co = require('co');

  ConfigReader = require('./config_reader');

  CucumberResultReader = require('./cucumber_result_reader');

  OptionsReader = require('./options_reader');

  TestRailService = require('./testrail_service');

  co(function*() {
    var config, config_reader, cucumber_reader, e, options_reader, opts, testrail_metrics;
    try {
      // holds options passed in by CLI
      opts = {};
      // holds information from cucumber_testrail.yml
      config = [];
      // contains testrail scenarios from cucumber in testrail format
      testrail_metrics = [];
      options_reader = new OptionsReader();
      opts = options_reader.parse();
      config_reader = new ConfigReader(opts.config);
      config = config_reader.parse();
      cucumber_reader = new CucumberResultReader(config, opts.result);
      testrail_metrics = (yield cucumber_reader.parse());
      return (yield Promise.all(config.suites.map((suite_config) => {
        var testrail_service;
        testrail_service = new TestRailService(config, suite_config, opts, testrail_metrics);
        return testrail_service.sendTestResults();
      })));
    } catch (error) {
      e = error;
      return console.log(`${e}`);
    }
  });

}).call(this);

//# sourceMappingURL=index.js.map
