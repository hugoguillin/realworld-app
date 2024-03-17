const { defineConfig } = require("cypress");
const cypressSplit = require("cypress-split");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000/#",
    watchForFileChanges: false,
    experimentalRunAllSpecs: true,
    setupNodeEvents(on, config) {
      require("@cypress/grep/src/plugin")(config);
      cypressSplit(on, config);
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
