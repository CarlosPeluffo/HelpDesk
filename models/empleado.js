'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Empleado extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    Empleado.belongsTo(models.Area,{foreignKey: "id_area", 
    onDelete: "CASCADE"});
    Empleado.hasMany(models.Historial,{foreignKey: "dni_empleado"});
    }
  };
  Empleado.init({
    dni:{type: DataTypes.INTEGER,
      primaryKey: true},
    id_area: DataTypes.INTEGER,
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
    modelName: 'Empleado',
    tableName: 'empleados',
  });
  return Empleado;
};