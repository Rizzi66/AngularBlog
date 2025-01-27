const express = require("express");
const router = express.Router();
const articleController = require("../controllers/articleController");
const auth = require("../middelware/auth");

// Routes
router.get("/", articleController.getArticles);
router.post("/", articleController.createArticle);

module.exports = router;
