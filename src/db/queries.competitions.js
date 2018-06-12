const Competition = require("./models").Competition;

module.exports = {

//#1
  getAllCompetitions(callback){
    return Competition.all()

//#2
    .then((competitions) => {
      callback(null, competitions);
    })
    .catch((err) => {
      callback(err);
    })
  }
}