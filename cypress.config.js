const { defineConfig } = require("cypress");

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
      require("cypress-split")(fixedOn, config);
      require("cypress-mochawesome-reporter/plugin")(fixedOn);

      // Delete videos if spec passed and no retries
      fixedOn("after:spec", (spec, results) => {
        if (results && results.video) {
          // Do we have failures for any retry attempts?
          const failures = results.tests.some((test) =>
            test.attempts.some((attempt) => attempt.state === "failed")
          );
          if (!failures) {
            // delete the video if the spec passed and no tests retried
            fs.unlinkSync(results.video);
          }
        }
      });
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
