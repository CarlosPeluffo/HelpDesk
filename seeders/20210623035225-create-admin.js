'use strict';
const bcrypt=require('bcrypt');
const moment=require('moment');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    var c = 123456789;
    var password = c.toString();
    var salt = await bcrypt.genSalt(10);
    var contraseña = await bcrypt.hash(password, salt);
    var admin =[{
      dni: 1,
      id_area: 1,
      nombre: "Administrador",
      apellido: "Administrador",
      mail: "admin@admin.com",
      contraseña: contraseña,
      celular: null,
      estado: true,
      fecha_creacion: moment(new Date).format("YYYY-MM-DD"),
    }];
    await queryInterface.bulkInsert('empleados', admin, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('empleados', null, {});
  }
};
