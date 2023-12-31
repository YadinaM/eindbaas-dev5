const express = require("express");
const http = require("http");
const Primus = require("primus");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const port = 3000;

const app = express();
app.use(express.json());
app.use(cors());

//const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB);
console.log(process.env.MONGODB);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => console.log("We're connected!"));

const shoesRouter = require("./routes/api/v1/shoes");
const usersRouter = require("./routes/api/v1/users");

app.use("/api/v1/shoes", shoesRouter);
app.use("/api/v1/users", usersRouter);

const server = http.createServer(app);
const primus = new Primus(server, {
    transformer: 'websockets',
    path: '/primus',
});

require("./Primus/live").go(primus);

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
