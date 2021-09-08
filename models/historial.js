'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Historial extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Historial.belongsTo(models.Area,{foreignKey: "id_area"});
      Historial.belongsTo(models.Solicitud,{foreignKey: "id_solicitud"});
      Historial.belongsTo(models.Empleado,{foreignKey: "dni_empleado"});
      //Bloque Notificacion
      Historial.hasMany(models.Notificacion,
        {foreignKey:"fecha_ingreso_historial"}
      );
      Historial.hasMany(models.Notificacion,
        {foreignKey:"id_area_historial"}
      );
      Historial.hasMany(models.Notificacion,
        {foreignKey:"id_solicitud_historial"}
      );

    }
  };
  Historial.init({
    fecha_ingreso:{type: DataTypes.DATE,
      primaryKey: true},
    id_area: DataTypes.INTEGER,
    id_solicitud: DataTypes.INTEGER,
    fecha_egreso: DataTypes.DATE,
    dni_empleado: DataTypes.INTEGER,
    estado: DataTypes.STRING,
    detalle_razon: DataTypes.STRING,
    detalle_solucion: DataTypes.STRING
  },{
    sequelize,
    modelName: 'Historial',
    tableName: 'historial',
  });
  return Historial;
};