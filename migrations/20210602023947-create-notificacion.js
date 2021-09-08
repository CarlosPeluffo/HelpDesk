'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Notificaciones', {
      id_notificacion: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fecha_ingreso_historial:{
        type: Sequelize.DATE,
        references:{
          model:{
            tableName: "historial",
          },
          key: "fecha_ingreso",
        },
        allowNull: false,
        onDelete: "CASCADE",
      },
      id_area_historial:{
        type: Sequelize.INTEGER,
        references:{
          model:{
            tableName: "historial",
          },
          key: "id_area",
        },
        allowNull:false,
        onDelete: "CASCADE",
      },
      id_solicitud_historial:{
        type: Sequelize.INTEGER,
        references:{
          model:{
            tableName: "historial",
          },
          key: "id_solicitud",
        },
        allowNull:false,
        onDelete: "CASCADE",
      },
      fecha: {
        type: Sequelize.DATE,
        allowNull: false
      },
      descripcion: {
        type: Sequelize.STRING
      },
      estado: {
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
    await queryInterface.dropTable('Notificaciones');
  }
};