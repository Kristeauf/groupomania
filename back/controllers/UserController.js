const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const db = require('../dbconfig')
const cryptojs = require('crypto-js')
const Cookies = require("cookies");
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)

        .then(hash => {
            // instancier la connection
            const connection = db.connect();
            const userName = req.body.userName;
            const email = req.body.email;
            const password = hash;
            const sql = "INSERT INTO user (userName, email, password) VALUES (?, ?, ?);"
            const sqlParams = [userName, email, password];

            connection.query(sql, sqlParams, (error, results, fields) => {
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

exports.login = (req, res, next) => {
    //instance de la connection
    const connection = db.connect();
    const researchedEmail = req.body.email;
    const sql = "SELECT id,userName, email, password FROM user WHERE email= ?";
    const sqlParams = [researchedEmail];

    connection.query(sql, sqlParams, (error, results, fields) => {

        if (error) {
            res.status(500).json({ error: error.sqlMessage })
        }
        else if (results.length == 0 || results[0].userName != req.body.userName) {
            res.status(401).json({ error: "Nom d'utilisateur ou email incorrect!" });
        }
        else {
            const hash = results[0].password;
            bcrypt.compare(req.body.password, hash)
                .then(valid => {

                    if (!valid) {
                        return res.status(401).json({ error: 'mot de passe invalide' })
                    }

                    const newToken = jwt.sign(
                        { userId: results[0].id },
                        process.env.JWT_KEY,
                        { expiresIn: "24h" }
                    );

                    // Envoi du token & userId dans un cookie
                    // const cookieContent = {
                    //     token: newToken,
                    //     userId: results[0].id,
                    // };

                    // const cryptedCookie = cryptojs.AES.encrypt(
                    //     JSON.stringify(cookieContent),
                    //     process.env.COOKIE_KEY
                    // ).toString();
                    // new Cookies(req, res).set("snToken", cryptedCookie, {
                    //     httpOnly: true,
                    //     maxAge: 3600000, // 1 heure
                    // });

                    res.status(200).json({
                        id: results[0].id,
                        userName:results[0].userName,
                        Token:newToken,
                        message: 'utlilisateur connecté',
                       
                    })


                }).catch(error => res.status(500).json({ error }))
                connection.end();
        }
    })
}


/**
 * Logout d'un utilisateur
 */
 exports.logout = (req, res, next) => {
    // on remplace le cookie par un vide
    new Cookies(req, res).set("snToken", "", {
      httpOnly: true,
      maxAge: 1, // 1ms (= suppression quasi instantannée)
    });
    res.status(200).json({ message: "utilisateur déconnecté" });
  };