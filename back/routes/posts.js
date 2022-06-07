 const express = require("express");
 const router = express.Router();
 const postCtrl = require("../controllers/postController.js");
 const auth = require("../middleware/auth");
 const multer = require("../middleware/multer-config");

 router.post("/", auth, multer, postCtrl.newPost);

 router.get("/", auth, postCtrl.getAllPosts);

 router.get("/:id", auth, postCtrl.getOnePost);
// router.put("/:id", auth, multer, postCtrl.modifyPost);
 router.delete("/:id", auth, postCtrl.deletePost);

 module.exports = router;