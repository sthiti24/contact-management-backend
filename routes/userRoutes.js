const express = require('express')
const router = express.Router()
const {register,login,current} = require('../controllers/userController')
const validate = require('../middlewares/validateTokenHandler')


router.route("/register").post(register)

router.route("/login").post(login)

router.get("/current",validate,current)

module.exports = router