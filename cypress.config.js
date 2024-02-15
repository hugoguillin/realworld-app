const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000/#",
    watchForFileChanges: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  env: {
    apiUrl: "http://localhost:3001/api",
    email: "safdsad@dasfd.com",
    password: "safdsad@dasfd.com",
    username: "cypress-user",
  },
});
