const express = require("express");
require("dotenv").config();
const connectDB = require("./config/mongoose");
const sequelize = require("./config/sequelize");
const userRoutes = require("./Routes/userRoutes");
const { errorHandler } = require("./middleware/authMiddleware");

connectDB();
sequelize.sync();

const app = express();
app.use(express.json());

app.use("/api/users", userRoutes);
app.use(errorHandler);
const PORT = process.env.PORT || 9090;
app.listen(PORT, () => {
  console.log(`Server running on the port: http://localhost:${PORT} `);
});

// morgan

const morgan = require("morgan");
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
