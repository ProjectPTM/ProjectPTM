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

  // Load example page and pass in an example by id
  app.get("/toys", function(req, res) {
    db.Toy.findOne({ where: { id: req.params.id } }).then(function(dbToy) {
      res.render("sharing", {
        toy: dbToy
      });
    });
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
