const router = require("express").Router()
const bcrypt = require('bcryptjs')
const User = require("../../models/User.model")
const fileUploader = require('../../config/cloudinary.config')
const transporter = require("../../config/transporter.config")
const saltRounds = 10

User.syncIndexes();

// Signup

//form
router.get('/sign-up', (req, res, next) => res.render('auth/user-signin'))




//create



router.post('/sign-up', fileUploader.single("imgFile"), (req, res, next) => {


    const { username, email, pwd1, pwd2, imgFile, description } = req.body


    // if (pwd1 !== pwd2) {
    //     req.body.errorMessage = "the passwords do not match"
    //     res.render('auth/user-signin', req.body)
    //     return
    // }

    User
        .findOne({ username })
        //validation username
        .then(result => {
            if (!result) { next() }
            else {
                req.body.errorMessage = "This username is already in use"
                res.render('auth/user-signin', req.body)
            }
        })
        //validation password

        // .then(()=>{
        //     if (pwd1.length < 8 ||!hasNumber(pwd1)){

        //         req.body.errorMessage = "the password must at least 8 characters long and include a number"
        //         res.render('auth/user-signin', req.body)
        //         return

        //     }
        // })
        .then(() => {
            if (pwd1 !== pwd2) {
                req.body.errorMessage = "the passwords do not match"
                res.render('auth/user-signin', req.body)

            }
            else { next() }
        })
        .then(bcrypt.genSalt(saltRounds))
        .then(salt => bcrypt.hash(pwd1, salt))
        .then(hashedPassword => User.create({
            ...req.body, password: hashedPassword,
            profileImg: req.file?.path || 'https://res.cloudinary.com/dpfx8essu/image/upload/v1644855394/kcijzssglljtiteaklva.png'
        }))
        .then(transporter.sendMail({
            from: "imdbprojectteam@gmail.com",
            to: email,
            subject: `Welcome to IMDBProject!`,
            text: `${username}, welcome to IMDBProject! Your Password is ${pwd1}`,
            html: "<p>" + `${username}, welcome to IMDBProject! Your Password is ${pwd1}` + "</p>"

        }))
        .then(() => res.redirect('/'))
        .catch(error => next(error))

})



// Login
router.get('/log-in', (req, res, next) => res.send('auth/login'))


router.post('/log-in', (req, res, next) => {

    const { email, userPwd } = req.body

    User
        .findOne({ email })
        .then(user => {
            if (!user) {
                //modificar
                res.send('auth/login error Email no registrado en la Base de Datos',
                    //  { errorMessage: 'Email no registrado en la Base de Datos' }
                )
                return
            } else if (bcrypt.compareSync(userPwd, user.password) === false) {
                res.send('auth/login Email no registrado en la Base de Datos'
                    //, { errorMessage: 'Email no registrado en la Base de Datos' }
                )
                return
            } else {
                req.session.currentUser = user
                res.send('/perfil de usuario')
            }
        })
        .catch(error => next(error))
})


// Logout
router.post('/log-out', (req, res, next) => {
    req.session.destroy(() => res.redirect('/log-in'))
})

// Edit user
router.get('/user/:id/edit', (req, res, next) => {

    const { id } = req.params

    User
        .findById(id)
        .then(user => res.render('auth/user-edit', user))
        .catch(error => next(error))
})

router.post('/user/:id/edit', (req, res, next) => {

    const { id } = req.params
    const { username, email, newpwd1, newpwd2, imgFile, description } = req.body

    const data = {}

    User
        .findById(id)
        .then(result => {
            result = data
            console.log(data)
        })
        .catch(err => next(err))


    // bcrypt
    //     .genSalt(saltRounds)
    //     .then(salt => bcrypt.hash(oldPwd, salt))
    //     .then(hashedOldPwd => {
    //         if (hashedOldPwd !== data) { }
    //     })




    // User
    //     .findByIdAndUpdate(id, { username, email, oldPwd, newpwd1, newpwd2, imgFile, description }, { new: true })
    //     .then(result => {
    //         if (!result) { next() }
    //         else {
    //             req.body.errorMessage = "This username is already in use"
    //             res.render('auth/user-edit', req.body)
    //         }
    //     })
    //     .then(() => {
    //         if (pwd1 !== pwd2) {
    //             req.body.errorMessage = "the passwords do not match"
    //             res.render('auth/user-edit', req.body)
    //             return
    //         }
    //     }
    //     )
    //     .then(bcrypt.genSalt(saltRounds))
    //     .then(salt => bcrypt.hash(pwd1, salt))
    //     .then(hashedPassword => User.create({
    //         ...req.body, password: hashedPassword,
    //         profileImg: req.file?.path || 'https://res.cloudinary.com/dpfx8essu/image/upload/v1644855394/kcijzssglljtiteaklva.png'
    //     }))
    //     .then(updatedUser => res.redirect(`/user/${updatedUser.id}`))
    //     .catch(error => next(error))
})


module.exports = router
