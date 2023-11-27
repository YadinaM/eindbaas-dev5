//const Shoe = require("../../../models/Shoe");

const Shoe = require("../../../models/Shoe");

//example of the model -> also in models but cannot use it yet because we are not using a database yet.
const sampleShoes = [
    ({ username: 'jokesbokes@gmail.com', shoeSize: '42', color: 'red', status: 'in progress', id: '1' }),
    ({ username: 'joskevermeulen@gmail.com', shoeSize: '48', color: 'blue', status: 'completed', id: '2' }),
];

const index = (req, res) => {
    res.json({
        status: "success",
        message: "GET shoes",
        data: [
            {
                shoes: sampleShoes,
            },
        ],
    });
};

const indexID = (req, res) => {
    let id = req.params.id;
    let shoe = sampleShoes.find((shoe) => shoe.id === id);
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
const create = (req, res) => {
    const { username, shoeSize, color, status } = req.body;

    // Create a new shoe object
    const newShoe = {
        username: username,
        shoeSize: shoeSize,
        color: color,
        status: status,
        // Add logic to generate a unique ID, if needed
        id: (sampleShoes.length + 1).toString(),
    };

    // Add the new shoe to the sampleShoes array
    sampleShoes.push(newShoe);

    res.json({
        status: "success",
        message: "POST a new shoe",
        data: {
            shoe: newShoe,
        },
    });
}

module.exports.index = index;
module.exports.indexID = indexID;
module.exports.update = update;
module.exports.create = create;