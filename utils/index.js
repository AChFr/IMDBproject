const mongoose = require('mongoose')

const hasNumber = string => {
    return /\d/.test(string);
}

const formatDate = date => {
    let month = '' + (date.getMonth() + 1)
    let day = '' + date.getDate()
    let year = date.getFullYear()

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-')
}

const capitalize = text => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()


const isUser = user => user.role === 'USER'
const isAdmin = user => user.role === 'ADMIN'

const isOwn = (userId, id) => userId === id


module.exports = { hasNumber, capitalize, formatDate, isUser, isAdmin, isOwn }