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
const indexID = async (req, res) => {
    let id = req.params.id;
    /*let shoe = await Shoe.findById(id);*/ //is not needed because we are not using a database yet.
    res.json({
        status: "success",
        message: "GET shoe by ID",
        data: [
            {
                username: "jokesbokes@gmail.com",
                shoeSize: "42",
                color: "red",
                /*when using db, we can use the schema to get the data from the db (model) instead of hardcoding it in the controller*/
            },
        ],
    });
}
const update = async (req, res) => {
    let id = req.params.id;
    /*let shoe = await Shoe.findById(id);*/
    res.json({
        status: "success",
        message: `UPDATE shoe status with ID ${id}`,
        /*data: [
            {
                //update status (in progress, sent, completed, etc.)
            },
        ],*/
    });
};
        
module.exports.index = index;
module.exports.indexID = indexID;
module.exports.update = update;