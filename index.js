const dbConnect = require("./db/dbConnect.js");
const UserRouter = require("./routes/UserRouter");
const PhotoRouter = require("./routes/PhotoRouter");
const AuthRouter = require("./routes/AuthRouter");
// const CommentRouter = require("./routes/CommentRouter");
const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "https://mhl537-3000.csb.app",
    credentials: true,
  })
);

dbConnect();

app.get("/", (req, res) => {
  res.send("API page");
});
app.use("/api/users", UserRouter);
app.use("/api/photos", PhotoRouter);
app.use("/api/admin", AuthRouter);

app.listen(8081, () => {
  console.log(`server listening on port 8081`);
});
