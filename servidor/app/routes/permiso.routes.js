module.exports = app => {
    const apermisos = require("../controllers/apermiso.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Aspirante
    router.post("/", apermisos.create);

    // Login a new Aspirante
    router.post("/login", apermisos.login);
  
    // Retrieve all Aspirante
    router.get("/", apermisos.findAll);
  
    // Retrieve all published Aspirante
    router.get("/published", apermisos.findAllPublished);
  
    // Retrieve a single Aspirante with id
    router.get("/:id", apermisos.findOne);
  
    // Update a Aspirante with id (Activar)
    router.get("/active/:id", apermisos.active);

    // Update a Aspirante with id (CV)
    router.put("/cv/:id", apermisos.cv);
    
    // Update a Aspirante with id
    router.put("/:id", apermisos.update);
  
    // Delete a Aspirante with id
    router.delete("/:id", apermisos.delete);
  
    // Delete all Aspirante
    router.delete("/", apermisos.deleteAll);
  
    app.use('/api/permisos', router);
};