module.exports = function(sequelize, DataTypes) {
  var Wine = sequelize.define("Wine", {
    name_of_wine: {
      type: DataTypes.STRING//,
      //notEmpty: true
    },
    variety: {
      type: DataTypes.STRING,
      notEmpty: true
    },
    unit_price: DataTypes.INTEGER,  
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status: DataTypes.STRING, 
  
    vintage: {
      type: DataTypes.INTEGER//,
      //notEmpty: true
    },
    type: {
      type: DataTypes.ENUM,
      values: ["red", "white", "rose", "dessert", "sparkling"],
      notEmpty: true
    },
    countryOrigin: {
      type: DataTypes.STRING
      //notEmpty: true
    },
    seller: {
      type: DataTypes.STRING
      //allowNull: false
    }
  });
  return Wine;
};
