module.exports = (sequelize, Sequelize) => {
    const Empresa = sequelize.define("empresa", {
      nombre: {
        type: Sequelize.STRING
      },
      encargado: {
        type: Sequelize.STRING
      },
      fecha_fundacion: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      domicilio: {
        type: Sequelize.STRING
      },
      telefono: {
        type: Sequelize.STRING
      },
      sede: {
        type: Sequelize.STRING
      },
      horario_atencion: {
        type: Sequelize.STRING
      },
      areas: {
        type: Sequelize.STRING(500)
      },
      extras: {
        type: Sequelize.STRING(500)
      },
      url_logo: {
        type: Sequelize.STRING
      },
      activo: {
        type: Sequelize.BOOLEAN
      }
    });
    return Empresa;
};