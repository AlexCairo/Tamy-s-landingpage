const router = require("express").Router();
const controller = require("../controllers/user_controller");

router.post("/login",(req,res) => {
    controller.login(req,res);
})

module.exports = router;