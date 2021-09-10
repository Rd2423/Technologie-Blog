const seedUsers = require('./user-seeds');
const sequelize = require('../config/connection')

const seedAll = async () => {
    await sequelize.sync({force: false});
    await seedUsers();
    process.exit(0);
}
seedAll();