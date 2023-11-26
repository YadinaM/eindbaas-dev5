// Shoe model idea (no mongoose yet)
const Shoe = {
    username: {
      type: String,
      required: true,
    },
    shoeSize: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  };

module.exports = Shoe;
  
