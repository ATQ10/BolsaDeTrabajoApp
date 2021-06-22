const db = require("../models");
var md5 = require('md5');
const { solicitud } = require("../models");
const Solicitud = db.solicitud;
const Op = db.Sequelize.Op;

// Create and Save a new Solicitud
exports.create = (req, res) => {
    // Validate request
    if (!req.body.respuesta) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
        return;
      }
    
      // Create a Solicitud
      const data = {
        idAspirante: req.body.idAspirante,
        idEmpresa: req.body.idEmpresa,
        nombreAspirante: req.body.nombreAspirante,
        apellidoAspirante: req.body.apellidoAspirante,
        nombreEmpresa: req.body.nombreEmpresa,
        puesto: req.body.puesto,
        fecha_vigencia: req.body.fecha_vigencia,
        tipo: req.body.tipo,
        respuesta: req.body.respuesta,
        estado: req.body.estado
      };
    
      // Save Solicitud in the database
      Solicitud.create(data)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            "Error al crear Solicitud"
        });
      });
};

// Retrieve all Solicitud from the database.
exports.findAll = (req, res) => {
  const idAspirante = req.query.idAspirante;
  const id = req.query.id;
    var condition = idAspirante ? { idAspirante: { [Op.eq]: idAspirante } } : { id: { [Op.eq]: id } };
  
    Solicitud.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Solicitud."
        });
      });
};

// Retrieve all Solicitud from the database.
exports.findE = (req, res) => {
  const idEmpresa = req.query.idEmpresa;
    var condition = idEmpresa ? { idEmpresa: { [Op.eq]: idEmpresa } } : null ;
  
    Solicitud.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Solicitud."
        });
      });
};

// Find a single Solicitud with an id
exports.findOne = (req, res) => {
  
};

// Active a Solicitud by the id in the request
exports.active = (req, res) => {
  

};

// Update a Solicitud by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Solicitud.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Solicitud "+req.body.estado
        });
      } else {
        res.send({
          message: `Cannot update Solicitud with id=${id}. Maybe Solicitud was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Solicitud with id=" + id
      });
    });
};

// Delete a Solicitud with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Solicitud.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            respuesta: 1,
            message: "Se eliminó Solicitud exitosamente"
          });
        } else {
          res.send({
            respuesta: 0,
            message: `Cannot delete Solicitud with id=${id}. Maybe Solicitud was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          respuesta: 0,
          message: "Could not delete Solicitud with id=" + id
        });
      });
};

// Delete all Solicitud from the database.
exports.deleteAll = (req, res) => {
  
};

// Find all published Solicitud
exports.findAllPublished = (req, res) => {
  
};