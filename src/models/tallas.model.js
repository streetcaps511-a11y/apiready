// models/tallas.model.js
import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

/**
 * Modelo de Tallas
 * @table Tallas
 */
const Talla = sequelize.define(
  'Talla',
  {
    IdTalla: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      field: 'IdTalla'
    },

    Nombre: {
      type: DataTypes.STRING(50),
      allowNull: false,
      field: 'Nombre',
      validate: {
        notEmpty: {
          msg: 'El nombre es requerido'
        },
        len: {
          args: [1, 50],
          msg: 'El nombre debe tener entre 1 y 50 caracteres'
        }
      }
    },

    Cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      field: 'Cantidad',
      validate: {
        min: {
          args: [0],
          msg: 'La cantidad no puede ser negativa'
        }
      }
    }
  },
  {
    tableName: 'Tallas',
    timestamps: false,
    freezeTableName: true
  }
);

export default Talla;