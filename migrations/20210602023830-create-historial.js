'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Historial', {
      fecha_ingreso: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.DATE
      },
      id_area:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        references:{
          model:{
            tableName: "areas",
          },
          key: "id_area",
        },
        allowNull: false,
        onDelete: "CASCADE",
      },
      id_solicitud:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        references:{
          model:{
            tableName: "solicitudes",
          },
          key: "id_solicitud",
        },
        allowNull: false,
        onDelete: "CASCADE",
      },
      fecha_egreso: {
        type: Sequelize.DATE
      },
      dni_empleado:{
        type: Sequelize.INTEGER,
        references:{
          model:{
            tableName: "empleados",
          },
          key: "dni",
        },
      },
      estado: {
        type: Sequelize.STRING
      },
      detalle_razon: {
        type: Sequelize.STRING
      },
      detalle_solucion: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Historial');
  }
};