module.exports = (sequelize, Sequelize) => {
    const Aspirante = sequelize.define("aspirante", {
      nombre: {
        type: Sequelize.STRING
      },
      apellido: {
        type: Sequelize.STRING
      },
      sexo: {
        type: Sequelize.STRING
      },
      fecha_nacimiento: {
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
      nacionalidad: {
        type: Sequelize.STRING
      },
      residencia: {
        type: Sequelize.STRING
      },
      idioma_primario: {
        type: Sequelize.STRING
      },
      idioma_secundario: {
        type: Sequelize.STRING
      },
      disp_horario: {
        type: Sequelize.STRING
      },
      disp_viajar: {
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
      url_CV: {
        type: Sequelize.STRING
      },
      activo: {
        type: Sequelize.BOOLEAN
      }
    });
    return Aspirante;
};