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
  },

  addCompetition(newCompetition, callback){
    return Competition.create({
      title: newCompetition.title,
      description: newCompetition.description,
      maxwords: newCompetition.maxwords,
      enddate: newCompetition.enddate
    })
    .then((competition) => {
      callback(null, competition);
    })
    .catch((err) => {
      callback(err);
    })
  },

  getCompetition(id, callback){
    return Competition.findById(id)
    .then((competition) => {
      callback(null, competition);
    })
    .catch((err) => {
      callback(err);
    })
  }
}