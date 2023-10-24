// const express = require('express')
// const router = express.Router();
const router =require('express').Router();
const {getAllContact,postContact,
    getContact,updateContact,
    deleteContact} = require('../controllers/contactController');
const validate = require('../middlewares/validateTokenHandler');


router.use(validate)
router.route("/").get(getAllContact).post(postContact)
router.route("/:id").get(getContact).put(updateContact).delete(deleteContact)

module.exports = router;