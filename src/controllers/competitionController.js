const competitionQueries = require("../db/queries.competitions.js");

const Authorizer = require("../policies/competition");

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
    },

    new(req, res, next){
        // #2
            const authorized = new Authorizer(req.user).new();
       
            if(authorized) {
              res.render("competitions/new");
            } else {
              req.flash("notice", "You are not authorized to do that.");
              res.redirect("/competitions");
            }
          },
    
        create(req, res, next){

            // #1
                const authorized = new Authorizer(req.user).create();
           
            // #2
                if(authorized) {
                    let newCompetition = {
                        title: req.body.title,
                        description: req.body.description,
                        startdate: new Date(),
                        enddate: req.body.enddate,
                        maxwords: req.body.maxwords
                  };
                  competitionQueries.addCompetition(newCompetition, (err, competition) => {
                    if(err){
                      res.redirect(500, "competitions/new");
                    } else {
                      res.redirect(303, `/competitions/${competition.id}`);
                    }
                  });
                } else {
           
            // #3
                  req.flash("notice", "You are not authorized to do that.");
                  res.redirect("/competitions");
                }
              },

        
            

      show(req, res, next){

        //#1
             competitionQueries.getCompetition(req.params.id, (err, competition) => {
        
        //#2
               if(err || competition == null){
                 res.redirect(404, "/");
               } else {
                 res.render("competitions/show", {competition});
               }
             });
           }

  }