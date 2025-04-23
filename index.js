const express = require("express");
require("dotenv").config();
const connectDB = require("./config/db");
const schoolRoutes = require("./routes/schoolRoutes");

const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

(async () => {
  const db = await connectDB();
  app.locals.db = db;

  app.get("/", (req, res) => {
    res.status(200).send({ message: "server is running" });
  });

  //routes
  app.use("/api/schools", schoolRoutes);

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
})();
