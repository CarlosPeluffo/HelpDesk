'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Empleados', {
      dni: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_area:{
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'areas', //tabla que se crea
          },
          key: 'id_area', //PK en la tabla referenciada
        },
        onDelete: 'CASCADE',
      },
      nombre: {
        type: Sequelize.STRING,
        allowNull: false
      },
      apellido: {
        type: Sequelize.STRING,
        allowNull: false
      },
      mail: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      },
      contraseña: {
        type: Sequelize.STRING,
        allowNull: false
      },
      celular: {
        type: Sequelize.BIGINT
      },
      estado: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      fecha_creacion: {
        type: Sequelize.DATEONLY,
        //type: Sequelize.DATE,
        allowNull: false
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
    await queryInterface.dropTable('Empleados');
  }
};

/*
await queryInterface.addIndex('Empleados', ['Id_area']);
Promesas
return queryInterface.createTable('Item', {
    // columns...
}).then(() => queryInterface.addIndex('Item', ['OwnerId']))
.then(() => {
    // perform further operations if needed
});
*/ 