const User = require("../../../models/User");

const sampleUsers = [
    ({ username: 'jokesbokes@gmail.com', admin:"yes", password: 'ikzegmaarwat',  id: '1' }),
    ({ username: 'joskevermeulen@gmail.com', admin:"no", password:"ikzegookmaarwat", id: '2' }),
];

const index = (req, res) => {
    res.json({
        status: "success",
        message: "GET users",
        data: [
            {
                users: sampleUsers,
            },
        ],
    });
};

const indexID = (req, res) => {
    let id = req.params.id;
    let user = sampleUsers.find((user) => user.id === id);
    res.json({
        status: "success",
        message: `GET user with ID ${id}`,
        data: [
            {
                user: user,
            },
        ],
    });
};

module.exports.index = index;
module.exports.indexID = indexID;