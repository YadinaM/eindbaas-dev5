const User = require("../../../models/User");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { MongoGridFSChunkError } = require("mongodb");
require('dotenv').config();

const secretKey = process.env.JWT_SECRET;

const generateToken = (userId, admin) => {
  return jwt.sign({ userId, admin }, secretKey, { expiresIn: '1h' });
};

const sampleUsers = [
    ({ username: 'jokesbokes@gmail.com', admin: 1, password: 'ikzegmaarwat',  id: '1' }),
    ({ username: 'joskevermeulen@gmail.com', admin: 0, password:"ikzegookmaarwat", id: '2' }),
];

const index = async (req, res) => {
    try {
        const users = await User.find();

        res.json({
            status: "success",
            message: "GET users",
            data: {
                users: users,
            },
        });
    } catch (error) {
        console.error(`Error fetching users: ${error.message}`);
        res.status(500).json({
            status: "error",
            message: "Failed to fetch users",
            error: error.message,
        });
    }
};

const indexID = async (req, res) => {
    let id = req.params.id;

    try {
        // Find the user by ID in the database
        const user = await User.findById(id);
        const token = generateToken(user._id);

        if (user) {
            res.json({
                status: "success",
                message: `GET user with ID ${id}`,
                data: {
                    user: user,
                    token: token,
                },
            });
        } else {
            res.status(404).json({
                status: "error",
                message: `User with ID ${id} not found`,
            });
        }
    } catch (error) {
        console.error(`Error fetching user: ${error.message}`);
        res.status(500).json({
            status: "error",
            message: `Failed to fetch user with ID ${id}`,
            error: error.message,
        });
    }
};

const create = async (req, res) => {
    const { username, admin, password } = req.body;

    try {
      if (typeof password !== 'string') {
        throw new Error('Invalid password format');
    }
      const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            admin,
            password: hashedPassword,
        });

        const savedUser = await newUser.save();
        const token = generateToken(savedUser._id);

        res.json({
            status: "success",
            message: "POST a new user",
            data: {
                user: savedUser,
                token: token,
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

const update = async (req, res) => {
  const id = req.params.id;

  let { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return res.status(400).json({
      status: "error",
      message: "Please provide both current and new password",
    });
  }

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: `User with ID ${id} not found`,
      });
    }

    const passwordMatch = await bcrypt.compare(currentPassword, user.password);

    if (!passwordMatch) {
      return res.status(401).json({
        status: "error",
        message: "Invalid current password",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.json({
      status: "success",
      message: `Updated user password with ID ${id}`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};



const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        const token = generateToken(user._id, user.admin);
        console.log('Generated Token:', token);
        res.json({
          status: "success",
          message: "Login successful",
          data: {
            username,
            admin: user.admin, // Include the admin field in the response
            token,
          },
        });
      } else {
        res.status(401).json({
          status: "error",
          message: "Invalid password",
        });
      }
    } else {
      res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }
  } catch (error) {
    console.error(`Error during login: ${error.message}`);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
      error: error.message,
    });
  }
}

module.exports.index = index;
module.exports.indexID = indexID;
module.exports.create = create;
module.exports.remove = remove;
module.exports.update = update;
module.exports.login = login;