module.exports = app => {
    const vacantes = require("../controllers/vacante.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Vacante
    router.post("/", vacantes.create);
  
    // Retrieve all Vacante
    router.get("/", vacantes.findAll);
  
    // Retrieve all published Vacante
    router.get("/published", vacantes.findAllPublished);
  
    // Retrieve a single Vacante with id
    router.get("/:id", vacantes.findOne);
  
    // Update a Vacante with id (Activar)
    router.get("/active/:id", vacantes.active);
    
    // Update a Vacante with id
    router.put("/:id", vacantes.update);
  
    // Delete a Vacante with id
    router.delete("/:id", vacantes.delete);
  
    // Delete all Vacante
    router.delete("/", vacantes.deleteAll);
  
    app.use('/api/vacantes', router);
};