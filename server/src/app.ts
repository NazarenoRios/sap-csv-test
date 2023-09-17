import express from "express";
import cors from "cors";

// Express Route File Requires
import routes from "./routes";

const app = express();
const port = 5000;

// Express Routing
app.use("/api", routes);

app.use(cors());

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
