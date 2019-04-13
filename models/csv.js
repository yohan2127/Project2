module.exports = function(sequelize, DataTypes) {
  var Import = sequelize.define("Import", {
  code: DataTypes.STRING, 
  Defect_ID: DataTypes.STRING,
  Severity: DataTypes.STRING,  
  Status: DataTypes.STRING,
  AssignedTo: DataTypes.STRING
  });
  return Import;
};



					
