const { connection } = require('./connection');

const getUserByEmail = async (email) => connection()
  .then((db) => db
    .getTable('users')
    .select(['id', 'name', 'email', 'password', 'role'])
    .where('email = :email')
    .bind('email', email)
    .execute())
  .then((result) => result.fetchAll()[0])
  .then((user) => {
    if (!user) return null;
    const [id, name, userEmail, password, role] = user;
    return {
      id,
      name,
      email: userEmail,
      password,
      role,
    };
  });

const registerUser = async (name, email, password, role) => connection().then((db) => db
  .getTable('users')
  .insert(['name', 'email', 'password', 'role'])
  .values(name, email, password, role)
  .execute());

module.exports = {
  getUserByEmail,
  registerUser,
};
