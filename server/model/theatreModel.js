const mongoose = require("mongoose");

const theatresSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phoneno: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    isActive: {
      type: Boolean,
      default: false,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("theatres", theatresSchema);
