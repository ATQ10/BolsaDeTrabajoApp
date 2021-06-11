const db = require("../models");
var md5 = require('md5');
var nodemailer = require('nodemailer');
const Empresa = db.empresa;
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

  // Create a Empresa
  const empresa = {
    nombre: req.body.nombre,
    encargado: req.body.encargado,
    fecha_fundacion: req.body.fecha_fundacion,
    email: req.body.email,
    password: md5(req.body.password),
    domicilio: req.body.domicilio,
    telefono: req.body.telefono,
    sede: req.body.sede,
    horario_atencion: req.body.horario_atencion,
    areas: req.body.areas,
    extras: req.body.extras,
    url_logo: req.body.url_logo,
    activo: false
  };

  // Save Empresa in the database
  Empresa.create(empresa)
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

      var mensaje = "Estimada empresa "+data.nombre+"\nNos comunicamos contigo"+
       " para validar que efectivamente deseas crear una cuenta en nuestro"+
       " sitio web, de ser así accede a la siguiente liga: http://localhost:8080/api/empresa/"+data.id;

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
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Aspirante."
      });
    });
};

// Retrieve all Empresa from the database.
exports.findAll = (req, res) => {
  
};

// Find a single Empresa with an id
exports.findOne = (req, res) => {
  
};

// Update a Empresa by the id in the request
exports.update = (req, res) => {
  
};

// Delete a Empresa with the specified id in the request
exports.delete = (req, res) => {
  
};

// Delete all Aspirantes from the database.
exports.deleteAll = (req, res) => {
  
};

// Find all published Empresa
exports.findAllPublished = (req, res) => {
  
};