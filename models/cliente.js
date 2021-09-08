'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cliente extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cliente.hasMany(models.Solicitud,{foreignKey: "dni_cliente",});
    }
  };
  Cliente.init({
    dni:{type: DataTypes.INTEGER,
      primaryKey: true},
    nombre: DataTypes.STRING,
    apellido: DataTypes.STRING,
    mail: DataTypes.STRING,
    celular: DataTypes.BIGINT,
    contraseña: DataTypes.STRING,
    estado: DataTypes.BOOLEAN,
    fecha_creacion: DataTypes.DATEONLY
    //fecha_creacion: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Cliente',
    tableName: 'clientes',
  });
  return Cliente;
};