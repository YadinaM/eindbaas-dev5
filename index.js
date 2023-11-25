const port = 3000;

const express = require("express");
const app = express();
app.use(express.json());

const cors = require("cors");
app.use(cors());

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});