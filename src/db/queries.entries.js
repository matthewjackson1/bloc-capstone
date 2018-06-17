const Entry = require("./models").Entry;
const Post = require("./models").Post;
const User = require("./models").User;

const Authorizer = require("../policies/entry");

module.exports = {

 // #2
  createEntry(newEntry, callback){
    return Entry.create(newEntry)
    .then((entry) => {
      callback(null, entry);
    })
    .catch((err) => {
      callback(err);
    });
  },


}