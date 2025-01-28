const Article = require("../models/Article");

exports.getArticles = (req, res) => {
  Article.find()
    .then((articles) => {
      res.status(200).json(articles);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

exports.createArticle = (req, res) => {
  const article = new Article({
    title: req.body.title,
    content: req.body.content,
  });

  article
    .save()
    .then(() => {
      res.status(201).json({ message: "Article créé !" });
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};
