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
       " sitio web, de ser así accede a la siguiente liga: http://localhost:8080/api/aspirante/"+data.id;

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
        Apermiso.create(apermiso)
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Aspirante."
          });
        });
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
  
};

// Find a single Aspirante with an id
exports.findOne = (req, res) => {
  
};

// Update a Aspirante by the id in the request
exports.update = (req, res) => {
  
};

// Delete a Aspirante with the specified id in the request
exports.delete = (req, res) => {
  
};

// Delete all Aspirantes from the database.
exports.deleteAll = (req, res) => {
  
};

// Find all published Aspirantes
exports.findAllPublished = (req, res) => {
  
};