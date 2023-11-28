//const Shoe = require("../../../models/Shoe");

const Shoe = require("../../../models/Shoe");

//example of the model -> also in models but cannot use it yet because we are not using a database yet.
const sampleShoes = [
    ({ username: 'jokesbokes@gmail.com', shoeSize: '42', color: 'red', status: 'in progress', id: '1' }),
    ({ username: 'joskevermeulen@gmail.com', shoeSize: '48', color: 'blue', status: 'completed', id: '2' }),
];

const index = async (req, res) => {
    try {
      const shoes = await Shoe.find({});
      res.json({
        status: "success",
        message: "GET shoes",
        data: [
          {
            shoes: shoes,
          },
        ],
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: "error",
        message: "Internal Server Error",
      });
    }
};

const indexID = async(req, res) => {
    let id = req.params.id;
    let shoe = await Shoe.findById(id);
    //let shoe = sampleShoes.find((shoe) => shoe.id === id);
    res.json({
        status: "success",
        message: `GET shoe with ID ${id}`,
        data: [
            {
                shoe: shoe,
            },
        ],
    });
};

//update status of the shoe
const update = (req, res) => {
    let id = req.params.id;
    let shoe = sampleShoes.find((shoe) => shoe.id === id);

    shoe.status = req.body.status;

    res.json({
        status: "success",
        message: `UPDATE shoe status with ID ${id}`,
        data: [
            {
                shoe: shoe,
            },
        ],
    });
};

//post shoe

const create = async (req, res) => {
    const { name, username, shoeSize, color, status } = req.body;

    try {
        // Create a new shoe object using the Mongoose model
        const newShoe = new Shoe({
            name,
            username,
            shoeSize,
            color,
            status,
        });

        // Save the new shoe to the database
        const savedShoe = await newShoe.save();

        res.json({
            status: "success",
            message: "POST a new shoe",
            data: {
                shoe: savedShoe,
            },
        });
    } catch (error) {
        console.error(`Error creating shoe: ${error.message}`);
        res.status(500).json({
            status: "error",
            message: "Failed to create a new shoe",
            error: error.message,
        });
    }
}

//delete

const remove = (req, res) => {
    const id = req.params.id;
    const index = sampleShoes.findIndex((shoe) => shoe.id === id);

    // Check if the shoe with the given ID exists
    if (index !== -1) {
        // Remove the shoe from the sampleShoes array
        const deletedShoe = sampleShoes.splice(index, 1)[0];

        res.json({
            status: "success",
            message: `DELETE shoe with ID ${id}`,
            data: {
                shoe: deletedShoe,
            },
        });
    } else {
        res.status(404).json({
            status: "error",
            message: `Shoe with ID ${id} not found`,
        });
    }
};

module.exports.index = index;
module.exports.indexID = indexID;
module.exports.update = update;
module.exports.create = create;
module.exports.remove = remove;