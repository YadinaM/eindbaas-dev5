// User model idea (no mongoose yet)
const User = {
    username: {
      type: String,
      required: true,
    },
    admin: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  };

module.exports = User;