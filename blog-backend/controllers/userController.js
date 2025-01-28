const User = require("../models/User");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const dotenv = require("dotenv").config().parsed;
const { createToken } = require("../middelware/token");

exports.getAllUsers = (req, res) => {
  User.find()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

exports.updateUserRole = (req, res) => {
  const userId = req.params.id;
  const newRole = req.body.role;

  User.findByIdAndUpdate(userId, { role: newRole }, { new: true })
    .then((updatedUser) => {
      if (!updatedUser) {
        return res.status(404).json({ message: "Utilisateur non trouvé" });
      }
      res
        .status(200)
        .json({ message: "Rôle mis à jour avec succès", user: updatedUser });
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.deleteUser = (req, res) => {
  const userId = req.params.id;
  User.findByIdAndDelete(userId)
    .then(() =>
      res.status(200).json({ message: "Utilisateur supprimé avec succès !" })
    )
    .catch((error) => res.status(500).json({ error }));
};

exports.createUser = (req, res) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        name: req.body.name,
        password: hash,
        role: "user",
      });

      user
        .save()
        .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.login = (req, res) => {
  //Recherche du nom en BDD
  User.findOne({ name: req.body.name })
    .then((user) => {
      if (!user) {
        return res
          .status(401)
          .json({ message: "Paire login/mot de passe incorrecte" });
      }
      //Comparaison du mot de passe avec celui en BDD
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res
              .status(401)
              .json({ message: "Paire login/mot de passe incorrecte" });
          }

          // Création du token
          const token = createToken(
            user._id.toString(),
            dotenv.SECRET_KEY,
            req
          ).then((token) => {
            //Renvoi du response avec le token
            res.status(200).json({
              token: token,
              role: user.role,
            });
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
