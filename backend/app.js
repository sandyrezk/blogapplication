const express = require("express");
const connectedToDb = require("./config/connectToDb");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");
require("dotenv").config();

// Connect DB
connectedToDb();

// Init App
const app = express();

// Middlewares
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get("/test", (req, res) => {
  res.send("API is working");
});
// Routes
app.use("/api/auth", require("./routes/authRoute"));
app.use("/api/users", require("./routes/usersRoute"));
app.use("/api/posts", require("./routes/postsRoute"));
app.use("/api/comments", require("./routes/commentRoute"));
app.use("/api/categories", require("./routes/categoryRoute"));

// 404
app.use((req, res) => {
  res.status(404).json({
    message: "Route Not Found",
  });
});

// Error Handler
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
});

// Run Server
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});