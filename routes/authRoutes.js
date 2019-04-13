var db = require("../models");
module.exports = function(app, passport, user) {
  var User = user;

  app.get("/signin", function(req, res) {
    res.render("1index");
  });

  app.post(
    "/signup",
    passport.authenticate(`local-signup`, {
      successRedirect: `/admin`,
      failurRedirect: `/signup`
    })
  );

  app.post(
    "/signin",
    passport.authenticate("local-signin", {
      successRedirect: "/admin",
      failureRedirect: "/signin"
    })
  );
    
  app.get("/api/profile", isLoggedIn, function(req, res) {
    res.json(req.user);
  });

  app.post("/api/profile", isLoggedIn, function(req, res) {
    var update = {};
    if(req.body.firstname) {
      update.firstname = req.body.firstname;
    }
    if(req.body.lastname) {
      update.lastname = req.body.lastname;
    }
    if(req.body.email) {
      update.email = req.body.email;
    }
    if(req.body.profileUrl) {
      update.profileUrl = req.body.profileUrl;
    }
    User.update(update, {
      where: {
        id: req.user.id
      }
    }).then(function(dbTodo) {
      console.log("success");
      res.json(dbTodo);
    });
  });



  


























  app.get("/logout", function(req, res) {
    req.session.destroy(function(err) {
      res.redirect("/");
    });
  });

  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();

    res.redirect("/signin");
  }
};