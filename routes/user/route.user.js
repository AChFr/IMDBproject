const router = require("express").Router()
const bcrypt = require('bcryptjs')
const User = require("../../models/User.model")
const fileUploader = require('../../config/cloudinary.config')
const transporter = require("../../config/transporter.config")
const { hasNumber } = require("../../utils/index")
const saltRounds = 10

User.syncIndexes();

//////////////////////////////  U S E R  P R O F I L E S  ////////////////
router.get('/profiles', (req, res, next) => {

    const { id } = req.params

    User
        .find()
        .then(users => res.render('user/user-profiles', { users }))
        .catch(error => next(error))
})



//////////////////////////////  U S E R  E D I T  ////////////////
router.get('/:id/edit', (req, res, next) => {

    const { id } = req.params

    User
        .findById(id)
        .then(user => res.render('user/user-edit', user))
        .catch(error => next(error))
})

router.post('/:id/edit', fileUploader.single("imgFile"), (req, res, next) => {

    const { id } = req.params
    const { username, email, oldPwd, newPwd1, newPwd2, imgFile, description } = req.body



    let editedUser = {}

    User
        .findById(id)
        .then(result => {
            editedUser = result

            return User.findOne({ username })
        })
        ///// checks if the new username is already in use///
        .then(respuesta => {

            console.log(" U N O ", editedUser)
            console.log(" D O S ", respuesta)
            if (respuesta === editedUser) {
                editedUser.errorMessage = "This username is already in use"
                res.render('user/user-edit', editedUser)
            }
            else {

                res.redirect("/user/profiles")
            }
        })

    /////////// checks the passwords ////////////////


    // if (bcrypt.compareSync(oldPwd, editedUser.password) === false) {

    //     editedUser.errorMessage = "The password is invalid"
    //     res.render('user/user-edit', editedUser)
    // }
    // if (newPwd1 !== newPwd2) {

    //     editedUser.errorMessage = "The passwords do not match"
    //     res.render('user/user-edit', editedUser)
    // }


    // ////// if everything is well ///// 
    // let newPassword = undefined
    // bcrypt
    //     .genSalt(saltRounds)
    //     .then(salt => bcrypt.hash(newPwd1, salt))
    //     .then(hashedPassword => newPassword = hashedPassword)





    // User
    //     .findByIdAndUpdate(id, {
    //         ...req.body, password: newPassword,
    //         profileImg: req.file?.path || 'https://res.cloudinary.com/dpfx8essu/image/upload/v1644855394/kcijzssglljtiteaklva.png'
    //     }, { new: true })
    //     .then(result => {
    //         result.errorMessage = "profile updated succesfully"
    //         res.render("user/user-profiles", result)
    //     })

    //     .catch(err => next(err))
})



module.exports = router