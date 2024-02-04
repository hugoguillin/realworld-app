"use strict";

const { User } = require("../models");
const { faker } = require('@faker-js/faker');

module.exports = {
  async up(queryInterface, Sequelize) {
    const users = await User.findAll();

    const articles = Array(55)
      .fill(null)
      .map((_, index) => ({
        slug: faker.lorem.slug({min: 3, max: 5}),
        title: faker.lorem.sentence({min: 7, max: 10}),
        description: faker.lorem.sentence({min: 10, max: 15}),
        body: faker.lorem.paragraphs({min: 4, max: 6}),
        userId: users[Math.floor(Math.random() * users.length)].id,
        createdAt: faker.date.anytime(),
        updatedAt: faker.date.recent({days: 7}),
      }));

    await queryInterface.bulkInsert("Articles", articles, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Articles", null, {});
  },
};
