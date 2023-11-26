//const Shoe = require("../../../models/Shoe"); is not needed because we are not using a database yet.

const index = (req, res) => {
    res.json({
      status: "success",
      message: "GET shoes",
      data: [
        {
          username: "jokesbokes@gmail.com",
          shoeSize: "42",
          color: "red",
        
        },
      ],
    });
};
        

module.exports.index = index;