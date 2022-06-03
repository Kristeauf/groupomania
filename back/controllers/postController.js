
const fs = require('fs')
const db = require('../dbConfig')
 const Cookies = require('cookies')
const cryptojs = require('crypto-js')
const AES = require("crypto-js/aes")
exports.createPost = (req, res, next) => {
  const idUser = req.body.idUSERS;
  console.log(req.body);
  const username = req.body.username;


  let varImage = ""
  if (req.file) { varImage = `${req.protocol}://${req.get("host")}/images/${req.file.filename}` }
  const message = { messageTxt, varImage }





  sql = "INSERT INTO messages (idUSERS,message,username) VALUES (?, ?, ?); "
  sqlParams = [idUser, message, username]

  db.query(sql, sqlParams, (error, results, fields) => {
    if (error) { res.status(500).json({ error: error.sqlMessage }); }

    res.status(201).json({ message: "post créé" });

  })

};
// exports.createPost = (req, res, next) => {
//   console.log(req.body);
//   let varImage =""
//   if (req.file) { varImage = `${req.protocol}://${req.get("host")}/images/${req.file.filename}` }
//   const message = new Message(
//       {

//           message: req.body.message,
//           messageUrl: varImage
//       }
//   )
//   message.save()
//   console.log(message)
//       .then((retour) => res.status(201).json({ message: "Message créé !" }))
//       .catch(error => res.status(400).json({ error }))
//     }
exports.getAllPosts = (req, res, next) => {
  sql = "SELECT * from messages"
  db.query(sql, (error, results, fields) => {
    if (error) { res.status(500).json({ error: error.sqlMessage }); }
    console.log(results);
    res.status(200).json({ message: "posts récupérés" });

  })

};
exports.getOnePost = (req, res, next) => {

  const id = req.params.id;

  sql = `SELECT * FROM messages WHERE idMESSAGES = ?;`
  sqlParams = `${id}`
  db.query(sql, sqlParams, (error, results, fields) => {
    if (error) { res.status(500).json({ error: error.sqlMessage }); }

    res.status(200).json({ message: "post récupéré" });
    console.log(results);

  })

};
exports.deletePost = (req, res, next) => {
  
  const id = req.params.id;
  sql = `DELETE  FROM messages WHERE idMESSAGES = ?;`;
  sqlParams = `${id}`;
  const cryptedCookie = new Cookies.get("snToken");
  console.log(cryptedCookie);
  const userId = JSON.parse(
    cryptojs.AES.decrypt(cryptedCookie, process.env.COOKIE_KEY).toString(
      cryptojs.enc.Utf8
    )
  ).userId;
 
  

  db.query(sql, sqlParams, (error, results, fields) => {
    if (error) { res.status(500).json({ error: error.sqlMessage }); }
    res.status(200).json({ message: "post supprimé" });console.log(res);
  })

}