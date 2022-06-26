const { usersModel, clientsModel } = require('../models');
const { generateJWT } = require('../middlewares');

const updateClientName = async (name, email) => {
  try {
    await clientsModel.updateClientName(name, email);

    const user = await usersModel.getUserByEmail(email);

    const { password, ...userData } = user;

    const { token } = generateJWT(userData);

    return {
      name: user.name,
      email: user.email,
      token,
      role: user.role,
    };
  } catch (err) {
    const { info } = err;

    return {
      err: { code: info.code, message: info.msg },
    };
  }
};

module.exports = {
  updateClientName,
};
