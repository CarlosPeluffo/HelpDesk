'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Solicitudes', {
      id_solicitud: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      dni_cliente: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'clientes', //tabla que se crea
          },
          key: 'dni', //PK en la tabla referenciada
        },
        allowNull: false,
        onDelete: 'CASCADE',
      },
      detalle: {
        type: Sequelize.STRING,
        allowNull:false,
      },
      tipo: {
        type: Sequelize.STRING
      },
      fecha_solicitud: {
        type: Sequelize.DATE,
        allowNull: false
      },
      prioridad: {
        type: Sequelize.STRING
      },
      nro_ticket: {
        type: Sequelize.INTEGER,
        unique: true
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
    await queryInterface.dropTable('Solicitudes');
  }
};