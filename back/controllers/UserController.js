const bcrypt = require('bcrypt')
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const db = require('../dbconfig')



exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
           
            const userName = req.body.userName;
            const email = req.body.email;
            const password = hash;
            // const query = (`INSERT INTO user (userName, email, password) VALUES('${userName}','${email}','${password}')`)

            const sql ="INSERT INTO User (userName, email, password) VALUES (?, ?, ?);"
            const sqlParams = [userName, email, password];
           db.query(sql, sqlParams, (error, results, fields) => {
                if (error) {
                  if (error.errno === 1062) {
                    res.status(403).json({ error: "email ou nom d'utilisateur deja utilisé" });
                  } else {
                    res.status(500).json({ error: error.sqlMessage });
                  }
                } else {
                  res.status(201).json({ message: "Utilisateur créé" });
                }
                });
               
            
        });

}
//  const sql ="INSERT INTO Users (name, email, password, isadmin) VALUES (?, ?, ?);";
// const sqlParams = [userName, email, password];

// connection.execute(sql, sqlParams, (error, results, fields) => {
// if (error) {
//   if (error.errno === 1062) {
//     res.status(403).json({ error: "L'email est déjà utilisé !" });
//   } else {
//     res.status(500).json({ error: error.sqlMessage });
//   }
// } else {
//   res.status(201).json({ message: "Utilisateur créé" });
// }
// });
// connection.end();
// const dbUser = db.query(`INSERT INTO user (userName, email, password) VALUES('${userName}','${email}','${password}')`)

//                 .then(() =>

//                     res.status(201).json({ message: 'Utilisateur créé !' }))

//                 .catch(error => res.status(400).json({ error }));
//         })
//         .catch(error => res.status(500).json({ error }));

exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {

            if (!user) {
                return res.status(403).json({ error: 'utilisateur introuvable' })
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'mot de passe invalide' })
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            process.env.TOKEN,
                            { expiresIn: '24h' }
                        )
                    })
                })
                .catch(error => res.status(500).json({ error }))
        })
        .catch(error => res.status(500).json({ error }))
}

