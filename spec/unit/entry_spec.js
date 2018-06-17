// #1: We import our dependencies
const sequelize = require("../../src/db/models/index").sequelize;
const Competition = require("../../src/db/models").Competition;
const User = require("../../src/db/models").User;
const Entry = require("../../src/db/models").Entry;

describe("Entry", () => {

// #2: Before each test, we scope a user, competition, and entry to the test context.
  beforeEach((done) => {
    this.user;
    this.competition;
    this.entry;

    sequelize.sync({force: true}).then((res) => {

// #3: We create test data we can use during test execution
      User.create({
        username: "starman@tesla.com",
        password: "Trekkie4lyfe"
      })
      .then((user) => {
        this.user = user;

        Competition.create({
          title: "Expeditions to Alpha Centauri",
          description: "A compilation of reports from recent visits to the star system.",
          maxwords: 200,
          startdate: new Date(),
          enddate: new Date()
        
        })
        .then((competition) => {
          this.competition = competition;

          Entry.create({
            title: "My entry",
            body: "Hola, here is my story, ay caramba!!!!!",
            userId: this.user.id,
            competitionId: this.competition.id
          })
          .then((entry) => {
            this.entry = entry;
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

// #4: We start a test suite for the `create` action
  describe("#create()", () => {

    it("should create a entry object with a body, assigned competition and user", (done) => {
      Entry.create({                // create a entry
        title: "My new title",
        body: "The geological kind.",
        competitionId: this.competition.id,
        userId: this.user.id
      })
      .then((entry) => {            // confirm it was created with the values passed
        expect(entry.title).toBe("My new title");
        expect(entry.body).toBe("The geological kind.");
        expect(entry.competitionId).toBe(this.competition.id);
        expect(entry.userId).toBe(this.user.id)
        done();

      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });


// #5: We test that comments with invalid attributes are not created
    it("should not create a entry with missing body, assigned competition or user", (done) => {
      Entry.create({
        body: "Are the inertial dampers still engaged?"
      })
      .then((entry) => {

        // the code in this block will not be evaluated since the validation error
        // will skip it. Instead, we'll catch the error in the catch block below
        // and set the expectations there

        done();

      })
      .catch((err) => {
        expect(err.message).toContain("Entry.title cannot be null");
        expect(err.message).toContain("Entry.userId cannot be null");
        expect(err.message).toContain("Entry.competitionId cannot be null");
        done();

      })
    });

  });

});