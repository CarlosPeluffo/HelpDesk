'use strict';
const moment=require('moment');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    var areas=[
      {nombre_area: "Gestion",
      createdAt: moment(new Date).format("YYYY-MM-DD"),
      updatedAt: moment(new Date).format("YYYY-MM-DD")},
      {nombre_area: "Help Desk",
      createdAt: moment(new Date).format("YYYY-MM-DD"),
      updatedAt: moment(new Date).format("YYYY-MM-DD")},
      {nombre_area: "Calidad",
      createdAt: moment(new Date).format("YYYY-MM-DD"),
      updatedAt: moment(new Date).format("YYYY-MM-DD")},
    ]
    await queryInterface.bulkInsert('areas', areas, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('areas', null, {});
  }
};
