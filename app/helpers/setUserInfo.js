/**
 * Creates an object with user info
 * @param {Object} req - request object
 */
const setUserInfo = (req = {}) => {
  return new Promise((resolve) => {
    let user = {
      _id: req._id,
      name: req.name,
      email: req.email,
      phone: req.phone,
      street: req.street,
      apartament: req.apartament,
      city: req.city,
      zip: req.zip,
      country: req.country,
      role: req.role,
    }
    // Adds verification for testing purposes
    // if (process.env.NODE_ENV !== 'production') {
    //   user = {
    //     ...user,
    //     verification: req.verification
    //   }
    // }
    resolve(user)
  })
}

module.exports = { setUserInfo }