module.exports = app => {
    const aspirantes = require("../controllers/aspirante.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Aspirante
    router.post("/", aspirantes.create);

    // Login a new Aspirante
    router.post("/login", aspirantes.login);
  
    // Retrieve all Aspirante
    router.get("/", aspirantes.findAll);
  
    // Retrieve all published Aspirante
    router.get("/published", aspirantes.findAllPublished);
  
    // Retrieve a single Aspirante with id
    router.get("/:id", aspirantes.findOne);
  
    // Update a Aspirante with id (Activar)
    router.get("/active/:id", aspirantes.active);

    // Update a Aspirante with id (CV)
    router.put("/cv/:id", aspirantes.cv);
    
    // Update a Aspirante with id
    router.put("/:id", aspirantes.update);
    
    // Enviar a Aspirante with id
    router.put("/enviar/:id", aspirantes.enviar);
  
    // Delete a Aspirante with id
    router.delete("/:id", aspirantes.delete);
  
    // Delete all Aspirante
    router.delete("/", aspirantes.deleteAll);
  
    app.use('/api/aspirantes', router);
};