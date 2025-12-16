const express = require("express");
const session = require("express-session");
const app = express();
const cors = require("cors");
const dbConnect = require("./db/dbConnect.js");
const dbLoad = require("./db/dbLoad.js");
const UserRouter = require("./routes/UserRouter");
const PhotoRouter = require("./routes/PhotoRouter");
const AuthRouter = require("./routes/AuthRouter");
const authMiddleware = require("./middleware/authMiddleware");

// const CommentRouter = require("./routes/CommentRouter");

// dbLoad();
dbConnect();

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(express.json());
app.use(
  session({
    secret: "my_key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 60 * 30 * 1000,
    },
  })
);

app.get("/", (req, res) => {
  res.send("API page");
});

// Các route
app.use("/api/users", UserRouter);
app.use("/api/photos", PhotoRouter);
app.use("/api/admin", AuthRouter);
app.listen(8081, () => {
  console.log("server listening on port 8081");
});
