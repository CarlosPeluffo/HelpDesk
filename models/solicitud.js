'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Solicitud extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Solicitud.belongsTo(models.Cliente, {foreignKey: "dni_cliente",
      onDelete: "CASCADE",});
      Solicitud.belongsToMany(models.Area, {
        through: "Historial",
        foreignKey: "id_solicitud",
      })
    }
  };
  Solicitud.init({
    id_solicitud:{type: DataTypes.INTEGER,
      primaryKey:true},
    dni_cliente: DataTypes.INTEGER,
    detalle: DataTypes.STRING,
    tipo: DataTypes.STRING,
    fecha_solicitud: DataTypes.DATE,
    prioridad: DataTypes.STRING,
    nro_ticket: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Solicitud',
    tableName: 'solicitudes',
  });
  return Solicitud;
};