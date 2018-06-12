module.exports = {
    init(app){
      const staticRoutes = require("../routes/static");
      const userRoutes = require("../routes/users");
      const competitionRoutes = require("../routes/competitions");
      app.use(staticRoutes);
      app.use(userRoutes);
      app.use(competitionRoutes);

    }
  }
  