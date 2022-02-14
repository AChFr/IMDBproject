const router = require("express").Router()
const bcrypt = require('bcryptjs')
const User = require("../../models/User.model")
const saltRounds = 10

User.syncIndexes();

// Signup

//form
router.get('/sign-up', (req, res, next) => res.send('auth/signup'))
//create
router.post('/sign-up', (req, res, next) => {

    const { userPwd } = req.body

    req.body.profileImg || delete req.body.profileImg


    bcrypt
        .genSalt(saltRounds)
        .then(salt => bcrypt.hash(userPwd, salt))
        .then(hashedPassword => User.create({ ...req.body, password: hashedPassword }))
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

module.exports = router
