const User = require('../../models/schemas/User');

async function create(data = {}) {
  try {
    const user = new User(data);
    await user.save();

    return user;
  }
  catch (err) {
    throw err;
  }
};

async function getList(query = {}) {
  try {
    const users = await User.find(query);
    return users;
  }
  catch (err) {
    throw err;
  }
};

async function getOne(query = {}) {
  try {
    const user = await User.findOne(query);
    return user;
  }
  catch (err) {
    throw err;
  }
}

async function getOneByEmail(email = null) {
  try {
    const user = await User.findOne({ email });
    return user;
  }
  catch (err) {
    throw err;
  }
};

async function isRegisteredWithEmail(email) {
  try {
    const count = await User.countDocuments({ email });

    return !!count;
  }
  catch (err) {
    throw err;
  }
}

async function getRecoveryAttemptCountByEmail(email) {
  const result = await User.aggregate([
    {
      $match: { email }
    },
    {
      $lookup: {
        from: 'password-recovery',
        localField: 'email',
        foreignField: "email",
        as: "rec"
      }
    },
    {
      $project: {
        count: { $size: "$rec" },
        _id: 0
      }
    }
  ]).exec();

  if (!result.length) return null;

  return result[0]?.count ?? 0;
}


module.exports = {
  create,
  getList,
  getOne,
  getOneByEmail,
  isRegisteredWithEmail,
  getRecoveryAttemptCountByEmail,
};
