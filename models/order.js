module.exports = function(sequelize, DataTypes) {
  var Order_Product = sequelize.define("Order_Product", {
  name_of_wine: DataTypes.STRING, 
  variety: DataTypes.STRING,
  unit_price: DataTypes.INTEGER,  
  quantity: DataTypes.INTEGER,
  wineId: {
    type: DataTypes.STRING
  },
  customerId: {
    type: DataTypes.INTEGER
  },
  seller: {
    type: DataTypes.INTEGER//,
    //allowNull: false
  },
  status: {
    type: DataTypes.ENUM("open", "shipped"),
    defaultValue: "open"
  }
  });
  return Order_Product;
};
