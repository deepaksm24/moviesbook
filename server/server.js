const express = require("express");
const app = express();
require("dotenv").config();
const dbconfig = require("./config/dbcongig");
const mongoose = require("mongoose");

const usersRoute = require("./routes/usersRoute");
const moviesRoute = require("./routes/moviesroute");
const theatresRoute = require("./routes/theatresroute");
const bookingsRoute = require("./routes/bookingsroute");
const bookingsRoute2 = require("./routes/bookingroute2");

//to enable proxy
// const cors = require("cors");
// const corsOptions = {
//   origin: "http://localhost:3000",
//   credentials: true, //access-control-allow-credentials:true
//   optionSuccessStatus: 200,
// };

// app.use(cors(corsOptions));

app.use(express.json());

app.use("/users", usersRoute);

app.use("/movies", moviesRoute);

app.use("/theatres", theatresRoute);

app.use("/movie/:id/book-show/bookings", bookingsRoute);
app.use("/movie/:id/book-show/movie/:id2/book-show/bookings", bookingsRoute2);

const port = process.env.PORT || 5000;

const path = require("path");
_dirname = path.resolve();
//render
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(_dirname, "/client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(_dirname, "client", "build", "index.html"));
  });
}

app.listen(port, () => {
  console.log(`Server listening at Port ${process.env.PORT}`);
});
