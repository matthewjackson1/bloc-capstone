const competitionQueries = require("../db/queries.competitions.js");

module.exports = {
    index(req, res, next){
        competitionQueries.getAllCompetitions((err, competitions) => {

            //#3
                    if(err){
                    console.log(err);
                      res.redirect(500, "static/index");
                    } else {
                      res.render("competitions/index", {competitions});
                    }
                  })
    }
  }