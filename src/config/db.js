// src/config/db.js
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

export const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'postgres',
        logging: false, // o console.log para ver queries en desarrollo
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false // Requerido por Aiven
            }
        },
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
);

export const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ PostgreSQL conectado');
    } catch (error) {
        console.error('❌ Error de conexión:', error);
        throw error;
    }
};