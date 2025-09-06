const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    username: String,
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: false,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    password: { type: String, required: true, minlength: 6 },
    role: { type: String, enum: ['membre', 'coach', 'admin'] },
    image_user: { type: String, default: "membre.png" },
    cv_User: { type: String },
    age: Number,
    status: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
    isBlocked: { type: Boolean, default: false },

    // Ajout du champ abonnement (référence à l'abonnement choisi)
    abonnement: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Abonnement",
      default: null
    }
  },
  { timestamps: true }
);

// 🔐 Hash du mot de passe avant sauvegarde
userSchema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});
module.exports = mongoose.model("User", userSchema);