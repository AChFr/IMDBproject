const router = require("express").Router()
const bcrypt = require('bcryptjs')
const User = require("../../models/User.model")
const fileUploader = require('../../config/cloudinary.config')
const transporter = require("../../config/transporter.config")
const { hasNumber } = require("../../utils/index")
const saltRounds = 10

User.syncIndexes();

///////////////////////  A U T H  C R E A T E   U S E R ///////////

router.get('/sign-up', (req, res, next) => res.render('auth/auth-signin'))

router.post('/sign-up', fileUploader.single("imgFile"), (req, res, next) => {


    const { username, email, pwd1, pwd2, imgFile, } = req.body


    // if (pwd1.length < 8) {
    //     req.body.errorMessage = "The password must be at least 8 characters long"
    //     res.render('auth/auth-signin', req.body)}
    // else if (!hasNumber(pwd1)) {
    //     req.body.errorMessage = "The password must contain a number"
    //     console.log(req.body)
    //     res.render('auth/auth-signin', req.body)}

    //else
    if (pwd1 !== pwd2) {
        req.body.errorMessage = "the passwords do not match"
        res.render('auth/auth-signin', req.body)
        return;
    }


    else {
        User

            .findOne({ username })
            .then(result => {


                //por alguna razon, a pesar de entrar en el if, no hace el res render

                if (result) {

                    req.body.errorMessage = "This username is already in use"
                    console.log(" E S T O    E S     E L   REQ ", req.body)
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
                console.log('asdfasdfasdfasdfasdfasdfasdf')
                return User.create({
                    ...req.body, password: hashedPassword,
                    profileImg: req.file?.path || 'https://res.cloudinary.com/dpfx8essu/image/upload/v1644855394/kcijzssglljtiteaklva.png'
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
    }
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
                res.render('index')
            }
        })
        .catch(error => next(error))
})


//////////////////////////  A U T H    L O G   O U T   /////////////////////
router.post('/log-out', (req, res, next) => {
    req.session.destroy(() => res.redirect('/log-in'))
})

module.exports = router
