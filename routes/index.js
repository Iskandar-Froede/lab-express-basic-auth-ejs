const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

// router.get('/user-profile', (req, res) => {
//   console.log('SESSION =====> ', req.session)
//   if (req.session.user) {
//     res.render('user-profile', { user: req.session.user, isConnected: true })
//   } else {
//     res.redirect('/auth/login')
//   }
// })

module.exports = router;
