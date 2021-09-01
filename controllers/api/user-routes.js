const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const session = require('express-session');
const withAuth = require('../../utils/auth');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

router.get("/", (req, res) => {
  User.findAll({
    attributes: {
      exclude: ["password"],
    },
  })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  User.findOne({
    attributes: {
      exclude: ["password"],
    },
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Post,
        attributes: ["id", "title", "post_content"],
      },
      {
        model: Comment,
        attributes: ["id", "comment_text", "post_id", "user_id"],
        include: {
          model: Post,
          attributes: ["title"],
        },
      },
    ],
  })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: "No user with this id is found" });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/", (req, res) => {
  User.create({
    username: req.body.username,
    password: req.body.password
  }).then(userData => {
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.username = userData.username;
      req.session.loggedIn = true;

      res.json(userData);
    });
    }).catch(err => {
      console.log(err);
      res.status(500).json(err);
  });
});

router.post("/login", (req, res) => {
  User.findOne({
    where: {
      username: req.body.username
    }
  })
    .then(userData => {
      if(!userData){
        res.status(400).json({message: 'this username is incorrect'}); return;
      }
      const validpwd = userData.checkPassword(req.body.password);
      if(!validpwd){
        res.status(400).json({message: 'Incorrect password'});
        return;
      }
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.username = userData.username;
        req.session.loggedIn = true;
        res.json({user: userData, message: 'You are now logged in'});
      });
    });
    });

    router.post('/logout', withAuth,(req, res) => {
      if(req.session.loggedIn){
        req.session.destroy(() => {
          res.status(204).end()
        })
      }
      else{res.status(404).end();
      }
    });

module.exports = router;
