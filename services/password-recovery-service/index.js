const PasswordRecovery = require('../../models/schemas/PasswordRecovery');

async function create(data = {}) {
  try {
    const pwRecovery = new PasswordRecovery(data);
    await pwRecovery.save();

    return pwRecovery;
  }
  catch (err) {
    throw err;
  }
};

async function getList(query = {}) {
  try {
    const pwRecoveries = await PasswordRecovery.find(query);
    return pwRecoveries;
  }
  catch (err) {
    throw err;
  }
};

async function getOne(query = {}) {
  try {
    const pwRecovery = await PasswordRecovery.findOne(query);
    return pwRecovery;
  }
  catch (err) {
    throw err;
  }
}

async function clean(email) {
  try {
    await PasswordRecovery.deleteMany({ email });
    return true;
  }
  catch (err) {
    throw err;
  }
};



module.exports = {
  create,
  getList,
  getOne,
  clean
};
