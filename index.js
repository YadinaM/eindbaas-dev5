const port = 3000;

const express = require("express");
const app = express();
app.use(express.json());

const cors = require("cors");
app.use(cors());

const shoesRouter = require("./routes/api/v1/shoes");
const usersRouter = require("./routes/api/v1/users");

app.use("/api/v1/shoes", shoesRouter);
app.use("/api/v1/users", usersRouter);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});