module.exports = app => {
    const solicitudes = require("../controllers/solicitud.controller.js");
  
    var router = require("express").Router();
  
    // Create a new solicitudes
    router.post("/", solicitudes.create);
  
    // Retrieve all solicitudes
    router.get("/", solicitudes.findAll);
  
    // Retrieve all published solicitudes
    router.get("/published", solicitudes.findAllPublished);
  
    // Retrieve a single solicitudes with id
    router.get("/:id", solicitudes.findOne);
    
    // Update a solicitudes with id
    router.put("/:id", solicitudes.update);
  
    // Delete a solicitudes with id
    router.delete("/:id", solicitudes.delete);
  
    // Delete all solicitudes
    router.delete("/", solicitudes.deleteAll);
  
    app.use('/api/solicitudes', router);
};