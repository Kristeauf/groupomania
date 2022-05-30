
const fs = require('fs')
const db = require('../dbConfig')
exports.createPost = (req, res, next) => {
  const idUser = req.body.idUSERS;

  console.log(req.body);

  // console.log(message);




  const username = req.body.username;
  //  messTxt = req.body.message
  // let varImage =""
  // if (req.file) { varImage = `${req.protocol}://${req.get("host")}/images/${req.file.filename}` }
  const message = req.body.message;




  sql = "INSERT INTO messages (idUSERS,message,username) VALUES (?, ?, ?); "
  sqlParams = [idUser, message, username]

  db.query(sql, sqlParams, (error, results, fields) => {
    if (error) { res.status(500).json({ error: error.sqlMessage }); }

    res.status(201).json({ message: "post créé" });

  })

};
exports.getAllPosts = (req, res, next) => {
sql = "SELECT * from messages" 
  db.query(sql, (error, results, fields) => {
    if (error) { res.status(500).json({ error: error.sqlMessage }); }
console.log(results);
    res.status(201).json({ message: "posts récupérés" });

  }) 
   
};
exports.getOnePost = (req, res, next) => {
 
  const id = req.params.id;
  
  sql = `SELECT * FROM messages WHERE idMESSAGES='${id}';` 
    db.query(sql, (error, results, fields) => {
      if (error) { res.status(500).json({ error: error.sqlMessage }); }
  
      res.status(201).json({ message: "post récupéré" });
  
    }) 
     
  };