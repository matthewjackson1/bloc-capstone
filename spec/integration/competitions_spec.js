const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/competitions/";
const sequelize = require("../../src/db/models/index").sequelize;
const Competition = require("../../src/db/models").Competition;
const User = require("../../src/db/models").User;

describe("routes : competitions", () => {

beforeEach((done) => {
    this.competition;
    sequelize.sync({force: true}).then((res) => {

        Competition.create({
        title: "The Vessel",
        description: "There is a lot of them",
        startdate: new Date(),
        enddate: new Date()
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
  
    describe("admin user performing CRUD actions for Competition", () => {

        // #2: // before each test in admin user context, send an authentication request
               // to a route we will create to mock an authentication request
             beforeEach((done) => {
               User.create({
                 username: "admin@example.com",
                 password: "123456",
                 role: "admin"
               })
               .then((user) => {
                 request.get({         // mock authentication
                   url: "http://localhost:3000/auth/fake",
                   form: {
                     role: user.role,     // mock authenticate as admin user
                     userId: user.id,
                     username: user.username
                   }
                 },
                   (err, res, body) => {
                     done();
                   }
                 );
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

            describe("GET /competitions/new", () => {

                it("should render a new competition form", (done) => {
                    request.get(`${base}new`, (err, res, body) => {
                    expect(err).toBeNull();
                    expect(body).toContain("Add a Competition");
                    done();
                    });
                });

            });   
            
            describe("POST /competitions/create", () => {
                const options = {
                url: `${base}create`,
                form: {
                    title: "A journey",
                    description: "Describe an emotional travelling experience",
                    startdate: new Date(),
                    enddate: new Date(),
                    maxwords: 300
                }
                };
        
                it("should create a new competition and redirect", (done) => {
        
        //#1
                request.post(options,
        
        //#2
                    (err, res, body) => {
                    Competition.findOne({where: {title: "A journey"}})
                    .then((competition) => {
                        expect(res.statusCode).toBe(303);
                        expect(competition.title).toBe("A journey");
                        expect(competition.description).toBe("Describe an emotional travelling experience");
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

            describe("GET /competitions/:id", () => {

                it("should render a view with the selected competition", (done) => {
                request.get(`${base}${this.competition.id}`, (err, res, body) => {
                    expect(err).toBeNull();
                    expect(body).toContain("The Vessel");
                    done();
                });
                });
        
            });
        });


        describe("member user performing CRUD actions for Competition", () => {

            // #4: Send mock request and authenticate as a member user
            beforeEach((done) => {
                  request.get({
                    url: "http://localhost:3000/auth/fake",
                    form: {
                      role: "member"
                    }
                  },
                    (err, res, body) => {
                      done();
                    }
                  );
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
        
                    describe("GET /competitions/new", () => {
        
                        it("should not render a new competition form", (done) => {
                            request.get(`${base}new`, (err, res, body) => {
                            expect(body).not.toContain("Add a Competition");
                            done();
                            });
                        });
        
                    });   
                    
        
                    describe("GET /competitions/:id", () => {
        
                        it("should render a view with the selected competition", (done) => {
                        request.get(`${base}${this.competition.id}`, (err, res, body) => {
                            expect(err).toBeNull();
                            expect(body).toContain("The Vessel");
                            done();
                        });
                        });
                
                    });
                });
            


  });
