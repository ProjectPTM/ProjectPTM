var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Toy.findAll({}).then(function(dbToy) {
      res.render("index", {
        msg: "Welcome!",
        toys: dbToy
      });
    });
  });

  app.get("/search", function(req, res) {
    db.Toy.findAll({
      order: [
        ['text', 'ASC']
      ]
    }).then(function(dbToy) {
      res.render("search", {
        toys: dbToy
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/toys", function(req, res) {
   
   var data = { }
    db.Toy.findAll({
      limit: 5,
      order: [['id', 'DESC']]
    }).then(function(dbToy) {
      data.toy = dbToy
      getGeneral();
    });
    function getGeneral(){
    db.General.findAll({
      order: [['id', 'DESC']]
    }).then(function(dbGenerals) {
      data.general = dbGenerals;
      res.render("sharing", {
        data: data
      });
    });
  }
    
  });

  // Load example page and pass in an example by id
  app.get("/toys/:id", function(req, res) {
    db.Toy.findOne({ where: { id: req.params.id } }).then(function(dbToy) {
      res.render("toys", {
        toy: dbToy
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
