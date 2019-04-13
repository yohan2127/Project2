var db = require("../models");
var path = require("path");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    res.render("1index");
  });

  // Load admin dashboard page
  app.get("/admin", isLoggedIn, function(req, res) {
    res.render("3dashboard");
  });

  app.get("/mycellar", isLoggedIn, function(req, res) {
    res.render("4mycellar");
  });

  app.get("/contacts", isLoggedIn,  function(req, res) {
    res.render("5contacts");
  });

  app.get("/orders", isLoggedIn, function(req, res) {
    res.render("6orders");
  });
app.get("/employee",isLoggedIn,function(req, res) {
    res.sendFile(path.join(__dirname, "../public/allOrder.html"));
  });




  //datatable rendering
  app.get("/csv",isLoggedIn, function(req, res) {
    res.sendFile(path.join(__dirname, "../public/CSV.html"));
  });
  app.get("/api/order/:orders?", isLoggedIn ,function(req, res) {
  //  console.log(req);
     if (req.params.orders) {
       db.Order_Product.findOne({
         where: {
           id: req.params.orders
         }
       }).then(function(result) {
         return res.json(result);
       });
     } else {
       db.Order_Product.findAll().then(function(result) {
         return res.json(result);
       });
     }
   });

   app.get("/api/wine/Dropdown/:Variety?/:wineName?", isLoggedIn, function(req, res) {
       
    // Wine.findAll().then(function(result) {
       //return res.json(result);
     //});
if (req.params.Variety && req.params.wineName) {
db.wines.findAll({
        where: {
         variety: req.params.Variety,
          name_of_wine:req.params.wineName

        }
      }).then(function(result) {
        return res.json(result);
      });
    }
      
    else if (req.params.Variety) {
      db.wines.findAll({
        where: {
          variety: req.params.Variety
        }
      }).then(function(result) {
        return res.json(result);
      });
    }
    else {
      db.wines.findAll().then(function(result) {
        return res.json(result);
      });
    }
   
 });
// If a user sends data to add a new order...
app.post("/api/new", isLoggedIn, function(req, res) {
  // Take the request...
  var order = req.body;
  console.log(order);
  db.order_products.create({
    name_of_wine: order.name_of_wine,
    variety: order.variety,
    unit_price: order.unit_price,
    quantity: order.quantity,
    status: order.status
   
  });

  res.status(204).end();
});


app.post("/api/import", isLoggedIn, function(req, res) {
  var Import= req.body;
  db.Wine.create({
     countryOrigin: Import.countryOrigin,
      name_of_wine: Import.name_of_wine,
      quantity: Import.quantity,
      seller: Import.seller,
      unit_price:Import.unt_price,
      variety:Import.variety,
      vintage:Import.vintage,
      status:Import.status,
      type:Import.type
   
  }
  ).then((data) => {
    console.log(data);
}).catch((err) => {
    console.log('failed to create notes');
    console.log(err);
});

});


app.delete("/api/Delete/:id", isLoggedIn, function(req, res) {
  // We just have to specify which todo we want to destroy with "where"
  var parameterid=req.params.id;   
  db.order_products.destroy({
    where: {
      id: parameterid
    }
  })    .then(function(Order) {
    res.json(Order);
  });

});
app.get("/api/ReadByID/:ID", isLoggedIn, function(req, res) {
  //console.log(req.params);
  if (req.params.ID) {
    // Display the JSON for ONLY that order.
    // (Note how we're using the ORM here to run our searches)
    db.order_products.findOne({
      where: {
        id: req.params.ID
      }
    }).then(function(result) {
      return res.json(result);
    });
  } 
});
app.post('/api/update-data/:ID', isLoggedIn, function (req, res, next) {
var code = 500;
var message = 'Internal Server Error';
var response = '';
var id = req.params.ID;
 var putData = {
    name_of_wine: req.body.nameOfWine,
    unit_price: req.body.purchasedPrice,
    quantity: req.body.quantity,
    status: req.body.status
}
db.order_products.update(putData,
    {   where: {
            id: id
        }
    }
) .then(function (model) {
        code = 200;
        message = 'OK';
        response = 'Record is successfully updated.';
        res.json({
            code: code,
            message: message,
            response: {
              msg: response
            }
        });
    })
});










  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("error");
  });

  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();

    res.redirect("/signin");
  }

  
};
