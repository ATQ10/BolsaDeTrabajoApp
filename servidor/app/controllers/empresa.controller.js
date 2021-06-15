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
       " sitio web, de ser así accede a la siguiente liga: http://localhost:3000/api/empresas/active/"+data.id;

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

//Login
exports.login = (req, res) => {
  const email = req.query.email;
  const password = md5(req.body.password);
  var condition = email ? { email: { [Op.like]: `%${email}%` } } : null;

  Empresa.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          "Some error occurred while retrieving Empresa"
      });
    });

}

// Find a single Empresa with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Empresa.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Empresa with id=" + id
      });
    });
};

// Active a Empresa by the id in the request
exports.active = (req, res) => {
  const id = req.params.id;
  
  Empresa.update(
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

// Update a Empresa by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Empresa.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Empresa fue actualizada exitosamente"
        });
      } else {
        res.send({
          message: `Cannot update Empresa with id=${id}. Maybe Empresa was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Empresa with id=" + id
      });
    });
};

// Delete a Empresa with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Empresa.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          respuesta: 1,
          message: "Se eliminó cuenta exitosamente"
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

// Find all published Empresa
exports.findAllPublished = (req, res) => {
  
};