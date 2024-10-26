const router = require("express").Router();
const controller  = require("../controllers/about_controller");
const auth = require("../middlewares/auth.js");

router.get('/about',(req,res) => {
    controller.getInfo(req,res);
});

router.put('/about',auth,(req,res) => {
    controller.editInfo(req,res);
})

module.exports = router;
