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
    dialect: 'mysql'
})

export default db