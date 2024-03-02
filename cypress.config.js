const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000/#",
    watchForFileChanges: false,
    experimentalRunAllSpecs: true,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  env: {
    apiUrl: "http://localhost:3001/api",
    email: "cypress@realworld.com",
    password: "cypress@realworld.com",
    username: "cypress-user",
  },
});
