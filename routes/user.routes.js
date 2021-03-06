const { isLoggedIn, checkRole } = require("../middleware/route-guard")
const router = require("express").Router()
const bcrypt = require('bcryptjs')
const User = require("../models/User.model")
const Comment = require("../models/Comment.model")
const fileUploader = require('../config/cloudinary.config')
const transporter = require("../config/transporter.config")
const { hasNumber, formatDate, isUser, isAdmin, isOwn } = require("../utils/index")
const saltRounds = 10

User.syncIndexes();

//////////////////////////////  U S E R  P R O F I L E S  ////////////////
router.get('/profiles', isLoggedIn, (req, res, next) => {

    const currentUser = req.session.currentUser

    User
        .find()
        .then(users => res.render('user/user-profiles', {
            users,
            user: req.session.currentUser,
            isUser: isUser(req.session.currentUser),
            isAdmin: isAdmin(req.session.currentUser)
        }))
        .catch(error => next(error))
})

//////////////////////////////  U S E R  DELETE  ////////////////

router.post('/:id/delete', isLoggedIn, checkRole('ADMIN'), (req, res, next) => {

    const { id } = req.params

    User
        .findByIdAndDelete(id)
        .then(() => res.redirect('/user/profiles'))
        .catch(err => next(err))
})

//////////////////////////////  U S E R  E D I T  ////////////////
router.get('/:id/edit', (req, res, next) => {

    const { id } = req.params

    User
        .findById(id)
        .then(user => res.render('user/user-edit', user))
        .catch(error => next(error))
})

router.post('/:id/edit', isLoggedIn, fileUploader.single("imgFile"), (req, res, next) => {

    const { id } = req.params
    const { username, email, oldPwd, newPwd1, newPwd2, imgFile, description } = req.body

    User
        .findByIdAndUpdate(id, { username, email, oldPwd, newPwd1, newPwd2, imgFile, description }, { new: true })
        .then(updatedUser => res.redirect(`/user/profiles`))
        .catch(err => next(err))

    ///// checks if the new username is already in use///
    // .then(respuesta => {

    //     console.log(" U N O ", editedUser)
    //     console.log(" D O S ", respuesta)
    //     if (respuesta === editedUser) {
    //         editedUser.errorMessage = "This username is already in use"
    //         res.render('user/user-edit', editedUser)
    //     }
    //     else {

    //         res.redirect("/user/profiles")
    //     }
    // })

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



//////////////////////////  USER DETAILS  /////////////////////

router.get('/:id', isLoggedIn, (req, res, next) => {

    const { id } = req.params

    User
        .findById(id)
        .populate("favoriteMovies")
        .populate("favoriteActors")
        .populate({
            path: 'comments',
            populate: { path: 'author' }
        })
        .then(user => {

            user.isOwn = isOwn(req.session.currentUser._id, id)
            user.isAdmin = isAdmin(req.session.currentUser)
            user.comments.forEach(elm => elm.commentDate = formatDate(elm.date))
            res.render('user/user-details', user)
        })
        .catch(error => next(error))
})


//commentDate

// populate({
//     path: 'friends',
//     // Get friends of friends - populate the 'friends' array for every friend
//     populate: { path: 'friends' }

//////////////////  U S E R   C O M M E N T /////////////////////////

router.post("/:id/comment", isLoggedIn, (req, res, next) => {
    const { id } = req.params
    const user = req.session.currentUser
    let recentComment
    Comment
        .create({ ...req.body, author: req.session.currentUser, date: new Date })
        .then(newComment => {
            recentComment = newComment
            return User.findOne({ _id: user._id })
        })
        .then(person => {
            person.comments.push(recentComment)
            person.save()
            res.redirect(`/user/${user._id}`)
        })
        .catch(err => next(err))

})








module.exports = router