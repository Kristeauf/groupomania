require('dotenv').config();
// const jwt = require('jsonwebtoken');
// const Cookies = require('cookies');
// const cryptojs = require('crypto-js');

// module.exports = (req, res, next) => {
//   try {
//     const cryptedCookie = new Cookies(req, res).get('snToken');
//     const cookie = JSON.parse(cryptojs.AES.decrypt(cryptedCookie, process.env.COOKIE_KEY).toString(cryptojs.enc.Utf8));

//     const token = jwt.verify(cookie.token, process.env.JWT_KEY);

//     if (cookie.userId && cookie.userId !== token.userId) {
//       console.log("User ID non valable");
//       throw "User ID non valable";
//     } else {
//       next();
//     }
//   } catch (error) {
//     res.status(401).json({ error: 'Requête non authentifiée' });
//   }
// }
const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {
    try {
        // Get bearer token => Format expected in header: Bearer {token}
        const token = req.headers.authorization && req.headers.authorization.split(" ")[1];
        if (!token) {
            throw new Error("Token d'authentification manquant");
        }
        
        const { userId } = jwt.verify(token, process.env.JWT_KEY);
        
        // create an auth variable to check authorisation for following middlewares
        req.auth = { userId }; 

        next(); // Token is valid

    } catch (error) {
   res.status(500).json('erreur serveur')
    }
};