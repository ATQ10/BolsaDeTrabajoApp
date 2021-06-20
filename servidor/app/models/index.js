const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: 0, // change this to zero

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.aspirante = require("./aspirante.model.js")(sequelize, Sequelize);
db.empresa = require("./empresa.model.js")(sequelize, Sequelize);
db.apermiso = require("./apermiso.model.js")(sequelize, Sequelize);
db.vacante = require("./vacante.model.js")(sequelize, Sequelize);
db.solicitud = require("./solicitud.model.js")(sequelize, Sequelize);

module.exports = db;