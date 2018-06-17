const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/competitions/";

const sequelize = require("../../src/db/models/index").sequelize;
const Competition = require("../../src/db/models").Competition;
const User = require("../../src/db/models").User;
const Entry = require("../../src/db/models").Entry;

describe("routes : entries", () => {

  beforeEach((done) => {

// #2
    this.user;
    this.competition;
    this.entry;

    sequelize.sync({force: true}).then((res) => {

// #3
      User.create({
        username: "starman",
        password: "Trekkie4lyfe",
        role: "admin"
      })
      .then((user) => {
        this.user = user;  // store user

        Competition.create({
          title: "Expeditions to Alpha Centauri",
          description: "Write a reports from a recent visits to the star system.",
          startdate: new Date(),
          enddate: new Date()
        }, {
          include: {                        //nested creation of posts
            model: Entry,
            as: "entries"
          }
        })
        .then((competition) => {
          this.competition = competition;                 // store topic

          Entry.create({  
            title: "Mission log 23",
            body: "ay caramba!!!!! There are so many aliens here!",
            userId: this.user.id,          
            competitionId: this.competition.id
          })
          .then((entry) => {
            this.entry = entry;             // store entry
            done();
          })
          .catch((err) => {
            console.log(err);
            done();
          });
        })
        .catch((err) => {
          console.log(err);
          done();
        });
      });
    });
  });

  //test suites will go there

  describe("guest attempting to create Entry", () => {

    // #2
         beforeEach((done) => {    // before each suite in this context
           request.get({           // mock authentication
             url: "http://localhost:3000/auth/fake",
             form: {
               userId: 0 // flag to indicate mock auth to destroy any session
             }
           },
             (err, res, body) => {
               done();
             }
           );
         });
    
    // #3
         describe("POST /competition/:competitionId/entries/create", () => {
    
           it("should not create a new entry", (done) => {
             const options = {
               url: `${base}${this.competition.id}/entries/create`,
               form: {
                 title: "My guest entry",
                 body: "This entry is amazing!"
               }
             };
             request.post(options,
               (err, res, body) => {
    // #4
                 Entry.findOne({where: {body: "This entry is amazing!"}})
                 .then((entry) => {
                   expect(entry).toBeNull();   // ensure no entry was created
                   done();
                 })
                 .catch((err) => {
                   console.log(err);
                   done();
                 });
               }
             );
           });
         });    
        });
    
        describe("signed in user performing CRUD actions for Entry", () => {

            beforeEach((done) => {    // before each suite in this context
              request.get({           // mock authentication
                url: "http://localhost:3000/auth/fake",
                form: {
                  role: "member",     // mock authenticate as member user
                  userId: this.user.id
                }
              },
                (err, res, body) => {
                  done();
                }
              );
            });
       
            describe("POST /competitions/:competitionId/entries/create", () => {
            
                    it("should create a new entry and redirect", (done) => {
                        const options = {
                        url: `${base}${this.competition.id}/entries/create`,
                        form: {
                            title: "My signed in entry",
                            body: "This user entry is amazing!",
                            
                        }
                        };
                        request.post(options,
                        (err, res, body) => {
                            Entry.findOne({where: {body: "This user entry is amazing!"}})
                            .then((entry) => {
                            
                            expect(entry).not.toBeNull();
                            expect(entry.body).toBe("This user entry is amazing!");
                            expect(entry.id).not.toBeNull();
                            done();
                            })
                            .catch((err) => {
                            console.log(err);
                            done();
                            });
                        }
                        );
                    });
            });
        });

    

});