const router = require("express").Router()
const bcrypt = require('bcryptjs')
const User = require("../models/User.model")
const fileUploader = require('../config/cloudinary.config')
const transporter = require("../config/transporter.config")
const { hasNumber } = require("../utils/index")
const saltRounds = 10

User.syncIndexes();

///////////////////////  A U T H  C R E A T E   U S E R ///////////

router.get('/sign-up', (req, res, next) => res.render('auth/auth-signin'))

router.post('/sign-up', fileUploader.single("imgFile"), (req, res, next) => {

    const { username, email, pwd1, pwd2, imgFile } = req.body

    User
        .findOne({ username })
        .then(result => {

            if (result) {

                req.body.errorMessage = "This username is already in use"

                res.render('auth/auth-signin', req.body)
                return;
            }

            else {
                return bcrypt.genSalt(saltRounds)
            }
        })
        //salta aquí, intenta ejecutar el hash, da error a pesar de que debería saltar el res.render del if

        .then(salt => salt && bcrypt.hash(pwd1, salt))
        .then(hashedPassword => {

            return User.create({
                ...req.body, password: hashedPassword,
                profileImg: req.file?.path || '/res.cloudinary.com/dpfx8essu/image/upload/v1644855394/kcijzssglljtiteaklva.png'
            })
        })
        .then(() => {
            transporter.sendMail({
                from: "imdbprojectteam@gmail.com",
                to: email,
                subject: `Welcome to IMDBProject!`,
                text: `${username}, welcome to IMDBProject! Your Password is ${pwd1}`,
                html: "<p>" + `${username}, welcome to IMDBProject! Your Password is ${pwd1}` + "</p>"
            })

            res.redirect('/')
        })

        .catch(error => next(error))
})

/////////////////////// A U T H    L O G   I N  /////////////////////////
router.get('/log-in', (req, res, next) => res.render('auth/auth-login'))

router.post('/log-in', (req, res, next) => {

    const { username, pwd1 } = req.body

    User
        .findOne({ username })
        .then(user => {
            if (!user) {
                req.body.errorMessage = "User not found"
                res.render('auth/auth-login', req.body)
                return
            } else if (bcrypt.compareSync(pwd1, user.password) === false) {
                req.body.errorMessage = "Invalid password"
                res.render('auth/auth-login', req.body)

                return
            } else {

                req.session.currentUser = user
                res.redirect("/")
            }
        })
        .catch(error => next(error))
})

//////////////////////////  A U T H    L O G   O U T   /////////////////////
router.post('/log-out', (req, res, next) => {
    req.session.destroy(() => res.redirect('/auth/log-in'))
})

module.exports = router
