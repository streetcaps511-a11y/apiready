// server.js
import app from './src/app.js';
import { connectDB, sequelize } from './src/config/db.js'; // ✅ Importar sequelize también
import dotenv from 'dotenv';

// ✅ IMPORTAR TODOS LOS MODELOS (obligatorio para que Sequelize los registre)
import './src/models/usuarios.model.js';
import './src/models/estado.model.js';      // ⚠️ Ajusta la ruta según tu estructura
import './src/models/tallas.model.js';      // ⚠️ Ajusta la ruta según tu estructura
// import './src/models/productos.model.js'; // Agrega el resto de modelos...

dotenv.config();

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    
    console.log('   🚀 STREETCAPS API');
    
    try {
        // 1. Conectar a la base de datos
        await connectDB();
        console.log(`   📡 Servidor: http://localhost:${PORT}`);
        
        // 2. ✅ Sincronizar modelos con la BD (crear tablas si no existen)
        // alter: true -> Actualiza tablas sin borrar datos existentes
        // force: false -> NO elimina tablas (seguro para producción)
        await sequelize.sync({ alter: true, force: false });
        console.log(`   🗄️  Base de datos: ✅ Sincronizada`);
        
        console.log(`   ⚡ Estado:    ✅ Corriendo`);
        console.log(`   📁 Entorno:   ${process.env.NODE_ENV || 'development'}`);
        
        // 3. Iniciar servidor
        app.listen(PORT, () => {});
        
    } catch (error) {
        console.log(`   ⚡ Estado:    ❌ Error: ${error.message}`);
        console.error('❌ Detalle del error:', error);
        process.exit(1);
    }
};

startServer();