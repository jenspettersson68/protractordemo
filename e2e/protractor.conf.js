// @ts-check
// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts
const HEADLESS = process.argv.includes('--headless');
const FIREFOX = process.argv.includes('--firefox');
const CHROME = (FIREFOX && process.argv.includes('--chrome')) || !FIREFOX;
const BROWSERSTACK = process.argv.includes('--browserstack');
const { SpecReporter } = require('jasmine-spec-reporter');
const DEBUG = process.argv.includes('--debug');
const CHROME_BIN = require('puppeteer').executablePath();
var dotEnv = require('dotenv');
const path = require('path');

dotEnv.config({path: path.join(__dirname, '.env')});
/**
 * @type { import("protractor").Config }
 */
const caps = {
  get chrome() {
    // http://chromedriver.chromium.org/capabilities#TOC-chromeOptions-object
    const options = {
    binary: CHROME_BIN,
        args: [
            '--incognito'
        ]
    };
    if (DEBUG) {
      //chrome://inspect/#devices
        options.args.push(
            '--start-maximized',
            '--auto-open-devtools-for-tabs',
            '--log-level=3'
        );
    } else if (HEADLESS) {
        options.args.push(
            '--start-maximized',
             '--headless',
             '--log-level=3',
             '--disable-gpu',
             "--no-sandbox"
        );
    } else {
        options.args.push(
            '--start-maximized'
        );
    }
    return {
        browserName: 'chrome',
        chromeOptions: options
    };
    },
    get firefox() {
      // https://github.com/mozilla/geckodriver#firefox-capabilities
      const options = {
        args : ['--purgecaches', '--private']
      };
      
      if (HEADLESS) {
          options.args.push('--headless');

      }else{}
      return {
          browserName:'firefox',
          'moz:firefoxOptions' : options
      };
  }
  };

 const config = {
  allScriptsTimeout: 11000,
  specs: [
    './src/**/*.e2e-spec.ts'
  ], 

  suites: {
    first : ['./src/app.e2e-spec.ts'],
    second : ['./src/second.e2e-spec.ts'],
    all:   './src/**/*.e2e-spec.ts'
},

  directConnect: true,
  baseUrl: 'http://localhost:4200/',
  framework: 'jasmine',
  multiCapabilities: [],
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    print: function() {}
  },

// https://www.protractortest.org/#/async-await
// Setting this parameter to true will force you to resolve promises by async/await
SELENIUM_PROMISE_MANAGER: true,

  /*capabilities:{
    'browserName' : 'fchrome'
  },*/

  onPrepare() {
    require('ts-node').register({
      project: require('path').join(__dirname, './tsconfig.json')
    });
    jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));
  }
  
};

if (BROWSERSTACK) {
  Object.assign(config, {
      seleniumAddress: 'http://hub-cloud.browserstack.com/wd/hub',
      baseUrl: 'http://localhost:4200/',
      directConnect: false,
      multiCapabilities: [{
          'browserstack.local' : true,
          'browserName' : 'chrome',
          'browserstack.user' : process.env.BROWSERSTACK_USER,
          'browserstack.key': process.env.BROWSERSTACK_PASSWORD,
          'name': 'Bstack-[Protractor] Parallel Test',
          'acceptSslCerts': true
        },{
          'browserName' : 'firefox',
          'browserstack.user' : process.env.BROWSERSTACK_USER,
          'browserstack.key': process.env.BROWSERSTACK_PASSWORD,
          'name': 'Bstack-[Protractor] Parallel Test',
          'browserstack.local': true,
          'acceptSslCerts': true
        },
      ],
  });

} else {
  config.directConnect = true;
  if (FIREFOX) {
      config.multiCapabilities.push(caps.firefox);
  }
  if (CHROME) {
      config.multiCapabilities.push(caps.chrome);
  }
}

exports.config = config;
