const User = require("../models/user");

exports.createOrUpdateUser = async (req, res) => {
  const { email } = req.user;

  const user = await User.findOneAndUpdate(
    { email },
    { name: email.split("@")[0] },
    { new: true }
  );

  if (user) {
    console.log("USER UPDATED", user);
    res.json(user);
  } else {
    const newUser = await new User({
      email,
      name: email.split("@")[0],
    }).save();
    console.log("USER CREATED", newUser);
  }
};

exports.currentUser = async (req, res) => {};
