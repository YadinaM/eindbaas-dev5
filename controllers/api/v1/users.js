const User = require("../../../models/User");

const sampleUsers = [
    ({ username: 'jokesbokes@gmail.com', admin: 1, password: 'ikzegmaarwat',  id: '1' }),
    ({ username: 'joskevermeulen@gmail.com', admin: 0, password:"ikzegookmaarwat", id: '2' }),
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

const create = async (req, res) => {
    const { username, admin, password } = req.body;

    try {
        const newUser = new User({
            username,
            admin,
            password
        });

        const savedUser = await newUser.save();

        res.json({
            status: "success",
            message: "POST a new user",
            data: {
                user: savedUser,
            },
        });
    } catch (error) {
        console.error(`Error creating user: ${error.message}`);
        res.status(500).json({
            status: "error",
            message: "Failed to create a new user",
            error: error.message,
        });
    }
}

const remove = async (req, res) => {
    try {
      const id = req.params.id;
      const user = await User.findByIdAndDelete(id);
  
      if (user) {
        res.json({
          status: "success",
          message: `Deleted user with ID ${id}`,
          data: {
            user: user,
          },
        });
      } else {
        res.status(404).json({
          status: "error",
          message: `User with ID ${id} not found`,
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: "error",
        message: "Internal Server Error",
      });
    }
};

//update password of the user, no hashing needed
const update = async (req, res) => {
    try {
      const id = req.params.id;
      const user = await User.findById(id);
      user.password = req.body.password; //only update the password
      await user.save();
  
      res.json({
        status: "success",
        message: `Updated user password with ID ${id}`,
        data: [
          {
            user: user,
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



module.exports.index = index;
module.exports.indexID = indexID;
module.exports.create = create;
module.exports.remove = remove;
module.exports.update = update;