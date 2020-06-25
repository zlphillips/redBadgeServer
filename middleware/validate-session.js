// import jwt = require('jsonwebtoken'); 
// if you get an error stating something is being redeclared, switch it from a const to a var or let
// import User from '../db.tsx';
// import Models from '../models/user.tsx';

// const validateSession = (req, res, next) => { 
//     const token = req.headers.authorization;
//     console.log(token)
//     jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
//         if (!err && decodedToken) {
//             User.findOne({ where: {id: decodedToken.id}})
//             .then(user => {
//                 if (!user) throw 'err';
//                 req.user = user;
//                 return next();
//             })
//             .catch(err => next(err));
//         } else {
//             req.errors = err;
//             res.status(401).send("This is a bad token")
//         }
//     })
// };

// module.exports = validateSession;