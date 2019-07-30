// Generated by CoffeeScript 2.4.1
(function () {
    var ConfigReader, REQUIRED_CONFIG_FIELDS, _,
        indexOf = [].indexOf;

    _ = require('lodash');

    require('require-yaml');

    REQUIRED_CONFIG_FIELDS = ['project_id', 'project_symbol'];

    // Reads and validates the configuration file for this tool
    ConfigReader = class ConfigReader {
        constructor(config_file = {}) {
            this.config_file = config_file;
        }

        parse() {
            var config, ref;
            config = require(`${this.config_file}`);
            config.suites = ((ref = config.suites) != null ? ref.map(function ({suite}) {
                return suite;
            }) : void 0) || [];
            this._validateConfig(config);
            config.symbols = config.suites.map(function ({project_symbol}) {
                return project_symbol;
            });
            return config;
        }

        _validateConfig(config) {
            if (!config.testrail_url) {
                throw new Error('cucumber_testrail.yml is missing testrail_url');
            }
            if (!config.suites.length) {
                throw new Error('cucumber_testrail.yml is missing suites');
            }
            return config.suites.forEach(function (config, index) {
                var missingFields, params;
                params = Object.keys(config);
                missingFields = _.compact(REQUIRED_CONFIG_FIELDS.map(function (field) {
                    if (indexOf.call(params, field) < 0) {
                        return field;
                    }
                }));
                if (!missingFields.length) {
                    return;
                }
                throw new Error(`cucumber_testrail.yml is missing these required fields for suite ${index + 1}: ${missingFields}`);
            });
        }

    };

    module.exports = ConfigReader;

}).call(this);

//# sourceMappingURL=config_reader.js.map
