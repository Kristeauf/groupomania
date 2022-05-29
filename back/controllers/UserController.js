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
            const sql = "INSERT INTO User (userName, email, password) VALUES (?, ?, ?);"
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

exports.login = (req, res, next) => {

    const researchedEmail = req.body.email;
    const sql = "SELECT id,userName, email, password FROM user WHERE email= ?";
    const sqlParams = [researchedEmail];

    db.query(sql, sqlParams, (error, results, fields) => {

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
                    res.status(200).json({
                        id: results[0].id,
                        token: jwt.sign(
                            { id: results[0].id },
                            process.env.TOKEN,
                            { expiresIn: '24h' }
                        )
                    })
                }).catch(error => res.status(500).json({ error }))
        }
    })
}


