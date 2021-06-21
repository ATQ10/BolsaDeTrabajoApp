const db = require("../models");
var md5 = require('md5');
var nodemailer = require('nodemailer');
const Apermiso = db.apermiso;
const Op = db.Sequelize.Op;

// Create and Save a new Aspirante
exports.create = (req, res) => {
};
// Retrieve all Aspirantes from the database.
exports.findAll = (req, res) => {
};

//Login
exports.login = (req, res) => {

}

// Find a single Aspirante with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Apermiso.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Apermiso with id=" + id
      });
    });
};

// Active a Aspirante by the id in the request
exports.active = (req, res) => {

};

// CV a Aspirante by the id in the request
exports.cv = (req, res) => {

};

// Update a Aspirante by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Apermiso.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Permisos actualizados exitosamente"
        });
      } else {
        res.send({
          message: `Cannot update Permisos with id=${id}. Maybe Permisos was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Permisos with id=" + id
      });
    });
};

// Delete a Aspirante with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Apermiso.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        Apermiso.destroy({
          where: { id: id }
        })
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

// Find all published Aspirantes
exports.findAllPublished = (req, res) => {
  
};