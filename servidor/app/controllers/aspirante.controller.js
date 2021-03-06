const db = require("../models");
var md5 = require('md5');
var nodemailer = require('nodemailer');
const Aspirante = db.aspirante;
const Apermiso = db.apermiso;
const Op = db.Sequelize.Op;

// Create and Save a new Aspirante
exports.create = (req, res) => {
  // Validate request
  if (!req.body.email) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Aspirante
  const aspirante = {
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    sexo: req.body.sexo,
    fecha_nacimiento: req.body.fecha_nacimiento,
    email: req.body.email,
    password: md5(req.body.password),
    domicilio: req.body.domicilio,
    telefono: req.body.telefono,
    nacionalidad: req.body.nacionalidad,
    residencia: req.body.residencia,
    idioma_primario: req.body.idioma_primario,
    idioma_secundario: req.body.idioma_secundario,
    disp_horario: req.body.disp_horario,
    disp_viajar: req.body.disp_viajar,
    areas: req.body.areas,
    extras: req.body.extras,
    url_logo: req.body.url_logo,
    url_CV: req.body.url_CV,
    activo: false
  };

  const apermiso = {
    nombre: true,
    apellido: true,
    sexo: true,
    fecha_nacimiento: true,
    email: true,
    password: true,
    domicilio: true,
    telefono: true,
    nacionalidad: true,
    residencia: true,
    idioma_primario: true,
    idioma_secundario: true,
    disp_horario: true,
    disp_viajar: true,
    areas: true,
    extras: true,
    url_logo: true,
    url_CV: true,
    activo: true
  };

  // Save Aspirante in the database
  Aspirante.create(aspirante)
    .then(data => {
      res.send(data);
      //NODEMAILER
      //Creamos el objeto de transporte
      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'unemployed.assistent@gmail.com',
          pass: 'UNEMPLOYED123'
        }
      });

      var mensaje = "Estimad@ "+data.nombre+"\nNos comunicamos contigo"+
       " para validar que efectivamente deseas crear una cuenta en nuestro"+
       " sitio web, de ser as?? accede a la siguiente liga: http://localhost:3000/api/aspirantes/active/"+data.id;

      var mailOptions = {
        from: 'unemployed.assistent@gmail.com',
        to: data.email,
        subject: 'Validando mi cuenta de unemployed.com',
        text: mensaje
      };

      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email enviado: ' + info.response);
        }
      });
      //NODEMAILER
      //Permisos
      Apermiso.create(apermiso);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Aspirante."
      });
    });
};

// Retrieve all Aspirantes from the database.
exports.findAll = (req, res) => {
  const buscar = req.query.buscar;
  
  var condition = buscar ? {
    [Op.or]: [
      { nombre: { [Op.like]: `%${buscar}%` } },
      { areas: { [Op.like]: `%${buscar}%` } },
      { apellido: { [Op.like]: `%${buscar}%` } },
      { residencia: { [Op.like]: `%${buscar}%` } }
    ]
  } : null;

  Aspirante.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Aspirante."
      });
    });
};

//Login
exports.login = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  var condition = email ? { email: { [Op.like]: email } } : null;

  Aspirante.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          "Some error occurred while retrieving Aspirante"
      });
    });

}

// Find a single Aspirante with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Aspirante.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Aspirante with id=" + id
      });
    });
};

// Active a Aspirante by the id in the request
exports.active = (req, res) => {
  const id = req.params.id;
  
  Aspirante.update(
    { activo: true },
    { where: { id: id } }
  )
  .then(data =>
      res.send('<script>alert("Su cuenta se ha activado"); window.location.replace("http://localhost:4200/login");</script>')
    )
    .catch(err =>
      res.send(err)
    )

};

// CV a Aspirante by the id in the request
exports.cv = (req, res) => {
  const id = req.params.id;
  const url_CV = req.body.url_CV;
  
  Aspirante.update(
    { url_CV: url_CV },
    { where: { id: id } }
  )
  .then(data =>
      res.send({
        message: "CV guardado exitosamente"
      })
    )
    .catch(err =>
      res.send(err)
    )

};

// Update a Aspirante by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Aspirante.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Aspirante fue actualizado exitosamente"
        });
      } else {
        res.send({
          message: `Cannot update Aspirante with id=${id}. Maybe Aspirante was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Aspirante with id=" + id
      });
    });
};

// enviar a Aspirante by the id in the request
exports.enviar = (req, res) => {
  const id = req.params.id;
  const descripcion = req.body.descripcion;
  const nombre = req.body.nombre;
  const email = req.body.email;
  //NODEMAILER
      //Creamos el objeto de transporte
      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'unemployed.assistent@gmail.com',
          pass: 'UNEMPLOYED123'
        }
      });

      var mensaje = "Estimad@ "+nombre+"\nNos comunicamos contigo ya que "+
       " hemos recibido una oferta de empleo hacia ti, el mensaje dice:\n"+
       " \""+descripcion+"\"";

      var mailOptions = {
        from: 'unemployed.assistent@gmail.com',
        to: email,
        subject: 'Bolsa de Trabajo',
        text: mensaje
      };

      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
          res.status(500).send({
            message: "Intente mas tarde"
          });
        } else {
          console.log('Email enviado: ' + info.response);
          res.send({
            message: `Informaci??n enviada al correo electr??nico del aspirante`
          });
        }
      });
      //NODEMAILER
};

// Delete a Aspirante with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Aspirante.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        Apermiso.destroy({
          where: { id: id }
        })
        res.send({
          respuesta: 1,
          message: "Se elimin?? cuenta exitosamente"
        });
      } else {
        res.send({
          respuesta: 0,
          message: `Cannot delete Aspirante with id=${id}. Maybe Aspirante was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        respuesta: 0,
        message: "Could not delete Aspirante with id=" + id
      });
    });
  
};

// Delete all Aspirantes from the database.
exports.deleteAll = (req, res) => {
  
};

// Find all published Aspirantes
exports.findAllPublished = (req, res) => {
  
};