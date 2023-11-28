// Shoe model idea (no mongoose yet)
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ShoeSchema = new Schema ( {
    name: {
        type: String,
        required: true,
    },
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
});

const Shoe = mongoose.model('Shoe', ShoeSchema);
module.exports = Shoe;
  
