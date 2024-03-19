const { defineConfig } = require("cypress");
const cypressSplit = require("cypress-split");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000/#",
    watchForFileChanges: false,
    experimentalRunAllSpecs: true,
    reporter: "cypress-mochawesome-reporter",
    reporterOptions: {
      charts: true,
      reportTitle: "Bico Cypress test report",
      embeddedScreenshots: true,
      inlineAssets: true,
    },
    setupNodeEvents(on, config) {
      const fixedOn = require("cypress-on-fix")(on);
      require("@cypress/grep/src/plugin")(config);
      cypressSplit(fixedOn, config);
      require("cypress-mochawesome-reporter/plugin")(fixedOn);
      return config;
    },
  },
  env: {
    apiUrl: "http://localhost:3001/api",
    email: "cypress@realworld.com",
    password: "cypress@realworld.com",
    username: "cypress-user",
    grepFilterSpecs: true,
    grepOmitFiltered: true,
  },
});
