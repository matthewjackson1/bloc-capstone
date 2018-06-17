const entryQueries = require("../db/queries.entries.js");
const Authorizer = require("../policies/entry.js");

module.exports = {
  create(req, res, next){
 // #2
    const authorized = new Authorizer(req.user).create();

    if(authorized) {

 // #3
      let newEntry = {
        title: req.body.title,
        body: req.body.body,
        userId: req.user.id,
        competitionId: req.params.competitionId
      };

 // #4
      entryQueries.createEntry(newEntry, (err, entry) => {
 // #5
        if(err){
          req.flash("error", err);
        }
        res.redirect(req.headers.referer);
      });
    } else {
      req.flash("notice", "You must be signed in to do that.")
      req.redirect("/users/sign_in");
    }
  },

// #6
  
}