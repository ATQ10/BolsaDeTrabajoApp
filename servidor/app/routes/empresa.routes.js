const { empresa } = require("../models/index.js");

module.exports = app => {
    const empresas = require("../controllers/empresa.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Empresa
    router.post("/", empresas.create);

    // Login a new Empresa
    router.post("/login", empresas.login);

    // Retrieve all Empresa
    router.get("/", empresas.findAll);
  
    // Retrieve all published Empresa
    router.get("/published", empresas.findAllPublished);
  
    // Retrieve a single Empresa with id
    router.get("/:id", empresas.findOne);

    // Update a Aspirante with id (Activar)
    router.get("/active/:id", empresas.active);
  
    // Update a Empresa with id
    router.put("/:id", empresas.update);
  
    // Delete a Empresa with id
    router.delete("/:id", empresas.delete);
  
    // Delete all Empresa
    router.delete("/", empresas.deleteAll);
  
    app.use('/api/empresas', router);
};