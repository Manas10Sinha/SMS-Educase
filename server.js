import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import routes from "./routes/routes.js";

dotenv.config();
const server = express();
server.use(cors());
server.use(express.json());

server.get("/", (req, res) => {
  res.send(
    "<center>Welcome to the API! <br> Hit the /api endpoint to access the routes from Postman Collection.</center>"
  );
});
server.use("/api", routes);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
