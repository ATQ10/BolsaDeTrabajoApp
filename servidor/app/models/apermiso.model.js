module.exports = (sequelize, Sequelize) => {
    const Apermiso = sequelize.define("apermiso", {
      nombre: {
        type: Sequelize.BOOLEAN
      },
      apellido: {
        type: Sequelize.BOOLEAN
      },
      sexo: {
        type: Sequelize.BOOLEAN
      },
      fecha_nacimiento: {
        type: Sequelize.BOOLEAN
      },
      email: {
        type: Sequelize.BOOLEAN
      },
      password: {
        type: Sequelize.BOOLEAN
      },
      domicilio: {
        type: Sequelize.BOOLEAN
      },
      telefono: {
        type: Sequelize.BOOLEAN
      },
      nacionalidad: {
        type: Sequelize.BOOLEAN
      },
      residencia: {
        type: Sequelize.BOOLEAN
      },
      idioma_primario: {
        type: Sequelize.BOOLEAN
      },
      idioma_secundario: {
        type: Sequelize.BOOLEAN
      },
      disp_horario: {
        type: Sequelize.BOOLEAN
      },
      disp_viajar: {
        type: Sequelize.BOOLEAN
      },
      areas: {
        type: Sequelize.BOOLEAN
      },
      extras: {
        type: Sequelize.BOOLEAN
      },
      url_logo: {
        type: Sequelize.BOOLEAN
      },
      url_CV: {
        type: Sequelize.BOOLEAN
      },
      activo: {
        type: Sequelize.BOOLEAN
      }
    });
    return Apermiso;
};