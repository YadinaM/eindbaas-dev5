// Shoe model idea (no mongoose yet)
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ShoeSchema = new Schema ( {
    /*name: {
        type: String,
        required: true,
    },
    username: {
      type: String,
      required: true,
    },*/
    shoeSize: {
      type: String,
      required: true,
    },
    colorLaces: {
      type: String,
      required: true,
    },
    colorSole:{
      type: String,
      required: true,
    },
    colorOutside: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: 'in progress'
    },
    quantity: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
});

const Shoe = mongoose.model('Shoe', ShoeSchema);
module.exports = Shoe;
  
