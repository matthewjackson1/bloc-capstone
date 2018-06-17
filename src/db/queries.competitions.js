const Competition = require("./models").Competition;
const Entry = require("./models").Entry;
const User = require("./models").User;

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
    return Competition.findById(id, {
      include: [
        {model: Entry, as: "entries", include: [
          {model: User }
        ]}
      ]
    })
    .then((competition) => {
      callback(null, competition);
    })
    .catch((err) => {
      callback(err);
    })
  }
}