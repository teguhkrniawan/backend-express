import { Sequelize } from "sequelize";
/**
 * Sequalisze(
 *  'nama_db'
 *  'username'
 *  'password'
 * )
 */
const db = new Sequelize('auth_db', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    dialectOptions: {
        useUTC: false,
    },
    timezone: '+07:00'
})

export default db