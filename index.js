const port = 3000;

const express = require("express");
const app = express();
app.use(express.json());

const cors = require("cors");
app.use(cors());

const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/shoes");
/*mongoose.connect("mongodb://localhost:27017/shoes", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});*/

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => console.log("We're connected!"));

const shoesRouter = require("./routes/api/v1/shoes");
const usersRouter = require("./routes/api/v1/users");

app.use("/api/v1/shoes", shoesRouter);
app.use("/api/v1/users", usersRouter);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});