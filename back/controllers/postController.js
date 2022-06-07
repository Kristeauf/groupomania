const fs = require('fs')
const db = require('../dbConfig')
const Cookies = require('cookies')
const cryptojs = require('crypto-js')
const AES = require("crypto-js/aes")

/**
 * Ajout d'une nouvelle publication
 */
exports.newPost = (req, res, next) => {

  const connection = db.connect();
  console.log(req.file);
  const cryptedCookie = new Cookies(req, res).get("snToken");
  const userId = JSON.parse(
    cryptojs.AES.decrypt(cryptedCookie, process.env.COOKIE_KEY).toString(
      cryptojs.enc.Utf8
    )
  ).userId;


  const message = req.body.message ? req.body.message : null;
  const imageUrl = req.body.imageUrl || "";
  let image = "";

  if (req.file) { image = `${req.protocol}://${req.get("host")}/images/${req.file.filename}` }

  const sql =
    "INSERT INTO messages (idUSERS, message, imageUrl, file)\
  VALUES (?, ?, ?, ?);";
  const sqlParams = [userId, message, imageUrl, image];

  connection.execute(sql, sqlParams, (error, results, fields) => {
    if (error) {
      res.status(500).json({ error: error.sqlMessage });
    } else {
      console.log(results);
      res.status(201).json({ message: "Publication ajoutée" });
    }
  });

  connection.end();
};




exports.getAllPosts = (req, res, next) => {
  const connection = db.connect();
  sql = "SELECT * from messages"
  connection.execute(sql, (error, results, fields) => {
    if (error) { res.status(500).json({ error: error.sqlMessage }); }
    console.log(results);
    res.status(200).json({ message: "posts récupérés" });

  })
  connection.end()
};
exports.getOnePost = (req, res, next) => {
  const connection = db.connect();
  const id = req.params.id;
  console.log(id);

  sql = `SELECT * FROM messages WHERE idMESSAGES = ?;`
  sqlParams = `${id}`
  connection.execute(sql, [sqlParams], (error, results, fields) => {
    if (error) { res.status(500).json({ error: error.sqlMessage }); }
    console.log(results);
    res.status(200).json({ message: "post récupéré" });


  })
  connection.end()

};
exports.deletePost = (req, res, next) => {

  console.log(req.file);
  const connection = db.connect();
  const id = req.params.id;
  sql = 'SELECT * FROM messages WHERE idMESSAGES = ?;'
  sqlParams = [`${id}`];
  connection.execute(sql, sqlParams, (error, results, fields) => {





    if (error) { res.status(500).json({ error: error.sqlMessage }); }
    const messageOwner = results[0].idUSERS;

    const cryptedCookie = new Cookies(req, res).get("snToken");

    const userId = JSON.parse(
      cryptojs.AES.decrypt(cryptedCookie, process.env.COOKIE_KEY).toString(
        cryptojs.enc.Utf8
      )
    ).userId;
    console.log(userId);

    if (messageOwner === userId) {
      
      console.log(messageOwner);
      const img = results[0].file
      if (img) {
        const filename = img.split('/images/')[1];
        console.log(filename);
        fs.unlinkSync(`images/${filename}`)


      }

      sql = `DELETE  FROM messages WHERE idMESSAGES = ?;`;
      sqlParams = [`${id}`];
      connection.execute(sql, sqlParams, (error, results, fields) => {
        if (error) { res.status(500).json({ error: error.sqlMessage }); }


        res.status(200).json({ message: "post supprimé" });

      });

    } else { res.status(401).json({ message: "forbidden" }) };

    connection.end()
  });
}





