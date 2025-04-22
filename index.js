const express = require("express");
const connectDB = require("./config/db");
const schoolRoutes = require("./routes/schoolRoutes");

require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

(async () => {
  const db = await connectDB();
  app.locals.db = db;

  //routes
  app.use("/api/schools", schoolRoutes);

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
})();
