const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/competitions/";
const sequelize = require("../../src/db/models/index").sequelize;
const Competition = require("../../src/db/models").Competition;

describe("routes : competitions", () => {

beforeEach((done) => {
    this.competition;
    sequelize.sync({force: true}).then((res) => {

        Competition.create({
        title: "The Vessel",
        description: "There is a lot of them"
        })
        .then((competition) => {
        this.competition = competition;
        done();
        })
        .catch((err) => {
        console.log(err);
        done();
        });

    });

    });
  

  describe("GET /competitions", () => {

    it("should return a status code 200 and all competitions", (done) => {

        //#3
               request.get(base, (err, res, body) => {
                 expect(res.statusCode).toBe(200);
                 expect(err).toBeNull();
                 expect(body).toContain("Competitions");
                 expect(body).toContain("The Vessel");
                 done();
               });
             });
           });

  });
