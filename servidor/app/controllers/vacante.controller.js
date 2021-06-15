const db = require("../models");
var md5 = require('md5');
const { vacante } = require("../models");
const Vacante = db.vacante;
const Op = db.Sequelize.Op;

// Create and Save a new Vacantes
exports.create = (req, res) => {
    // Validate request
    if (!req.body.puesto) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
        return;
      }
    
      // Create a Vacante
      const data = {
        idEmpresa: req.body.idEmpresa,
        puesto: req.body.puesto,
        tipo: req.body.tipo,
        cantidad: req.body.cantidad,
        fecha_vigencia: req.body.fecha_vigencia,
        p1: req.body.p1,
        p2: req.body.p2,
        p3: req.body.p3,
        p4: req.body.p4,
        p5: req.body.p5
      };
    
      // Save Vacante in the database
      Vacante.create(data)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            "Error al crear vacante"
        });
      });
};

// Retrieve all Vacantes from the database.
exports.findAll = (req, res) => {
    const idEmpresa = req.query.idEmpresa;
    var condition = idEmpresa ? { idEmpresa: { [Op.eq]: idEmpresa } } : null;
  
    Vacante.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      });
};

// Find a single Vacantes with an id
exports.findOne = (req, res) => {
  
};

// Active a Empresa by the id in the request
exports.active = (req, res) => {
  

};

// Update a Empresa by the id in the request
exports.update = (req, res) => {
  
};

// Delete a Vacantes with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Vacante.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            respuesta: 1,
            message: "Se eliminó vacante exitosamente"
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

// Delete all Vacantes from the database.
exports.deleteAll = (req, res) => {
  
};

// Find all published Vacantes
exports.findAllPublished = (req, res) => {
  
};