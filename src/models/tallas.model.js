// models/tallas.model.js
import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

/**
 * Modelo de Tallas
 * Representa las tallas disponibles para productos
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
      field: 'IdTalla',
      comment: 'Identificador único de la talla'
    },

    Nombre: {
      type: DataTypes.STRING(50),
      allowNull: false,
      // ⚠️ unique: true,  // Comentado para evitar error con sync({ alter: true }) en PostgreSQL
      // ✅ La restricción UNIQUE debe agregarse mediante migración:
      //    await queryInterface.addConstraint('Tallas', { fields: ['Nombre'], type: 'unique' });
      field: 'Nombre',
      comment: 'Nombre de la talla (S, M, L, XL, etc)',
      validate: {
        notEmpty: {
          msg: 'El nombre de la talla es requerido'
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
      comment: 'Cantidad disponible de esta talla',
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
    freezeTableName: true,
    indexes: [
      {
        unique: true,
        fields: ['Nombre'],
        name: 'Tallas_Nombre_unique'
      }
    ]
  }
);

export default Talla;