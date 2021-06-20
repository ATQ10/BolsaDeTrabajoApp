module.exports = (sequelize, Sequelize) => {
    const Solicitud = sequelize.define("solicitud", {
      idAspirante: {
        type: Sequelize.STRING
      },
      idEmpresa: {
        type: Sequelize.STRING
      },
      nombreAspirante: {
        type: Sequelize.STRING
      },
      apellidoAspirante: {
        type: Sequelize.STRING
      },
      nombreEmpresa: {
        type: Sequelize.STRING
      },
      puesto: {
        type: Sequelize.STRING
      },
      fecha_vigencia: {
        type: Sequelize.STRING
      },
      tipo: {
        type: Sequelize.STRING
      },
      respuesta: {
        type: Sequelize.STRING
      },
      estado: {
        type: Sequelize.STRING
      }
    });
    return Solicitud;
};