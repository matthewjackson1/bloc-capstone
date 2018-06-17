'use strict';
module.exports = (sequelize, DataTypes) => {
  var Competition = sequelize.define('Competition', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    maxwords: DataTypes.INTEGER,
    startdate: DataTypes.DATE,
    enddate: DataTypes.DATE
  }, {});
  Competition.associate = function(models) {
    // associations can be defined here
    Competition.hasMany(models.Entry, {
      foreignKey: "competitionId",
      as: "entries"
    });
  };
  return Competition;
};