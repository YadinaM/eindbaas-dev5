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

module.exports.index = index;