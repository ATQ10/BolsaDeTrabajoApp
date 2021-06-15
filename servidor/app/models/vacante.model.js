module.exports = (sequelize, Sequelize) => {
    const Vacante = sequelize.define("vacante", {
      idEmpresa: {
        type: Sequelize.STRING
      },
      puesto: {
        type: Sequelize.STRING
      },
      tipo: {
        type: Sequelize.STRING
      },
      cantidad: {
        type: Sequelize.STRING
      },
      fecha_vigencia: {
        type: Sequelize.STRING
      },
      p1: {
        type: Sequelize.STRING(500)
      },
      p2: {
        type: Sequelize.STRING(500)
      },
      p3: {
        type: Sequelize.STRING(500)
      },
      p4: {
        type: Sequelize.STRING(500)
      },
      p5: {
        type: Sequelize.STRING(500)
      }
    });
    return Vacante;
};