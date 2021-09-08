'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Notificacion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Notificacion.belongsTo(models.Historial, 
        {foreignKey:"fecha_ingreso_historial"});
      Notificacion.belongsTo(models.Historial, 
        {foreignKey:"id_area_historial"});
      Notificacion.belongsTo(models.Historial, 
        {foreignKey:"id_solicitud_historial"});
    }
  };
  Notificacion.init({
    id_notificacion:{type: DataTypes.INTEGER,
      primaryKey: true,
    },
    fecha: DataTypes.DATE,
    fecha_ingreso_historial: DataTypes.DATE,
    id_area_historial: DataTypes.INTEGER,
    id_solicitud_historial: DataTypes.INTEGER,
    descripcion: DataTypes.STRING,
    estado: DataTypes.STRING
  },{
    sequelize,
    modelName: 'Notificacion',
    tableName: 'notificaciones',
  });
  return Notificacion;
};